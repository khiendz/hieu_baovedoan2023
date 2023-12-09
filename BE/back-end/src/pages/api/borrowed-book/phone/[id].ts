import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { apiHandler } from '@/helpers/api';

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method == "OPTIONS") {
        res.setHeader("Allow", "POST");
        return res.status(202).json({});
    }

    if (req.method === 'GET') {
        const id = req.query.id as string;

        if (!id) {
            return res.status(400).json({ error: 'Invalid id query' });
        }

        try {
            const result = await GetBorrowBookByPhone(id);

            if (!result) {
                return res.status(400).json({ error: 'Invalid tour ID' });
            }
    
            return res.json({ ...result });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};

const GetBorrowBookByPhone = async (phoneNumber: string) => {
    try {
        const borrowedBook = await prisma.borrowedBook.findMany({
            where: {
                Member: {
                    Phone: phoneNumber
                }
            },
            include: {
                Member: true,
                Book: {
                    include: {
                        LateFeeType: true
                    }
                },
                LateFee: {
                    include: {
                        Payment: true
                    }
                },
            }
        });

        if (borrowedBook.length > 0) {
            return {
                data: borrowedBook,
                message: "Success",
                status: "200"
            };
        } else {
            return {
                data: null,
                message: "No data",
                status: "200"
            };
        }
    } catch (error) {
        return {
            data: null,
            message: "No data",
            status: "500"
        };
    }
}

export default apiHandler(handler, ["GET"]);
