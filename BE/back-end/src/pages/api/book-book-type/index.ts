import { NextApiRequest, NextApiResponse } from 'next';
import { Book_BookType, Employee, LateFee, LateFeeType, MemberRole, Payment, PrismaClient, User } from '@prisma/client';
import { apiHandler } from '@/helpers/api';

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method == "OPTIONS") {
        res.setHeader("Allow", "POST");
        return res.status(202).json({});
    }

    if (req.method === 'GET') {
        const result = await GetBookBookTypes();

        if (!result) {
            return res.status(400).json({ error: 'Invalid tour ID' });
        }

        return res.json({ ...result });
    } else if (req.method === 'PUT') {
        const bookBookType = req.body;

        const result = await UpdateBookBookType(bookBookType);

        if (!result) {
            return res.status(500).json({ error: 'Failed to update the support book book type' });
        }

        return res.json({ ...result });
    } else if (req.method === 'POST') {
        const bookBookType = req.body;

        const result = await AddBookBookType(bookBookType);

        if (!result) {
            return res.status(500).json({ error: 'Failed to create a new support book book type' });
        }

        return res.json({ ...result });
    } else if (req.method === 'DELETE') {
        const { bookBookTypeId } = req.query;

        const result = await DeleteBookBookTypeById(parseInt(bookBookTypeId?.toString() || "0"));

        if (!result) {
            return res.status(500).json({ error: 'Failed to delete a support member role' });
        }

        return res.json({ ...result });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};

const GetBookBookTypes = async () => {
    try {
        const bookBookTypes = await prisma.book_BookType.findMany();

        if (bookBookTypes) {
            return {
                data: bookBookTypes,
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

const AddBookBookType = async (bookBookType: Book_BookType) => {
    try {
        const bookBookTypeResult = await prisma.book_BookType.create({
            data: {
                BookId: bookBookType.BookId,
                BookTypeId: bookBookType.BookTypeId
            },
        });

        return {
            data: bookBookTypeResult,
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

const UpdateBookBookType = async (bookBookType: Book_BookType) => {
    try {
        const paymentResult = await prisma.book_BookType.update({
            where: {
                Book_BookTypeId: bookBookType?.Book_BookTypeId
            },
            data: {
                BookId: bookBookType.BookId,
                BookTypeId: bookBookType.BookTypeId
            },
        });

        return {
            data: paymentResult,
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

const DeleteBookBookTypeById = async (bookBookTypeId: number) => {
    try {
        const result = await prisma.book_BookType.delete({
            where: {
                Book_BookTypeId: bookBookTypeId
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