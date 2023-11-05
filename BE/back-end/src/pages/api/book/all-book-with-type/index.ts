import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, Book } from '@prisma/client';

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
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
        const book = await prisma.book.findMany(
            {
                include: {
                    BookType: true
                }
            }
        );

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
            tour: null,
            message: "Internal Server Error",
            status: "500"
        };
    }
}



export default handler;
