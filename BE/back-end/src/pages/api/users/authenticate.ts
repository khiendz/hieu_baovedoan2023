import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import getConfig from 'next/config';
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

const { serverRuntimeConfig } = getConfig();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method == "OPTIONS") {
        res.setHeader("Allow", "POST");
        return res.status(202).json({});
    }

    if (req.method === 'POST') {
        const { username, password } = req.body;

        const result = await authenticate(username, password);

        if (!result) {
            return res.status(500).json({ error: 'Failed to create a new book' });
        }

        return res.json({ ...result });
    }

}

async function authenticate(username: string, password: string) {
    if (!username && !password) {
        return {
            data: null,
            message: 'Tài khoản hoặc mật khẩu không đúng',
            status: "403"
        };
    }

    const user = await prisma.account.findFirst({
        where: {
            UserName: username,
            Password: password
        }, include: {
            RoleAccount: true,
            User: true
        }
    });

    if (!user) {
        return {
            data: null,
            message: 'Tài khoản hoặc mật khẩu không đúng',
            status: "403"
        };
    }

    const token = jwt.sign({ sub: user.AccountId }, serverRuntimeConfig.secret, { expiresIn: '7d' });

    return {
        data: { user, token },
        message: "Success",
        status: "200"
    };
}

export default handler;
