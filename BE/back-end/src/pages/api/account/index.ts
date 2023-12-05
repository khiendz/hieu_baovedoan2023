import { NextApiRequest, NextApiResponse } from 'next';
import { Account, PrismaClient } from '@prisma/client';
import { apiHandler } from '@/helpers/api';

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method == "OPTIONS") {
        res.setHeader("Allow", "POST");
        return res.status(202).json({});
    }

    if (req.method === 'GET') {
        const result = await GetAccounts();

        if (!result) {
            return res.status(400).json({ error: 'Invalid tour ID' });
        }

        return res.json({ ...result });
    } else if (req.method === 'PUT') {
        const account = req.body;

        const result = await UpdateAccount(account);

        if (!result) {
            return res.status(500).json({ error: 'Failed to update the support account' });
        }

        return res.json({ ...result });
    } else if (req.method === 'POST') {
        const account = req.body;

        const result = await AddAccount(account);

        if (!result) {
            return res.status(500).json({ error: 'Failed to create a new support account' });
        }

        return res.json({ ...result });
    } else if (req.method === 'DELETE') {
        const { accountId } = req.query;

        const result = await DeleteAccountById(parseInt(accountId?.toString() || "0"));

        if (!result) {
            return res.status(500).json({ error: 'Failed to delete a support account' });
        }

        return res.json({ ...result });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};

const GetAccounts = async () => {
    try {
        const accounts = await prisma.account.findMany({
            include: {
                RoleAccount: true,
                User: true
            }
        });

        if (accounts) {
            return {
                data: accounts,
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

const AddAccount = async (account: Account) => {
    try {
        const accountResult = await prisma.account.create({
            data: {
                UserName: account.UserName,
                Password: account.Password,
                RoleId: account.RoleId,
                UserId: account.UserId
            },
        });

        return {
            data: accountResult,
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

const UpdateAccount = async (account: Account) => {
    try {
        const userResult = await prisma.account.update({
            where: {
                AccountId: account?.AccountId
            },
            data: {
                UserName: account.UserName,
                Password: account.Password,
                RoleId: account.RoleId,
                UserId: account.UserId
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

const DeleteAccountById = async (accountId: number) => {
    try {
        const result = await prisma.account.delete({
            where: {
                AccountId: accountId
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