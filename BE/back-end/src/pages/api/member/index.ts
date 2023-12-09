import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, Book, Author, Member } from '@prisma/client';
import { format } from 'date-fns';
import { apiHandler } from '@/helpers/api';

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method == "OPTIONS") {
        res.setHeader("Allow", "POST");
        return res.status(202).json({});
    }

    if (req.method === 'GET') {
        const result = await GetAllMember();

        if (!result) {
            return res.status(400).json({ error: 'Invalid tour ID' });
        }

        return res.json({ ...result });
    } else if (req.method === 'PUT') {
        const book = req.body;

        const result = await UpdateMember(book);

        if (!result) {
            return res.status(500).json({ error: 'Failed to update the book' });
        }

        return res.json({ ...result });
    }  else if (req.method === 'POST') {
        const member = req.body;

        const result = await AddMember(member);

        if (!result) {
            return res.status(500).json({ error: 'Failed to create a new book' });
        }

        return res.json({ ...result });
    } else if (req.method === 'DELETE') {
        const {memberId} = req.query;

        const result = await DeleteMemberById(parseInt(memberId?.toString() || "0"));

        if (!result) {
            return res.status(500).json({ error: 'Failed to delete a book' });
        }

        return res.json({ ...result });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};

const GetAllMember = async () => {
    try {
        const member = await prisma.member.findMany();

        if (member) {
            return {
                data: member,
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

const AddMember = async (member: Member) => {
    try {
        const memberResult = await prisma.member.create({
            data: {
                Name: member.Name,
                Address: member.Address,
                Phone: member.Phone,
                Email: member.Email,
                JoinDate: member?.JoinDate,
                MemberRoleId: member.MemberRoleId
            },
        });

        if (memberResult) {
            return {
                data: memberResult,
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

const UpdateMember = async (member: any) => {
    try {
        const memberResult = await prisma.member.update({
            where: {
                MemberId: member?.MemberId
            },
            data: {
                Name: member.Name,
                Address: member.Address,
                Phone: member.Phone,
                Email: member.Email,
                JoinDate: member?.JoinDate,
                MemberRoleId: member.MemberRoleId
            }
        });

        return {
            data: memberResult,
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

const DeleteMemberById = async (memberId: number) => {
    try {
        const result = await prisma.member.delete({
            where: {
                MemberId: memberId
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

export default apiHandler(handler,["GET","POST"]);
