import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, Author, Publisher } from '@prisma/client';

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        const result = await GetAllPublisher();

        if (!result) {
            return res.status(400).json({ error: 'Invalid tour ID' });
        }

        return res.json({ ...result });
    } else if (req.method === 'POST') {
        const author = req.body;

        const result = await UpdatePublisher(author);

        if (!result) {
            return res.status(500).json({ error: 'Failed to create a new tour type' });
        }

        return res.json({ ...result });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};

const GetAllPublisher = async () => {
    try {
        const publishers = await prisma.publisher.findMany();

        if (publishers) {
            return {
                data: publishers,
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

const AddPublisher= async (publisher: Publisher) => {
    try {
        const publisherResult = await prisma.publisher.create({
            data: publisher,
        });

        if (publisherResult) {
            return {
                author: publisherResult,
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

const UpdatePublisher = async (publisher: Publisher) => {
    try {
        const updatedPublisher = await prisma.publisher.update({
            where: {
                PublisherId: publisher.PublisherId
            }, 
            data: publisher,
        });

        return {
            data: updatedPublisher,
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
