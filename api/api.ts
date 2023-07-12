import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';

import { sequelize } from './src/config/db';
import routeUser from './src/routes/user';

const swaggerDocument = JSON.parse(fs.readFileSync('/api/dist/swagger.json', 'utf8'));

sequelize.sync();

const corsOptions = {
    origin: process.env.APP_URL || 'http://localhost:3000'
};

const app = express();

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    // #swagger.ignore = true
    res.json({ message: 'API' });
});

app.use('/api-docs', swaggerUi.serve);
app.get(
    '/api-docs',
    swaggerUi.setup(
        swaggerDocument,
        {
            explorer: true
        }
    )
    // #swagger.ignore = true
);

app.use('/user', routeUser);

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});