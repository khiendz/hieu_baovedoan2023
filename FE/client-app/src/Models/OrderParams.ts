
export class ItemOrders {
    name: string;
    quantinty: number | 1;
    price: number;
}
export class OrderParams {
    orderCode: number;
    amount: number;
    description: string;
    cancelUrl: string;
    returnUrl: string;
    buyerName: string;
    buyerEmail: string;
    buyerPhone: string;
    buyerAddress: string;
    signature?: string; 
}
