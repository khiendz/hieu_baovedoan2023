import { OrderParams } from 'Models/OrderParams';
import axios from 'axios';
import * as crypto from 'crypto';
import * as dotenv from 'dotenv';

// Load giá trị từ tệp .env
dotenv.config();

const key: any = process.env.PAYOS_CHECKSUM_KEY || `153b7b9252d04567e7399c021a4fd1c3a11bfcaa868fed0d3fdc4bbf3dadcb45`;
const clientId = process.env.PAYOS_CLIENT_ID || `d6102cc5-034f-488c-b9cc-54135353a8ec`;
const apiKey = process.env.PAYOS_API_KEY || `28d3f0bc-08de-40e8-bdf2-5d1b275ca275`;

if (!key || !clientId || !apiKey) {
    console.error('One or more required environment variables are not defined in the .env file.');
}

export function generateHmacSha256(orderParams: any): string {
    const keyBuffer = Buffer.from(key, 'utf-8');
    const sortedParams = Object.keys(orderParams)
        .sort()
        .map((key) => `${key}=${orderParams[key]}`)
        .join('&');
    const messageBuffer = Buffer.from(sortedParams, 'utf-8');
    const hmac = crypto.createHmac('sha256', keyBuffer);
    const signatureBuffer = hmac.update(messageBuffer).digest();
    const signatureHex = signatureBuffer.toString('hex');
    return signatureHex;
}


export async function sendOrder(orderParams: OrderParams) {
    orderParams.signature = generateHmacSha256(orderParams);
    orderParams.buyerPhone = "0382033517";
    try {
        const response = await axios.post('https://api-merchant.payos.vn/v2/payment-requests', orderParams, {
            headers: {
                'x-client-id': clientId,
                'x-api-key': apiKey,
            },
        });
        console.log('Order request successful. Response:', response.data);
        return response;
    } catch (error: any) {
        console.error('Error sending order request:', error.message);
    }
}

export async function checkPayment(id: string) {
    try {
        const response = await axios.get(`https://api-merchant.payos.vn/v2/payment-requests/${id}`, {
            headers: {
                'x-client-id': clientId,
                'x-api-key': apiKey,
            },
        });
        return response;
    } catch (error: any) {
        console.error('Error sending order request:', error.message);
    }
}

