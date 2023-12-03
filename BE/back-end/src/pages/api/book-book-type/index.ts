import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, Book, BookType, Book_BookType } from '@prisma/client';
import { apiHandler } from '@/helpers/api';

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method == "OPTIONS") {
        res.setHeader("Allow", "POST");
        return res.status(202).json({});
      }

    if (req.method === 'GET') {
        const result = await GetBook();

        if (!result) {
            return res.status(400).json({ error: 'Invalid tour ID' });
        }

        return res.json({ ...result });
    } else if (req.method === 'POST') {
        const book = req.body;

        const result = await UpdateBookBookTypeByBookID(book);

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

const UpdateBookBookTypeByBookID = async (bookBookType: Book_BookType) => {
    try {
        const updatedBookBookType = await prisma.book_BookType.update({
            where: {
                Book_BookTypeId: bookBookType.Book_BookTypeId
            },
            data: bookBookType,
        });

        return {
            data: updatedBookBookType,
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
