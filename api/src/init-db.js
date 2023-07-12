require('dotenv').config();

const { sequelize, tblUser } = require('../dist/src/models');

return sequelize.sync({ force: true }).then(() => {
    console.log('Drop and Resync Db');

    const users = [
        {
            username: 'myadmin',
            firstname: 'Administrator',
            lastname: 'Testing'
        },
        {
            username: 'myuser1',
            firstname: 'Marshall',
            lastname: 'Mathers'
        }
    ];

    users.map((user) => {
        const { username, firstname, lastname } = user;

        tblUser.create({
            username,
            firstname,
            lastname
        });
    });
});