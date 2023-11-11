import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, Book, Author, BorrowedBook } from '@prisma/client';

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        const result = await GetAllBorrowedBook();

        if (!result) {
            return res.status(400).json({ error: 'Invalid tour ID' });
        }

        return res.json({ ...result });
    } else if (req.method === 'POST') {
        const borrowedBook = req.body;

        const result = await UpdateBorrowedBook(borrowedBook);

        if (!result) {
            return res.status(500).json({ error: 'Failed to create a new borrowed book' });
        }

        return res.json({ ...result });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};

const GetAllBorrowedBook = async () => {
    try {
        const borrowedBook = await prisma.borrowedBook.findMany();

        if (borrowedBook) {
            return {
                data: borrowedBook,
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

const AddAuthor = async (author: Author) => {
    try {
        const authorResult = await prisma.author.create({
            data: author,
        });

        if (authorResult) {
            return {
                author: authorResult,
                message: "Success",
                status: "200"
            };
        } else {
            return {
                tour: null,
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

const UpdateBorrowedBook = async (borrowedBook: BorrowedBook) => {
    try {
        const updatedBorrowedBook = await prisma.borrowedBook.update({
            where: {
                TransactionId: borrowedBook.TransactionId
            }, // Assuming you have an 'id' field in your Book model
            data: borrowedBook,
        });

        return {
            data: updatedBorrowedBook,
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

export default handler;
