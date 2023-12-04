import { NextApiRequest, NextApiResponse } from 'next';
import { Employee, PrismaClient, User } from '@prisma/client';
import { apiHandler } from '@/helpers/api';

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method == "OPTIONS") {
        res.setHeader("Allow", "POST");
        return res.status(202).json({});
    }

    if (req.method === 'GET') {
        const result = await GetEmployees();

        if (!result) {
            return res.status(400).json({ error: 'Invalid tour ID' });
        }

        return res.json({ ...result });
    } else if (req.method === 'PUT') {
        const employee = req.body;

        const result = await UpdateEmployee(employee);

        if (!result) {
            return res.status(500).json({ error: 'Failed to update the support employee' });
        }

        return res.json({ ...result });
    } else if (req.method === 'POST') {
        const employee = req.body;

        const result = await AddEmployee(employee);

        if (!result) {
            return res.status(500).json({ error: 'Failed to create a new support employee' });
        }

        return res.json({ ...result });
    } else if (req.method === 'DELETE') {
        const { employeeId } = req.query;

        const result = await DeleteEmployeeById(parseInt(employeeId?.toString() || "0"));

        if (!result) {
            return res.status(500).json({ error: 'Failed to delete a support employee' });
        }

        return res.json({ ...result });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};

const GetEmployees = async () => {
    try {
        const employees = await prisma.employee.findMany();

        if (employees) {
            return {
                data: employees,
                message: "Success",
                status: "200"
            };
        } else {
            return {
                data: null,
                message: "No Success",
                status: "500"
            };
        }
    } catch (error) {
        console.error(error);
        return {
            tour: null,
            message: "Internal Server Error",
            status: "500"
        };
    }
}

const AddEmployee = async (employee: Employee) => {
    try {
        const employeeResult = await prisma.employee.create({
            data: {
                WorkSchedule: employee.WorkSchedule,
                UserId: employee.UserId,
            },
        });

        return {
            data: employeeResult,
            message: "Success",
            status: "200",
        };

    } catch (error) {
        console.error(error);
        return {
            tour: null,
            message: "Internal Server Error",
            status: "500",
        };
    }
}

const UpdateEmployee = async (employee: Employee) => {
    try {
        const employeeResult = await prisma.employee.update({
            where: {
                EmployeeId: employee?.EmployeeId
            },
            data: {
                WorkSchedule: employee.WorkSchedule,
                UserId: employee.UserId,
            }
        });

        return {
            data: employeeResult,
            message: "Success",
            status: "200"
        };
    } catch (e) {
        console.error(e);
        return {
            data: null,
            message: "Internal Server Error",
            status: "500"
        };
    }
}

const DeleteEmployeeById = async (employeeId: number) => {
    try {
        const result = await prisma.employee.delete({
            where: {
                EmployeeId: employeeId
            }
        })

        return {
            data: result,
            message: "Success",
            status: "200"
        };
    } catch (e) {
        console.error(e);
        return {
            data: null,
            message: "Internal Server Error",
            status: "500"
        };
    }
}

export default apiHandler(handler);