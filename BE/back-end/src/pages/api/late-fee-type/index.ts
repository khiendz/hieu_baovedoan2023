import { NextApiRequest, NextApiResponse } from 'next';
import { Employee, LateFee, LateFeeType, PrismaClient, User } from '@prisma/client';
import { apiHandler } from '@/helpers/api';

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method == "OPTIONS") {
        res.setHeader("Allow", "POST");
        return res.status(202).json({});
    }

    if (req.method === 'GET') {
        const result = await GetLateFeeTypes();

        if (!result) {
            return res.status(400).json({ error: 'Invalid tour ID' });
        }

        return res.json({ ...result });
    } else if (req.method === 'PUT') {
        const lateFeeTypes = req.body;

        const result = await UpdateLateFeeType(lateFeeTypes);

        if (!result) {
            return res.status(500).json({ error: 'Failed to update the support late fee type' });
        }

        return res.json({ ...result });
    } else if (req.method === 'POST') {
        const lateFeeTypes = req.body;

        const result = await AddLateFeeTypes(lateFeeTypes);

        if (!result) {
            return res.status(500).json({ error: 'Failed to create a new support late fee type' });
        }

        return res.json({ ...result });
    } else if (req.method === 'DELETE') {
        const { lateFeeTypeId } = req.query;

        const result = await DeleteLateFeeTypeById(parseInt(lateFeeTypeId?.toString() || "0"));

        if (!result) {
            return res.status(500).json({ error: 'Failed to delete a support employee' });
        }

        return res.json({ ...result });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};

const GetLateFeeTypes = async () => {
    try {
        const lateFeeTypes = await prisma.lateFeeType.findMany();

        if (lateFeeTypes) {
            return {
                data: lateFeeTypes,
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

const AddLateFeeTypes = async (lateFeeType: LateFeeType) => {
    try {
        const lateFeeTypeResult = await prisma.lateFeeType.create({
            data: {
                Name: lateFeeType.Name,
                Description: lateFeeType.Description,
                FeeAmount: lateFeeType.FeeAmount,
                DateCount: lateFeeType.DateCount
            },
        });

        return {
            data: lateFeeTypeResult,
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

const UpdateLateFeeType = async (lateFeeType: LateFeeType) => {
    try {
        const lateFeeResult = await prisma.lateFeeType.update({
            where: {
                LateFeeTypeId: lateFeeType?.LateFeeTypeId
            },
            data: {
                Name: lateFeeType.Name,
                Description: lateFeeType.Description,
                FeeAmount: lateFeeType.FeeAmount,
                DateCount: lateFeeType.DateCount
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

const DeleteLateFeeTypeById = async (lateFeeTypeId: number) => {
    try {
        const result = await prisma.lateFeeType.delete({
            where: {
                LateFeeTypeId: lateFeeTypeId
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