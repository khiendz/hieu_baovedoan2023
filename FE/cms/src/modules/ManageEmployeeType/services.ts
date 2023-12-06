import { Employee } from "Models";
import { EmployeeType } from "Models/EmployeeType";
import { AddEmployee, AddEmployeeType, DeleteEmployeeById, DeleteEmployeeTypeById, UpdateEmployee, UpdateEmployeeType } from "services";

export const changeEmployeeType = async (employeeType: EmployeeType) => {
    try {
        const result = await UpdateEmployeeType(employeeType);
        if (result) return result;
        else return null;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const handleAddEmployeeType = async (employeeType: EmployeeType) => {
    try {
        const result = await AddEmployeeType(employeeType);
        if (result) return result;
        else return null;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const clearTheEmloyeeType = async (employeeTypeId: number) => {
    if (!employeeTypeId) return null;

    try {
        const result = await DeleteEmployeeTypeById(employeeTypeId);
        if (result) return result;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const handleDelete = async (key: number, employeeTypes: EmployeeType[], setEmployeeTypes: any) => {
    const result = await clearTheEmloyeeType(key);
    const newData = employeeTypes.filter(
        (item: EmployeeType) => item.EmployeeTypeId !== key
    );
    if (result.status == 200)
        setEmployeeTypes(newData);
    return result;
};

export const handleAdd = async (employeeType: EmployeeType, setEmployeeType: any, employeeTypes: EmployeeType[]) => {
    const result = await handleAddEmployeeType(employeeType);
    if (result?.data && result.status == 200)
        setEmployeeType([
            { ...result?.data },
            ...employeeTypes,
        ]);
    return result;
};
