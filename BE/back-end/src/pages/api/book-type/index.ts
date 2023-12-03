import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, BookType } from '@prisma/client';
import { apiHandler } from '@/helpers/api';

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
    } else if (req.method === 'POST') {
        const tourTypeData = req.body;

        const result = await AddBookType(tourTypeData);

        if (!result) {
            return res.status(500).json({ error: 'Failed to create a new tour type' });
        }

        return res.json({ ...result });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};

const GetBookType = async () => {
    try {
        const bookTypes = await prisma.bookType.findMany();

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
            tour: null,
            message: "Internal Server Error",
            status: "500"
        };
    }
}

const AddBookType = async (bookTypesData: BookType) => {
    try {
        const bookTypes = await prisma.bookType.create({
            data: bookTypesData,
        });

        if (bookTypesData) {
            return {
                tour: bookTypesData,
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

export default apiHandler(handler);
