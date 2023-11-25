import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, Book, Prisma, Book_BookType } from '@prisma/client';

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
    } else if (req.method === 'PUT') {
        const book = req.body;

        const result = await UpdateBook(book);

        if (!result) {
            return res.status(500).json({ error: 'Failed to update the book' });
        }

        return res.json({ ...result });
    }  else if (req.method === 'POST') {
        const book = req.body;

        const result = await AddBook(book);

        if (!result) {
            return res.status(500).json({ error: 'Failed to create a new book' });
        }

        return res.json({ ...result });
    } else if (req.method === 'DELETE') {
        const {bookId} = req.query;

        const result = await DeleteBook(parseInt(bookId?.toString() || "0"));

        if (!result) {
            return res.status(500).json({ error: 'Failed to delete a book' });
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

const AddBook = async (book: Book) => {
    try {
        const bookResult = await prisma.book.create({
            data: {
                BookId: book.BookId,
                Title: book.Title,
                ISBN: book.ISBN,
                Quantity: book.Quantity,
                Location: book.Location,
                PublicYear: book.PublicYear,
                Img: book.Img,
                Barcode: book.Barcode,
                PublisherId: book.PublisherId,
                AuthorId: book.AuthorId,
                LateFeeTypeId: book.LateFeeTypeId
            },
        });

        if (bookResult) {
            return {
                tour: bookResult,
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

const UpdateBook = async (book: any) => {
    try {
        const updatedBook = await prisma.book.update({
            where: {
                BookId: book?.BookId
            },
            data: {
                BookId: book?.BookId,
                Title: book?.Title,
                ISBN: book?.ISBN,
                Quantity: book?.Quantity,
                Location: book?.Location,
                PublicYear: book?.PublicYear,
                Img: book?.Img,
                Barcode: book?.Barcode,
                PublisherId: book?.PublisherId,
                AuthorId: book?.AuthorId,
                LateFeeTypeId: book?.LateFeeTypeId
            },
        });

        await prisma.book_BookType.deleteMany({
            where: {
                BookId: book?.BookId
            }
        });

        book?.Book_BookType?.forEach(async (element: Book_BookType) => {
            await prisma.book_BookType.create({
                data: {
                    BookId: book?.BookId,
                    BookTypeId: element?.BookTypeId
                }
            })
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

const DeleteBook = async (bookId: number) => {
    try {

        await prisma.book_BookType.deleteMany({
            where: {
                BookId: bookId
            }
        });

        const result = await prisma.book.delete({
            where: {
                BookId: bookId
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

export default handler;
