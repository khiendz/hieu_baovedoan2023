import { Employee } from "Models";
import { AddEmployee, DeleteEmployeeById, UpdateEmployee } from "services";

export const changeEmployee = async (employee: Employee) => {
    try {
        const result = await UpdateEmployee(employee);
        if (result) return result;
        else return null;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const handleAddEmployee = async (employee: Employee) => {
    try {
        const result = await AddEmployee(employee);
        if (result) return result;
        else return null;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const clearTheEmloyee = async (employeeId: number) => {
    if (!employeeId) return null;

    try {
        const result = await DeleteEmployeeById(employeeId);
        if (result) return result;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const handleDelete = async (key: number, employees: Employee[], setEmployees: any) => {
    const result = await clearTheEmloyee(key);
    const newData = employees.filter(
        (item: Employee) => item.EmployeeId !== key
    );
    if (result.status == 200)
        setEmployees(newData);
    return result;
};

export const handleAdd = async (employee: Employee, setEmployees: any, employees: Employee[]) => {
    const result = await handleAddEmployee(employee);
    if (result?.data && result.status == 200)
        setEmployees([
            { ...result?.data },
            ...employees,
        ]);
    return result;
};
