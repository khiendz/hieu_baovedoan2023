import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, Book } from '@prisma/client';

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        const result = await GetBook();

        if (!result) {
            return res.status(400).json({ error: 'Invalid tour ID' });
        }

        return res.json({ ...result });
    } else if (req.method === 'POST') {
        const book = req.body;

        const result = await UpdateBook(book);

        if (!result) {
            return res.status(500).json({ error: 'Failed to create a new tour type' });
        }

        return res.json({ ...result });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};

const GetBook = async () => {
    try {
        const book = await prisma.book.findMany();

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

const AddBook = async (bookData: Book) => {
    try {
        const book = await prisma.book.create({
            data: bookData,
        });

        if (bookData) {
            return {
                tour: bookData,
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

const UpdateBook = async (book: Book) => {
    try {
        const updatedBook = await prisma.book.update({
            where: {
                BookId: 1
            }, // Assuming you have an 'id' field in your Book model
            data: book,
        });

        return {
            data: updatedBook,
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
