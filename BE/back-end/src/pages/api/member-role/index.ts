import { NextApiRequest, NextApiResponse } from 'next';
import { Employee, LateFee, LateFeeType, MemberRole, PrismaClient, User } from '@prisma/client';
import { apiHandler } from '@/helpers/api';

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method == "OPTIONS") {
        res.setHeader("Allow", "POST");
        return res.status(202).json({});
    }

    if (req.method === 'GET') {
        const result = await GetMemberRoles();

        if (!result) {
            return res.status(400).json({ error: 'Invalid tour ID' });
        }

        return res.json({ ...result });
    } else if (req.method === 'PUT') {
        const memberRole = req.body;

        const result = await UpdateMemberRole(memberRole);

        if (!result) {
            return res.status(500).json({ error: 'Failed to update the support member role' });
        }

        return res.json({ ...result });
    } else if (req.method === 'POST') {
        const memberRole = req.body;

        const result = await AddMemberRole(memberRole);

        if (!result) {
            return res.status(500).json({ error: 'Failed to create a new support member role' });
        }

        return res.json({ ...result });
    } else if (req.method === 'DELETE') {
        const { memberRoleId } = req.query;

        const result = await DeleteMemberRoleById(parseInt(memberRoleId?.toString() || "0"));

        if (!result) {
            return res.status(500).json({ error: 'Failed to delete a support member role' });
        }

        return res.json({ ...result });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};

const GetMemberRoles = async () => {
    try {
        const memberRoles = await prisma.memberRole.findMany();

        if (memberRoles) {
            return {
                data: memberRoles,
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

const AddMemberRole = async (memberRole: MemberRole) => {
    try {
        const memberRoleResult = await prisma.memberRole.create({
            data: {
                Value: memberRole.Value,
                Description: memberRole.Description,
            },
        });

        return {
            data: memberRoleResult,
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

const UpdateMemberRole = async (memberRole: MemberRole) => {
    try {
        const memberRoleResult = await prisma.memberRole.update({
            where: {
                MemberRoleId: memberRole?.MemberRoleId
            },
            data: {
                Value: memberRole.Value,
                Description: memberRole.Description,
            }
        });

        return {
            data: memberRoleResult,
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

const DeleteMemberRoleById = async (memberRoleId: number) => {
    try {
        const result = await prisma.memberRole.delete({
            where: {
                MemberRoleId: memberRoleId
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