import express from 'express';

import { register, list, getById, updateById, deleteById } from '../controllers/user';

const router = express.Router();

router.use((_req: any, res: any, next: any) => {
    res.header(
        'Access-Control-Allow-Headers',
        'x-access-token, Origin, Content-Type, Accept'
    );
    next();
});

router.post(
    '/register',
    register

    /*  
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Create user',
            schema: {
                username: 'myuser1',
                firstname: 'Marshall',
                lastname: 'Mathers'
            }
        }
    
        #swagger.responses[200] = {
            description: 'User successfully created',
            schema: {
                message: 'User was registered successfully!'
            }
        }

        #swagger.responses[400] = {
            description: 'Missing or invalid field',
            schema: {
                message: 'Invalid field'
            }
        }

        #swagger.responses[500] = {
            description: 'Uncaught error',
            schema: {
                message: '...'
            }
        }
    */
);

router.get(
    '/list',
    list

    /*
        #swagger.parameters['page'] = {
            description: 'page',
            type: 'number'
        }

        #swagger.responses[200] = {
            description: 'Successfully retrieved',
            schema: {
                count: 2,
                rows: [
                    {
                        id: 1,
                        username: 'myadmin',
                        firstname: 'Administrator',
                        lastname: 'Testing',
                        updatedAt: '2023-07-12T04:39:35.234Z'
                    }
                ]
            }
        }
    */
);

router.get(
    '/:id',
    getById

    /*  
        #swagger.parameters['id'] = {
            description: 'User id to retrieve',
            type: 'number'
        }

        #swagger.responses[200] = {
            description: 'Successfully retrieved',
            schema: {
                id: 1,
                username: 'myadmin',
                firstname: 'Administrator',
                lastname: 'Testing',
                updatedAt: '2023-07-12T04:39:35.234Z'
            }
        }
    */
);

router.put(
    '/:id',
    updateById

    /*  
        #swagger.parameters['id'] = {
            description: 'User id to update',
            type: 'number'
        }

        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Fields',
            schema: {
                firstname: 'Marshall',
                lastname: 'Mathers'
            }
        }
    
        #swagger.responses[200] = {
            description: 'User successfully updated',
            schema: {
                message: 'User was updated successfully!'
            }
        }

        #swagger.responses[400] = {
            description: 'Missing or invalid field',
            schema: {
                message: 'Invalid field'
            }
        }

        #swagger.responses[500] = {
            description: 'Uncaught error',
            schema: {
                message: '...'
            }
        }
    */
);

router.delete(
    '/:id',
    deleteById

    /*  
        #swagger.parameters['id'] = {
            description: 'User id to delete',
            type: 'number'
        }

        #swagger.responses[200] = {
            description: 'User successfully deleted',
            schema: {
                message: 'User was deleted successfully!'
            }
        }

        #swagger.responses[400] = {
            description: 'Missing or invalid field',
            schema: {
                message: 'Invalid field'
            }
        }

        #swagger.responses[500] = {
            description: 'Uncaught error',
            schema: {
                message: '...'
            }
        }
    */
);

export = router;