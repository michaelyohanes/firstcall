import { sequelize } from '../config/db';
import Sequelize from 'sequelize';

module.exports = () => {
    return sequelize.define('users', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: Sequelize.TEXT,
            allowNull: false,
            validate: {
                len: {
                    args: [6, 50],
                    msg: 'Username should between 6 - 50 char length'
                },
                notEmpty: { msg: 'Username should not be empty' },
                notNull: { msg: 'Username should not be empty' }
            },
            unique: {
                name: '1',
                msg: 'This username is already taken.'
            },
        },
        firstname: {
            type: Sequelize.TEXT,
            allowNull: false,
            validate: {
                len: {
                    args: [6, 50],
                    msg: 'First name should between 6 - 50 char length'
                },
                notEmpty: { msg: 'First name should not be empty' },
                notNull: { msg: 'First name should not be empty' },
            }
        },
        lastname: {
            type: Sequelize.TEXT,
            allowNull: true,
            validate: {
                len: {
                    args: [0, 60],
                    msg: 'Last name should not exceed 60 char length'
                },
            }
        }
    }, {
        paranoid: true
    });
};