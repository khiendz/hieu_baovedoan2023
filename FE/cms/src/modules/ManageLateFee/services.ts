import { LateFee } from "Models";
import { EmployeeType } from "Models/EmployeeType";
import { AddEmployeeType, DeleteEmployeeTypeById } from "services";
import { AddLateFee, DeleteLateFeeById, UpdateLateFee } from "services/late-fee-service";

export const changeLateFee = async (lateFee: LateFee) => {
    try {
        const result = await UpdateLateFee(lateFee);
        if (result) return result;
        else return null;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const handleAddLateFee = async (lateFee: LateFee) => {
    try {
        const result = await AddLateFee(lateFee);
        if (result) return result;
        else return null;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const clearTheLateFee = async (lateFeeId: number) => {
    if (!lateFeeId) return null;

    try {
        const result = await DeleteLateFeeById(lateFeeId);
        if (result) return result;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const handleDelete = async (key: number, lateFees: LateFee[], setLateFees: any) => {
    const result = await clearTheLateFee(key);
    const newData = lateFees.filter(
        (item: LateFee) => item.LateFeeId !== key
    );
    if (result.status == 200)
        setLateFees(newData);
    return result;
};

export const handleAdd = async (lateFee: LateFee, setLateFees: any, lateFees: LateFee[]) => {
    const result = await handleAddLateFee(lateFee);
    if (result?.data && result.status == 200)
        setLateFees([
            { ...result?.data },
            ...lateFees,
        ]);
    return result;
};
