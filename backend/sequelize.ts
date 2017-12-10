import { Sequelize } from 'sequelize-typescript';

export const sequelize = new Sequelize({
    host: 'ec2-79-125-26-23.eu-west-1.compute.amazonaws.com',
    dialect: 'postgres',
    dialectOptions: {
        ssl: true
    },

    database: 'd7knq8je6v6150',
    username: 'pxmgstzwpbwmzv',
    password: 'c2bd0dc980edaecd5f416cf145d579b5e89ab34f9415ccc5f6dbc2dc34acdc7d',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },

    modelPaths: [__dirname + '/models'],

    operatorsAliases: false
});
