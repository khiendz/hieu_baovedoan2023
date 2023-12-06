import { Payment } from "Models";
import { Publisher } from "Models/Publisher";
import { AddPayment, DeletePaymentById, UpdatePayment } from "services/payment-service";
import { AddPublisher, DeletePublisherById, UpdatePublisher } from "services/publisher-service";

export const changePublisher = async (publisher: Publisher) => {
    try {
        const result = await UpdatePublisher(publisher);
        if (result) return result;
        else return null;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const handleAddPublisher = async (publisher: Publisher) => {
    try {
        const result = await AddPublisher(publisher);
        if (result) return result;
        else return null;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const clearThePayment = async (publisherId: number) => {
    if (!publisherId) return null;

    try {
        const result = await DeletePublisherById(publisherId);
        if (result) return result;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const handleDelete = async (key: number, publishers: Publisher[], setPublishers: any) => {
    const result = await clearThePayment(key);
    const newData = publishers.filter(
        (item: Publisher) => item.PublisherId !== key
    );
    if (result.status == 200)
        setPublishers(newData);
    return result;
};

export const handleAdd = async (publisher: Publisher, setPublishers: any, publishers: Publisher[]) => {
    const result = await handleAddPublisher(publisher);
    if (result?.data && result.status == 200)
        setPublishers([
            { ...result?.data },
            ...publishers,
        ]);
    return result;
};
