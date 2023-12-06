import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, Book, Author, BorrowedBook } from '@prisma/client';
import { apiHandler } from '@/helpers/api';

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method == "OPTIONS") {
        res.setHeader("Allow", "POST");
        return res.status(202).json({});
    }

    if (req.method === 'GET') {
        const result = await GetAllBorrowedBook();

        if (!result) {
            return res.status(400).json({ error: 'Invalid tour ID' });
        }

        return res.json({ ...result });
    } else if (req.method === 'PUT') {
        const book = req.body;

        const result = await UpdateBorrowedBook(book);

        if (!result) {
            return res.status(500).json({ error: 'Failed to update the book' });
        }

        return res.json({ ...result });
    }  else if (req.method === 'POST') {
        const borrowedBook = req.body;

        const result = await AddBorrowedBook(borrowedBook);

        if (!result) {
            return res.status(500).json({ error: 'Failed to create a new book' });
        }

        return res.json({ ...result });
    } else if (req.method === 'DELETE') {
        const {borrowedBookId} = req.query;

        const result = await DeleteBorrowedBook(parseInt(borrowedBookId?.toString() || "0"));

        if (!result) {
            return res.status(500).json({ error: 'Failed to delete a book' });
        }

        return res.json({ ...result });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};

const GetAllBorrowedBook = async () => {
    try {
        const borrowedBook = await prisma.borrowedBook.findMany({
            include: {
                Member: true
            }
        });

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

const AddBorrowedBook = async (borrow: BorrowedBook) => {
    try {
        const borrowResult = await prisma.borrowedBook.create({
            data: {
                MemberId: borrow.MemberId,
                BookId: borrow.BookId,
                BorrowDate: borrow.BorrowDate,
                DueDate: borrow.DueDate,
                ReturnDate: borrow?.ReturnDate,
                KateFee: borrow.KateFee
            },
        });

        if (borrowResult) {
            return {
                data: borrowResult,
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

const UpdateBorrowedBook = async (borrow: any) => {
    try {
        const updatedBorrowBook = await prisma.borrowedBook.update({
            where: {
                TransactionId: borrow?.TransactionId
            },
            data: {
                MemberId: borrow.MemberId,
                BookId: borrow.BookId,
                BorrowDate: borrow.BorrowDate,
                DueDate: borrow.DueDate,
                ReturnDate: borrow?.ReturnDate,
                KateFee: borrow.KateFee
            }
        });

        return {
            data: updatedBorrowBook,
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

const DeleteBorrowedBook = async (borrowBookId: number) => {
    try {
        const result = await prisma.borrowedBook.delete({
            where: {
                TransactionId: borrowBookId
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
