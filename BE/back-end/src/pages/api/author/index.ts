import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, Author } from '@prisma/client';
import { apiHandler } from '@/helpers/api';

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method == "OPTIONS") {
        res.setHeader("Allow", "POST");
        return res.status(202).json({});
    }

    if (req.method === 'GET') {
        const result = await GetAllAuthor();

        if (!result) {
            return res.status(400).json({ error: 'Invalid tour ID' });
        }

        return res.json({ ...result });
    } else if (req.method === 'PUT') {
        const author = req.body;

        const result = await UpdateAuthor(author);

        if (!result) {
            return res.status(500).json({ error: 'Failed to update the book' });
        }

        return res.json({ ...result });
    }  else if (req.method === 'POST') {
        const author = req.body;

        const result = await AddAuthor(author);

        if (!result) {
            return res.status(500).json({ error: 'Failed to create a new book' });
        }

        return res.json({ ...result });
    } else if (req.method === 'DELETE') {
        const {authorId} = req.query;

        const result = await DeleteAuthor(parseInt(authorId?.toString() || "0"));

        if (!result) {
            return res.status(500).json({ error: 'Failed to delete a book' });
        }

        return res.json({ ...result });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};

const GetAllAuthor = async () => {
    try {
        const atuthors = await prisma.author.findMany();

        if (atuthors) {
            return {
                data: atuthors,
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

const UpdateAuthor = async (author: Author) => {
    try {
        const updatedAuthor = await prisma.author.update({
            where: {
                AuthorId: 1
            }, // Assuming you have an 'id' field in your Book model
            data: author,
        });

        return {
            data: updatedAuthor,
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

const DeleteAuthor = async (authorId: number) => {
    try {
        const result = await prisma.author.delete({
            where: {
                AuthorId: authorId
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
