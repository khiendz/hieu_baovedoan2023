import { EmployeeType } from 'Models/EmployeeType';
import { fetchWrapper } from 'helpers';

const domainBE = process?.env?.DOMAIN_BACK_END ?? "http://localhost:3000"; 

export async function getEmployeeTypeById(id: string) {
    if (!id)
        return null;
    
    try {
        const res: any = await fetchWrapper.get(`${domainBE}/api/employee-type/${id}`);
        if (res.status == 200) 
            return res.data;
        
    } catch (e) {
        return null;
    }
}

export async function getAllEmployeeType () {
    try {
        const res: any = await fetchWrapper.get(`${domainBE}/api/employee-type`);
        if (res.status == 200) 
            return res.data;
        
    } catch (e) {
        return null;
    }
}

export async function UpdateEmployeeType(employeeType: EmployeeType) {
    try {
        const res: any = await fetchWrapper.put(`${domainBE}/api/employee-type`, employeeType);

        if (res.status === 200) {
            return res.data;
        }
    } catch (e) {
        console.error('Error updating employee type:', e);
    }

    return null;
}

export async function AddEmployeeType(employeeType: EmployeeType) {
    try {
        const res: any = await fetchWrapper.post(`${domainBE}/api/employee-type`, employeeType);

        if (res.status === 200) {
            return res.data;
        }
    } catch (e) {
        console.error('Error updating employee type:', e);
    }

    return null;
}

export async function DeleteEmployeeTypeById(employeeTypeId: number) {
    try {
        const res: any = await fetchWrapper.delete(`${domainBE}/api/employee-type?employeeTypeId=${employeeTypeId}`);

        if (res.status === 200) {
            return res.data;
        }
    } catch (e) {
        console.error('Error updating employee type:', e);
    }

    return null;
}




