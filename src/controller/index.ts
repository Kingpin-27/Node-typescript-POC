import { Request, Response } from 'express';
import Employees from '../models/empModel';

const getPagination = (page: any, size: any, orderBy: any) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;
    const order = orderBy ? [orderBy.split(",")] : [];
    return { limit, offset, order };
};

const getAllEmp = async (request: Request, response: Response) => {
    const { limit, offset, order } = getPagination(request.query.page, request.query.size, request.query.orderBy);
    const emp = await Employees.findAndCountAll({ limit, offset, order });
    console.log(`Number of Employees found : ${emp.count}`);
    return response.status(200).send(emp);
};

const getOneEmp = async (request: Request, response: Response) => {
    if (!request.query.id) {
        //501 - Not Implemented
        response.status(501).send("Request does not contain Employee Id");
    } else {
        const emp = await Employees.findOne({
            where: {
                id: request.query.id
            }
        });
        if (emp) {
            let createdEmp = emp.get({ plain: true });
            console.log("New Employee's auto-generated ID:", createdEmp.id);
            response.status(200).send(createdEmp);
        }
        else {
            console.log(`Employee with ID ${request.query.id} is not found`);
            response.status(500).send("Employee not found");
        }
    }
};

const createNewEmp = async (request: Request, response: Response) => {
    if (!request.body || !request.body.firstName) {
        //501 - Not Implemented
        response.status(501).send("Request does not contain Employee Name");
    }
    else {
        let body = request.body;
        const newEmp = await Employees.create({
            firstName: body.firstName,
            lastName: body.lastName,
            salary: body.salary,
            age: body.age
        });
        let createdEmp = newEmp.get({ plain: true });
        console.log("New Employee's auto-generated ID:", createdEmp.id);

        //201 - Created
        response.status(201).send(createdEmp);
    }
};

const updateEmp = async (request: Request, response: Response) => {
    if (!request.body || !request.body.id) {
        //501 - Not Implemented
        response.status(501).send("Request does not contain Employee ID");
    }
    else {
        let body = request.body, empId = request.body.id;
        const emp = await Employees.findOne({
            where: {
                id: empId
            }
        });
        if (emp) {
            const newEmp = await Employees.update({
                firstName: body.firstName,
                lastName: body.lastName,
                salary: body.salary,
                age: body.age
            }, {
                where: {
                    id: empId
                }
            });
            let statusMessage = newEmp[0] === 1 ? "Update Successful" : "Employee Detaisl Not Updated";
            response.status(200).json(statusMessage);
        }
        else {
            console.log(`Employee with ${request.body.id} is not found`);
            response.status(500).send("Employee not found");
        }
    }
};

const deleteEmp = async (request: Request, response: Response) => {
    if (!request.query.id) {
        //501 - Not Implemented
        response.status(501).send("Request does not contain Employee Name");
    }
    else {
        const emp = await Employees.findOne({
            where: {
                id: request.query.id
            }
        });
        if (emp) {
            const delEmp = await Employees.destroy({
                where: {
                    id: request.query.id
                }
            });
        }
        console.log(`Employee with Id ${request.query.id} is deleted`);
        response.status(200).json("Deletion Successful");
    }
}

const methods = {
    getAll: getAllEmp,
    getOne: getOneEmp,
    createNew: createNewEmp,
    update: updateEmp,
    delete: deleteEmp
}

export default methods;