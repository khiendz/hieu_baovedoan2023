import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, RoleAccount } from '@prisma/client';
import { apiHandler } from '@/helpers/api';

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method == "OPTIONS") {
        res.setHeader("Allow", "POST");
        return res.status(202).json({});
    }

    if (req.method === 'GET') {
        const result = await GetRoleAccount();

        if (!result) {
            return res.status(400).json({ error: 'Invalid tour ID' });
        }

        return res.json({ ...result });
    } else if (req.method === 'PUT') {
        const roleAccount = req.body;

        const result = await UpdateRoleAccount(roleAccount);

        if (!result) {
            return res.status(500).json({ error: 'Failed to update the payment' });
        }

        return res.json({ ...result });
    } else if (req.method === 'POST') {
        const roleAccount = req.body;

        const result = await AddRoleAccount(roleAccount);

        if (!result) {
            return res.status(500).json({ error: 'Failed to create a new payment' });
        }

        return res.json({ ...result });
    } else if (req.method === 'DELETE') {
        const { roleAccountId } = req.query;

        const result = await DeleteRoleAccountById(parseInt(roleAccountId?.toString() || "0"));

        if (!result) {
            return res.status(500).json({ error: 'Failed to delete a payment' });
        }

        return res.json({ ...result });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};

const GetRoleAccount = async () => {
    try {
        const roleAccountResult = await prisma.roleAccount.findMany();

        if (roleAccountResult) {
            return {
                data: roleAccountResult,
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

const AddRoleAccount = async (roleAccount: RoleAccount) => {
    try {
        const roleAccountResult = await prisma.roleAccount.create({
            data: {
              RoleName: roleAccount.RoleName,
              Description: roleAccount.Description
            },
        });

        return {
            data: roleAccountResult,
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

const UpdateRoleAccount = async (roleAccount: RoleAccount) => {
    try {
        const updateRoleAccountResult = await prisma.roleAccount.update({
            where: {
                RoleId: roleAccount?.RoleId
            },
            data: {
                RoleName: roleAccount.RoleName,
                Description: roleAccount.Description
            }
        });

        return {
            data: updateRoleAccountResult,
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

const DeleteRoleAccountById = async (roleAccountId: number) => {
    try {
        const result = await prisma.roleAccount.delete({
            where: {
                RoleId: roleAccountId
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