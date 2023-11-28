// helpers/sequelize.js
const {Sequelize} = require("sequelize");

let sequelize = null;

const initializeSequelize = async () => {
    sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        dialect: process.env.DB_SERVER,
    });
    return sequelize;
}

module.exports = {
    sequelize,
    initializeSequelize
};
