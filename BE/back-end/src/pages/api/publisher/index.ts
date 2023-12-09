import { NextApiRequest, NextApiResponse } from 'next';
import { Employee, LateFee, LateFeeType, MemberRole, Payment, PrismaClient, Publisher, User } from '@prisma/client';
import { apiHandler } from '@/helpers/api';

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method == "OPTIONS") {
        res.setHeader("Allow", "POST");
        return res.status(202).json({});
    }

    if (req.method === 'GET') {
        const result = await GetPublishers();

        if (!result) {
            return res.status(400).json({ error: 'Invalid tour ID' });
        }

        return res.json({ ...result });
    } else if (req.method === 'PUT') {
        const publisher = req.body;

        const result = await UpdatePublisher(publisher);

        if (!result) {
            return res.status(500).json({ error: 'Failed to update the support payment' });
        }

        return res.json({ ...result });
    } else if (req.method === 'POST') {
        const publisher = req.body;

        const result = await AddPublisher(publisher);

        if (!result) {
            return res.status(500).json({ error: 'Failed to create a new support payment' });
        }

        return res.json({ ...result });
    } else if (req.method === 'DELETE') {
        const { publisherId } = req.query;

        const result = await DeletePublisherById(parseInt(publisherId?.toString() || "0"));

        if (!result) {
            return res.status(500).json({ error: 'Failed to delete a support member role' });
        }

        return res.json({ ...result });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};

const GetPublishers = async () => {
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

const AddPublisher = async (publisher: Publisher) => {
    try {
        const publisherResult = await prisma.publisher.create({
            data: {
                Name: publisher.Name,
                Address: publisher.Address,
                PHONE: publisher.PHONE,
                Website: publisher.Website
            },
        });

        return {
            data: publisherResult,
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

const UpdatePublisher = async (publisher: Publisher) => {
    try {
        const publisherResult = await prisma.publisher.update({
            where: {
                PublisherId: publisher?.PublisherId
            },
            data: {
                Name: publisher.Name,
                Address: publisher.Address,
                PHONE: publisher.PHONE,
                Website: publisher.Website
            }
        });

        return {
            data: publisherResult,
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

const DeletePublisherById = async (publisherId: number) => {
    try {
        const result = await prisma.publisher.delete({
            where: {
                PublisherId: publisherId
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

export default apiHandler(handler,["GET"]);