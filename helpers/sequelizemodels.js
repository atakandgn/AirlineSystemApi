// helpers/sequelizemodels.js
const {DataTypes} = require('sequelize');

const clients = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
    },
    surname: {
        type: DataTypes.STRING,
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
    },
    phone: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
    },
}

const flights = {
    flight_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    departure_location: {
        type: DataTypes.STRING,
    },
    destination_location: {
        type: DataTypes.STRING,
    },
    date: {
        type: DataTypes.STRING,
    },
    price: {
        type: DataTypes.FLOAT,
    },
    seat_capacity: {
        type: DataTypes.INTEGER,
    },
}

module.exports = {
    clients,
    flights,
};
