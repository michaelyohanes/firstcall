import { sequelize } from '../config/db';
import Sequelize from 'sequelize';

export const tblUser = require('./user')(sequelize, Sequelize);

module.exports = {
    sequelize,
    Sequelize,
    tblUser
};