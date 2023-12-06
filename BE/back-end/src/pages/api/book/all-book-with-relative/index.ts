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
        const result = await GetBooksWithType();

        if (!result) {
            return res.status(400).json({ error: 'Invalid tour ID' });
        }

        return res.json({ ...result });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};

const GetBooksWithType = async () => {
    try {
        const book = await prisma.book.findMany({
            include: {
                Publisher: true,
                Author: true,
                BorrowedBook: true,
                Book_BookType: {
                    include: {
                        BookType: true
                    }
                }
            }
        });


        if (book) {
            return {
                data: book,
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
            data: null,
            message: "Internal Server Error",
            status: "500"
        };
    }
}

export default apiHandler(handler);