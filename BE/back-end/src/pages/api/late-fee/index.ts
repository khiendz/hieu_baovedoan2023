import { NextApiRequest, NextApiResponse } from 'next';
import { LateFee, PrismaClient } from '@prisma/client';
import { apiHandler } from '@/helpers/api';

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method == "OPTIONS") {
        res.setHeader("Allow", "POST");
        return res.status(202).json({});
    }

    if (req.method === 'GET') {
        const result = await GetLateFees();

        if (!result) {
            return res.status(400).json({ error: 'Invalid tour ID' });
        }

        return res.json({ ...result });
    } else if (req.method === 'PUT') {
        const lateFee = req.body;

        const result = await UpdateLateFee(lateFee);

        if (!result) {
            return res.status(500).json({ error: 'Failed to update the support late fee' });
        }

        return res.json({ ...result });
    } else if (req.method === 'POST') {
        const lateFee = req.body;

        const result = await AddLateFee(lateFee);

        if (!result) {
            return res.status(500).json({ error: 'Failed to create a new support late fee' });
        }

        return res.json({ ...result });
    } else if (req.method === 'DELETE') {
        const { lateFeeId } = req.query;

        const result = await DeleteLateFeeById(parseInt(lateFeeId?.toString() || "0"));

        if (!result) {
            return res.status(500).json({ error: 'Failed to delete a support employee' });
        }

        return res.json({ ...result });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};

const GetLateFees = async () => {
    try {
        const lateFees = await prisma.lateFee.findMany({
            include: {
                BorrowedBook: {
                    include: {
                        Book: {
                            include: {
                                LateFeeType: true
                            }
                        },
                        Member: true,
                    }
                },
                Payment: true
            }
        });

        if (lateFees) {
            return {
                data: lateFees,
                message: "Success",
                status: "200"
            };
        } else {
            return {
                data: null,
                message: "No Success",
                status: "500"
            };
        }
    } catch (error) {
        console.error(error);
        return {
            tour: null,
            message: "Internal Server Error",
            status: "500"
        };
    }
}

const AddLateFee = async (lateFee: LateFee) => {
    try {
        const exitsLateFee = await prisma.lateFee.findMany({
            where: {
                TransactionId: lateFee.TransactionId
            }
        });

        if (exitsLateFee?.length > 0)
        return {
            data: null,
            message: "Đã tồn tại trễ hạn cùng mã mượn",
            status: "500"
        };
        
        const lateFeeResult = await prisma.lateFee.create({
            data: {
                TransactionId: +lateFee.TransactionId,
                FeeAmount: +lateFee.FeeAmount,
            },
            include: {
                BorrowedBook: {
                    include: {
                        Book: {
                            include: {
                                LateFeeType: true
                            }
                        },
                        Member: true,
                    }
                },
                Payment: true
            }
        });

        return {
            data: lateFeeResult,
            message: "Success",
            status: "200",
        };

    } catch (error) {
        console.error(error);
        return {
            tour: null,
            message: "Internal Server Error",
            status: "500",
        };
    }
}

const UpdateLateFee = async (lateFee: LateFee) => {
    try {
        const lateFeeResult = await prisma.lateFee.update({
            where: {
                LateFeeId: lateFee?.LateFeeId
            },
            data: {
                TransactionId: +lateFee.TransactionId,
                FeeAmount: +lateFee.FeeAmount,
            },
            include: {
                BorrowedBook: {
                    include: {
                        Book: {
                            include: {
                                LateFeeType: true
                            }
                        },
                        Member: true,
                    }
                },
                Payment: true
            }
        });

        return {
            data: lateFeeResult,
            message: "Success",
            status: "200"
        };
    } catch (e) {
        console.error(e);
        return {
            data: null,
            message: "Internal Server Error",
            status: "500"
        };
    }
}

const DeleteLateFeeById = async (lateFeeId: number) => {
    try {
        const result = await prisma.lateFee.delete({
            where: {
                LateFeeId: lateFeeId
            }
        })

        return {
            data: result,
            message: "Success",
            status: "200"
        };
    } catch (e) {
        console.error(e);
        return {
            data: null,
            message: "Internal Server Error",
            status: "500"
        };
    }
}

export default apiHandler(handler);