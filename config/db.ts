import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('postgres://postgres:root@localhost:5432/fire_compass');

export default sequelize;