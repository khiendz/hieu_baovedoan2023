import { Employee } from 'Models';
import { fetchWrapper } from 'helpers';

const domainBE = process?.env?.DOMAIN_BACK_END ?? "http://localhost:3000"; 

export async function getEmployeeById(id: string) {
    if (!id)
        return null;
    
    try {
        const res: any = await fetchWrapper.get(`${domainBE}/api/employee/${id}`);
        if (res.status == 200) 
            return res.data;
        
    } catch (e) {
        return null;
    }
}

export async function getAllEmployee () {
    try {
        const res: any = await fetchWrapper.get(`${domainBE}/api/employee`);
        if (res.status == 200) 
            return res.data;
        
    } catch (e) {
        return null;
    }
}

export async function UpdateEmployee(employee: Employee) {
    try {
        const res: any = await fetchWrapper.put(`${domainBE}/api/employee`, employee);

        if (res.status === 200) {
            return res.data;
        }
    } catch (e) {
        console.error('Error updating employee:', e);
    }

    return null;
}

export async function AddEmployee(employee: Employee) {
    try {
        const res: any = await fetchWrapper.post(`${domainBE}/api/employee`, employee);

        if (res.status === 200) {
            return res.data;
        }
    } catch (e) {
        console.error('Error updating employee:', e);
    }

    return null;
}

export async function DeleteEmployeeById(employeeId: number) {
    try {
        const res: any = await fetchWrapper.delete(`${domainBE}/api/employee?employeeId=${employeeId}`);

        if (res.status === 200) {
            return res.data;
        }
    } catch (e) {
        console.error('Error updating employee:', e);
    }

    return null;
}




