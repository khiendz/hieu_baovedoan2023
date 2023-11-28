import { apiHandler } from '../../../helpers/api';
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method == "OPTIONS") {
        res.setHeader("Allow", "POST");
        return res.status(202).json({});
    }
    
    switch (req.method) {
        case 'GET':
            return getUsers(res);
        default:
            return getUsers(res);
    }
}

async function getUsers(res: NextApiResponse) {
    // return users without passwords in the response
    const response = (await prisma.account.findMany()).map(user => {
        const { Password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    });
    return res.status(200).json(response);
}

export default apiHandler(handler);
