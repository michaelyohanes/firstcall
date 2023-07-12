import { Response } from 'express';
import { tblUser } from '../../src/models';
import {
    ErrorType,
    RegisterRequest,
    UserType,
    ListRequest,
    ListResponse,
    GetByIdRequest,
    UpdateByIdRequest,
    DeleteByIdRequest
} from '../../src/types/user';

export const register = (req: RegisterRequest, res: Response) => {
    const { body: { username, firstname, lastname }} = req;

    if (!username || !firstname) {
        return res.status(400).send({ message: 'Invalid field' });
    }

    tblUser.create({
        username,
        firstname,
        lastname
    })
        .then((user: UserType) => {
            const { id } = user;

            res.send({
                id,
                message: 'User was registered successfully!'
            });
        })
        .catch((err: ErrorType) => {
            const { message } = err;

            res.status(500).send({ message });
        });
};

export const list = (req: ListRequest, res: Response) => {
    let { query: { page }} = req;

    if (page === undefined) {
        page = 0;
    }

    const offset = page * 5;

    tblUser.findAndCountAll({
        limit: 5,
        offset,
        order: [
            ['updatedAt', 'desc']
        ],
        attributes: { exclude: ['createdAt', 'deletedAt'] }
    })
        .then((result: ListResponse) => {
            res.send(result);
        })
        .catch((err: ErrorType) => {
            const { message } = err;

            res.status(500).send({ message });
        });
};

export const getById = (req: GetByIdRequest, res: Response) => {
    const { params: { id } } = req;

    if (id === undefined) {
        return res.status(400).send({ message: 'Invalid field' });
    }

    tblUser.findOne({
        where: { id },
        attributes: { exclude: ['createdAt', 'deletedAt'] }
    })
        .then((result: UserType) => {
            if (!result) {
                return res.status(500).send({ message: 'Data not found' });
            };

            res.send(result);
        })
        .catch((err: ErrorType) => {
            const { message } = err;

            res.status(500).send({ message });
        });
};

export const updateById = (req: UpdateByIdRequest, res: Response) => {
    const { params: { id }, body: { firstname, lastname }} = req;

    if (id === undefined || !firstname) {
        return res.status(400).send({ message: 'Invalid field' });
    }

    tblUser.update(
        {
            firstname,
            lastname
        },
        {
            where: { id },
        }
    )
        .then((result: boolean[]) => {            
            if (!result || !result[0]) {
                return res.status(500).send({ message: 'Data not found' });
            };

            res.send({
                message: 'User was updated successfully!'
            });
        })
        .catch((err: ErrorType) => {
            const { message } = err;

            res.status(500).send({ message });
        });
};

export const deleteById = (req: DeleteByIdRequest, res: Response) => {
    const { params: { id } } = req;

    if (id === undefined) {
        return res.status(400).send({ message: 'Invalid field' });
    }

    tblUser.destroy(
        {
            where: { id },
        }
    )
        .then((result: boolean) => {
            if (!result) {
                return res.status(500).send({ message: 'Data not found' });
            };

            res.send({
                message: 'User was deleted successfully!'
            });
        })
        .catch((err: ErrorType) => {
            const { message } = err;

            res.status(500).send({ message });
        });
};