import { Payment } from 'Models';
import { fetchWrapper } from 'helpers';

const domainBE = process?.env?.DOMAIN_BACK_END ?? "http://localhost:3000";

export async function getPaymentById(id: string) {

    if (!id)
        return null;

    try {
        const res: any = await fetchWrapper.get(`${domainBE}/api/payment/${id}`);
        if (res.status == 200)
            return res.data;

    } catch (e) {
        return null;
    }
}

export async function getAllPayment () {
    try {
        const res: any = await fetchWrapper.get(`${domainBE}/api/payment`);
        if (res.status == 200) 
            return res.data;
        
    } catch (e) {
        return null;
    }
}


export async function UpdatePayment(payment: Payment) {
    try {
        const res: any = await fetchWrapper.put(`${domainBE}/api/payment`, payment);

        if (res.status === 200) {
            return res.data;
        }
    } catch (e) {
        console.error('Error updating payment:', e);
    }

    return null;
}

export async function AddPayment(payment: Payment) {
    try {
        const res: any = await fetchWrapper.post(`${domainBE}/api/payment`, payment);

        if (res.status === 200) {
            return res.data;
        }
    } catch (e) {
        console.error('Error updating payment:', e);
    }

    return null;
}

export async function DeletePaymentById(paymentId: number) {
    try {
        const res: any = await fetchWrapper.delete(`${domainBE}/api/payment?paymentId=${paymentId}`);

        if (res.status === 200) {
            return res.data;
        }
    } catch (e) {
        console.error('Error updating payment:', e);
    }

    return null;
}

