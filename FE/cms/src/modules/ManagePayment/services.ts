import { Payment } from "Models";
import { AddPayment, DeletePaymentById, UpdatePayment } from "services/payment-service";

export const changePayment = async (payment: Payment) => {
    try {
        const result = await UpdatePayment(payment);
        if (result) return result;
        else return null;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const handleAddPayment = async (payment: Payment) => {
    try {
        const result = await AddPayment(payment);
        if (result) return result;
        else return null;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const clearThePayment = async (paymentId: number) => {
    if (!paymentId) return null;

    try {
        const result = await DeletePaymentById(paymentId);
        if (result) return result;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const handleDelete = async (key: number, payments: Payment[], setPayments: any) => {
    const result = await clearThePayment(key);
    const newData = payments.filter(
        (item: Payment) => item.PaymentID !== key
    );
    if (result.status == 200)
        setPayments(newData);
    return result;
};

export const handleAdd = async (payment: Payment, setPayments: any, payments: Payment[]) => {
    const result = await handleAddPayment(payment);
    if (result?.data && result.status == 200)
        setPayments([
            { ...result?.data },
            ...payments,
        ]);
    return result;
};
