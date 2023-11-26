// helpers/sequelize.js
const {Sequelize} = require("sequelize");

let sequelize = null;


const initializeSequelize = async () => {
    sequelize = new Sequelize("airlinecompany", "atakandogan", "12345678Aa", {
        host: "atakandogan.database.windows.net",
        dialect: "mssql",
    });
    return sequelize;
}


module.exports = {
    sequelize,
    initializeSequelize
};
