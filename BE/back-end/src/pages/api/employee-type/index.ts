import { NextApiRequest, NextApiResponse } from 'next';
import { EmployeeType, PrismaClient } from '@prisma/client';
import { apiHandler } from '@/helpers/api';

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method == "OPTIONS") {
        res.setHeader("Allow", "POST");
        return res.status(202).json({});
    }

    if (req.method === 'GET') {
        const result = await GetEmployeeType();

        if (!result) {
            return res.status(400).json({ error: 'Invalid tour ID' });
        }

        return res.json({ ...result });
    } else if (req.method === 'PUT') {
        const employeeType = req.body;

        const result = await UpdateEmployeeType(employeeType);

        if (!result) {
            return res.status(500).json({ error: 'Failed to update the support employee type' });
        }

        return res.json({ ...result });
    } else if (req.method === 'POST') {
        const employeeType = req.body;

        const result = await AddEmployeeType(employeeType);

        if (!result) {
            return res.status(500).json({ error: 'Failed to create a new support employee' });
        }

        return res.json({ ...result });
    } else if (req.method === 'DELETE') {
        const { employeeTypeId } = req.query;

        const result = await DeleteEmployeeTypeById(parseInt(employeeTypeId?.toString() || "0"));

        if (!result) {
            return res.status(500).json({ error: 'Failed to delete a support employee type' });
        }

        return res.json({ ...result });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};

const GetEmployeeType = async () => {
    try {
        const employeeTypes = await prisma.employeeType.findMany();

        if (employeeTypes) {
            return {
                data: employeeTypes,
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

const AddEmployeeType = async (employeeType: EmployeeType) => {
    try {
        const employeeResult = await prisma.employeeType.create({
            data: {
                Name: employeeType.Name,
                Description: employeeType?.Description
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

const UpdateEmployeeType = async (employeeType: EmployeeType) => {
    try {
        const employeeTypeResult = await prisma.employeeType.update({
            where: {
                EmployeeTypeId: employeeType?.EmployeeTypeId
            },
            data: {
                Name: employeeType.Name,
                Description: employeeType?.Description
            }
        });

        return {
            data: employeeTypeResult,
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

const DeleteEmployeeTypeById = async (employeeTypeId: number) => {
    try {
        const result = await prisma.employeeType.delete({
            where: {
                EmployeeTypeId: employeeTypeId
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