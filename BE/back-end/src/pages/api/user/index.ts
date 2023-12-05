import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, User } from '@prisma/client';
import { apiHandler } from '@/helpers/api';

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method == "OPTIONS") {
        res.setHeader("Allow", "POST");
        return res.status(202).json({});
    }

    if (req.method === 'GET') {
        const result = await GetUsers();

        if (!result) {
            return res.status(400).json({ error: 'Invalid tour ID' });
        }

        return res.json({ ...result });
    } else if (req.method === 'PUT') {
        const user = req.body;

        const result = await UpdateUser(user);

        if (!result) {
            return res.status(500).json({ error: 'Failed to update the support user' });
        }

        return res.json({ ...result });
    } else if (req.method === 'POST') {
        const user = req.body;

        const result = await AddUser(user);

        if (!result) {
            return res.status(500).json({ error: 'Failed to create a new support user' });
        }

        return res.json({ ...result });
    } else if (req.method === 'DELETE') {
        const { userId } = req.query;

        const result = await DeleteUserById(parseInt(userId?.toString() || "0"));

        if (!result) {
            return res.status(500).json({ error: 'Failed to delete a support user' });
        }

        return res.json({ ...result });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};

const GetUsers = async () => {
    try {
        const users = await prisma.user.findMany({
            include: {
                Account: true,
                _count: true
            }
        });

        if (users) {
            return {
                data: users,
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

const AddUser = async (user: User) => {
    try {
        const exitsUserSamePhone = await prisma.user.findUnique({
            where: {
                Phone: user.Phone
            }
        });
 
        if (exitsUserSamePhone) {
            return {
                data: null,
                message: "Đã tồn tại người dùng có trùng số điện thoại",
                status: "400",
            };
        }

        const userResult = await prisma.user.create({
            data: {
                FirstName: user.FirstName,
                LastName: user.LastName,
                Address: user.Address,
                Phone:  user.Phone,
                AccountId: user?.AccountId
            },
            include: {
                Account: true,
                _count: true
            }
        });

        return {
            data: userResult,
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

const UpdateUser = async (user: User) => {
    try {
        const exitsUserSamePhone = await prisma.user.findUnique({
            where: {
                Phone: user.Phone,
                NOT: {
                    UserId: user.UserId
                }
            }
        });
 
        if (exitsUserSamePhone) {
            return {
                data: null,
                message: "Đã tồn tại người dùng có trùng số điện thoại",
                status: "400",
            };
        }

        const userResult = await prisma.user.update({
            where: {
                UserId: user?.UserId
            },
            data: {
                FirstName: user.FirstName,
                LastName: user.LastName,
                Address: user.Address,
                Phone: user.Phone,
                AccountId: user?.AccountId
            },
            include: {
                Account: true,
                _count: true
            }
        });

        return {
            data: userResult,
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

const DeleteUserById = async (userId: number) => {
    try {
        const userRelations = await prisma.user.findUnique({
            where: {
                UserId: userId
            },
            include: {
                Account: true, 
            }
        });

        if (userRelations && userRelations.Account) {
            await Promise.all(userRelations.Account.map(async (account) => {
                await prisma.account.delete({
                    where: {
                        AccountId: account.AccountId
                    }
                });
            }));
        }

        if (userRelations) {
            const result = await prisma.user.delete({
                where: {
                    UserId: userId
                }
            });

            return {
                data: result,
                message: "Success",
                status: "200"
            };
        } else {
            return {
                data: null,
                message: "User not found",
                status: "404"
            };
        }
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