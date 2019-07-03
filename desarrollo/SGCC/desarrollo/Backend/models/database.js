const { db } = require('../config/config');

const Sequelize = require('sequelize'),
    sequelize = new Sequelize(db.database, db.user, db.password, {
        host: db.host,
        port: db.port,
        dialect: db.dialect,
        operatorsAliases: false,
        logging: db.logging
    })

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database: '+err.message);
    });

const database = {};

database.sequelize = sequelize;

module.exports = database;