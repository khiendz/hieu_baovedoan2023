import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, BookType } from '@prisma/client';
import { apiHandler } from '@/helpers/api';
import { saveFile } from '@/services/file';

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method == "OPTIONS") {
        res.setHeader("Allow", "POST");
        return res.status(202).json({});
    }

    if (req.method === 'GET') {
        const result = await GetBookType();

        if (!result) {
            return res.status(400).json({ error: 'Invalid tour ID' });
        }

        return res.json({ ...result });
    } else if (req.method === 'PUT') {
        const bookType = req.body;

        const result = await UpdateBookType(bookType);

        if (!result) {
            return res.status(500).json({ error: 'Failed to update the book' });
        }

        return res.json({ ...result });
    } else if (req.method === 'POST') {
        const bookType = req.body;

        const result = await AddBookType(bookType);

        if (!result) {
            return res.status(500).json({ error: 'Failed to create a new book' });
        }

        return res.json({ ...result });
    } else if (req.method === 'DELETE') {
        const { bookTypeId } = req.query;

        const result = await DeleteBookType(parseInt(bookTypeId?.toString() || "0"));

        if (!result) {
            return res.status(500).json({ error: 'Failed to delete a book' });
        }

        return res.json({ ...result });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};

const GetBookType = async () => {
    try {
        const bookTypes = await prisma.bookType.findMany({
            include: {
                Book: true,
            }
        });
        if (bookTypes) {
            return {
                data: bookTypes,
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

const AddBookType = async (bookType: BookType) => {
    try {
        const bookTypeResult = await prisma.bookType.create({
            data: {
                Name: bookType.Name,
                Description: bookType.Description,
            },
        });

        if (bookType.Img) {
            const filename = await saveFile(bookType.Img, bookType.BookTypeId);
            bookTypeResult.Img = filename;
        }

        const updatedBookTypeImg = await prisma.bookType.update({
            where: {
                BookTypeId: bookTypeResult.BookTypeId
            },
            data: bookTypeResult
        });


        const bookRes = await prisma.bookType.findUnique({
            where: {
                BookTypeId: bookTypeResult.BookTypeId,
            }
        });

        if (bookRes) {
            return {
                data: bookRes,
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

const UpdateBookType = async (bookType: BookType) => {
    try {
        const updatedBookType = await prisma.bookType.update({
            where: {
                BookTypeId: bookType?.BookTypeId
            },
            data: {
                Name: bookType.Name,
                Description: bookType.Description,
            },
        });

        if (bookType.Img && !bookType.Img.startsWith("file")) {
            const filename = await saveFile(bookType.Img, bookType.BookTypeId);
            updatedBookType.Img = filename;
        }

        const updatedBookTypeImg = await prisma.bookType.update({
            where: {
                BookTypeId: updatedBookType.BookTypeId
            },
            data: updatedBookType
        });

        const bookRes = await prisma.bookType.findUnique({
            where: {
                BookTypeId: updatedBookType.BookTypeId,
            }
        });

        return {
            data: bookRes,
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

const DeleteBookType = async (bookTypeId: number) => {
    try {
        const result = await prisma.bookType.delete({
            where: {
                BookTypeId: bookTypeId
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
            message: "Đang có sách có thuộc tính loại sách này",
            status: "500"
        };
    }
}

export default apiHandler(handler,["GET"]);

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '10mb',
        },
    },
}