import { LateFee, LateFeeType } from "Models";
import { AddLateFee, DeleteLateFeeById } from "services/late-fee-service";
import { AddLateFeeType, DeleteLateFeeTypeById, UpdateLateFeeType } from "services/late-fee-type";

export const changeLateFeeType = async (lateFeeType: LateFeeType) => {
    try {
        const result = await UpdateLateFeeType(lateFeeType);
        if (result) return result;
        else return null;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const handleAddLateFeeType = async (lateFeeType: LateFeeType) => {
    try {
        const result = await AddLateFeeType(lateFeeType);
        if (result) return result;
        else return null;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const clearTheLateFeeType = async (lateFeeTypeId: number) => {
    if (!lateFeeTypeId) return null;

    try {
        const result = await DeleteLateFeeTypeById(lateFeeTypeId);
        if (result) return result;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const handleDelete = async (key: number, lateFeeTypes: LateFeeType[], setLateFeeTypes: any) => {
    const result = await clearTheLateFeeType(key);
    const newData = lateFeeTypes.filter(
        (item: LateFeeType) => item.LateFeeTypeId !== key
    );
    if (result.status == 200)
        setLateFeeTypes(newData);
    return result;
};

export const handleAdd = async (lateFeeType: LateFeeType, setLateFeeTypes: any, lateFeeTypes: LateFeeType[]) => {
    const result = await handleAddLateFeeType(lateFeeType);
    if (result?.data && result.status == 200)
        setLateFeeTypes([
            { ...result?.data },
            ...lateFeeTypes,
        ]);
    return result;
};
