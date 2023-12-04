import { NextApiRequest, NextApiResponse } from 'next';
import { Employee, LateFee, LateFeeType, MemberRole, Payment, PrismaClient, User } from '@prisma/client';
import { apiHandler } from '@/helpers/api';

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method == "OPTIONS") {
        res.setHeader("Allow", "POST");
        return res.status(202).json({});
    }

    if (req.method === 'GET') {
        const result = await GetPayments();

        if (!result) {
            return res.status(400).json({ error: 'Invalid tour ID' });
        }

        return res.json({ ...result });
    } else if (req.method === 'PUT') {
        const payment = req.body;

        const result = await UpdatePayment(payment);

        if (!result) {
            return res.status(500).json({ error: 'Failed to update the support payment' });
        }

        return res.json({ ...result });
    } else if (req.method === 'POST') {
        const payment = req.body;

        const result = await AddPayment(payment);

        if (!result) {
            return res.status(500).json({ error: 'Failed to create a new support payment' });
        }

        return res.json({ ...result });
    } else if (req.method === 'DELETE') {
        const { paymentId } = req.query;

        const result = await DeletePaymentById(parseInt(paymentId?.toString() || "0"));

        if (!result) {
            return res.status(500).json({ error: 'Failed to delete a support member role' });
        }

        return res.json({ ...result });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};

const GetPayments = async () => {
    try {
        const payments = await prisma.payment.findMany();

        if (payments) {
            return {
                data: payments,
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

const AddPayment = async (payment: Payment) => {
    try {
        const paymentResult = await prisma.payment.create({
            data: {
                LateFeeId: payment.LateFeeId,
                PaymentDate: payment.PaymentDate,
                Amount: payment.Amount,
                StatePayments: payment.StatePayments
            },
        });

        return {
            data: paymentResult,
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

const UpdatePayment = async (payment: Payment) => {
    try {
        const paymentResult = await prisma.payment.update({
            where: {
                PaymentID: payment?.PaymentID
            },
            data: {
                LateFeeId: payment.LateFeeId,
                PaymentDate: payment.PaymentDate,
                Amount: payment.Amount,
                StatePayments: payment.StatePayments
            }
        });

        return {
            data: paymentResult,
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

const DeletePaymentById = async (paymentId: number) => {
    try {
        const result = await prisma.payment.delete({
            where: {
                PaymentID: paymentId
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