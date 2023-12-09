import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { apiHandler } from '@/helpers/api';

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method == "OPTIONS") {
        res.setHeader("Allow", "POST");
        return res.status(202).json({});
    }

   if (req.method === 'DELETE') {
        const { orderCode } = req.query;

        const result = await DeletePaymentByOrderCode(orderCode?.toString() || "0");

        if (!result) {
            return res.status(500).json({ error: 'Failed to delete a payment' });
        }

        return res.json({ ...result });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};

const DeletePaymentByOrderCode = async (paymentId: string) => {
    try {
        const result = await prisma.payment.delete({
            where: {
                OrderCode: paymentId
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

export default apiHandler(handler,["GET","DELETE"]);