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
    } else if (req.method === 'POST') {
        const book = req.body;

        const result = await UpdateBook(book);

        if (!result) {
            return res.status(500).json({ error: 'Failed to create a new tour type' });
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

const UpdateBook = async (book: any) => {
    try {
        const updatedBook = await prisma.book.update({
            where: {
                BookId: book?.BookId
            },
            data: {
                AuthorId: book.Author.AuthorId,
                Barcode: book.Barcode,
                Img: book.Img,
                ISBN: book.ISBN,
                LateFeeTypeId: book.LateFeeTypeId,
                Location: book.Location,
                PublicYear: book.PublicYear,
                Quantity: book.Quantity,
                PublisherId: book.Publisher.PublisherId,
                Title: book.Title
            },
        });

        await prisma.book_BookType.deleteMany({
            where: {
                BookId: book?.BookId
            }
        });

        book.Book_BookType.forEach(async (element: Book_BookType) => {
            await prisma.book_BookType.create({
                data: {
                    BookId: element.BookId,
                    BookTypeId: element.BookTypeId
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
