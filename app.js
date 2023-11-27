// app.js
const express = require('express');
const sql = require('mssql');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const {sequelize, initializeSequelize} = require("./helpers/sequelize");
const {clients, flights} = require("./helpers/sequelizemodels");
const {Op, literal} = require("sequelize");
const cors = require('cors');
const Joi = require('joi');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const sass = require('node-sass');
const path = require('path');


require('dotenv').config();
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));


// Start the server

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
app.use(cors());
app.use(express.json());

// Root endpoint
app.get('/', (req, res) => {
    // SCSS code
    const scssCode = `
        .content-item {
            background: url(/bannertkn.png) !important;
            background-size: cover;
            background-position: center;
            height: 300px;
            margin: 20px auto;
            overflow: hidden;
            position: relative;
            width: 400px;
            .overlay {
                border-bottom: 100px solid #e8c63d;
                border-left: 100px solid transparent;
                bottom: 0;
                height: 0;
                opacity: 0.95;
                position: absolute;
                right: 0;
                text-indent: -9999px;
                transition: all 0.5s ease-out;
                width: 0;
            }
            &:hover .overlay {
                border-bottom: 800px solid #e8c63d;
                border-left: 800px solid transparent;
                transition: all 0.5s ease-out;
            }
            .corner-overlay-content {
                font-size: 20px;
                font-weight: bold;
                font-style: italic;
                bottom: 15px;
                color: #333;
                position: absolute;
                right: 15px;
                transition: all 0.5s ease-out;
            }
            &:hover .corner-overlay-content {
                opacity: 0;
                transition: all 0.5s ease-out;
            }
            .overlay-content {
                bottom: 0;
                color: #333;
                left: 0;
                opacity: 0;
                padding: 30px;
                position: absolute;
                right: 0;
                top: 0;
                transition: all 0.3s ease-out;
                h2 {
                    font-size: 24px;
                    line-height: 1.8;
                    text-transform: uppercase;
                    text-align: center;
                    border-bottom: 1px solid #333;
                    padding: 0 0 12px;
                }
                p {
                    font-size: 20px;
                    line-height: 1.5;
                    margin: 0;
                    text-align: center;
                    a {
                        color: #de262b;
                        text-decoration: underline;
                        font-weight: bold;
                        font-size: 20px;
                    }
                }
            }
            &:hover .overlay-content {
                opacity: 1;
                transition: all 0.3s ease-out;
                transition-delay: 0.3s;
            }
        }

        body {
            display: grid;
            height: 100vh;
            margin: 0;
            place-items: center;
            background: #333333;
        }
    `;

    // Compile SCSS to CSS
    const cssCode = sass.renderSync({
        data: scssCode
    }).css.toString();

    // HTML content
    const htmlResponse = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>${cssCode}</style>
            <title>Welcome to the Airline API Server!</title>
        </head>
        <body>
            <div class="content-item">
                <div class="overlay"></div>
                <div class="corner-overlay-content">Info</div>
                <div class="overlay-content">
                    <h2>Welcome to the Airline API Server!</h2>
                    <p>Please use the <a href="/api-docs" target="_blank">/api-docs</a> endpoint to view the documentation.</p>
                </div>
            </div>
        </body>
        </html>
    `;

    res.send(htmlResponse);
});

// Swagger Documentation Setup
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Airline System API',
            version: '1.0.0',
            description: 'API for an Airline Company',
            contact: {
                name: 'Atakan Doğan',
                email: 'atakandogan.info@gmail.com',
                url: 'https://github.com/atakandgn/AirlineSystemApi'
            },
        },
    },
    apis: ['app.js'],
};


const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Authentication Middleware
const authenticateUser = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).send('Authentication failed. Token not provided or invalid.');
    }

    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Authentication Error:', error);
        return res.status(401).send('Authentication failed. Invalid token.');
    }
}
/**
 * @swagger
 * tags:
 *   name: Non-Auth Endpoints
 *   description: Endpoints that do not require authentication
 */
// Login Endpoint Swagger Documentation
/**
 * @swagger
 * /login:
 *   post:
 *     summary: User Login
 *     description: Authenticate a user and generate a JWT token
 *     tags: [Non-Auth Endpoints]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 required: true
 *                 example: atakandogan
 *               password:
 *                 type: string
 *                 required: true
 *                 example: secretPassword
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
// Login endpoint
app.post('/login', async (req, res) => {
    try {
        const {error, value} = Joi.object({
            username: Joi.string().required(),
            password: Joi.string().required(),
        }).validate(req.body);

        if (error) {
            return res.status(400).send(`Validation Error: ${error.details[0].message}`);
        }

        const {username, password} = value;
        const sequelize = await initializeSequelize();
        const userModel = sequelize.define("clients", clients, {
            timestamps: false,
            freezeTableName: true,
        });

        const user = await userModel.findOne({
            attributes: ['id', 'username', 'name', 'surname', 'password'],
            where: {
                username
            }
        });
        if (!user) {
            return res.status(401).send('Login failed. User not found!');
        }

        if (user.username !== username) {
            return res.status(401).send('Login failed. Invalid username!');
        }

        if (!await bcrypt.compare(password, user.password)) {
            return res.status(401).send('Login failed. Invalid password!');
        }
        const tokenPayload = {
            id: user.id,
            username: user.username,
            name: user.name,
            surname: user.surname,
            password: user.password
        };
        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET_KEY);

        return res.status(200).json({token});
    } catch (error) {
        console.error('Error:', error);
        return res.status(400).send('Invalid JSON format or login error');
    }
});

// Register Swagger Documentation
/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     tags: [Non-Auth Endpoints]
 *     requestBody:
 *       description: User registration data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 30
 *                 pattern: '^[a-zA-Z0-9]+$'
 *                 example: atakandogan
 *               name:
 *                 type: string
 *                 example: Atakan
 *               surname:
 *                 type: string
 *                 example: Doğan
 *               email:
 *                 type: string
 *                 format: email
 *                 example: atakandogan@example.com
 *               phone:
 *                 type: string
 *                 example: 05321234567
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 example: secret123
 *     responses:
 *       '201':
 *         description: User created successfully
 *       '400':
 *         description: Validation error or duplicate username/email/phone
 *       '500':
 *         description: Internal server error during registration
 */
// Register endpoint
app.post('/register', async (req, res) => {
    try {
        const {error, value} = Joi.object({
            username: Joi.string().alphanum().min(3).max(30).required(),
            name: Joi.string().required(),
            surname: Joi.string().required(),
            email: Joi.string().email().required(),
            phone: Joi.string().required(),
            password: Joi.string().min(6).required(),
        }).validate(req.body);

        if (error) {
            return res.status(400).send(`Validation Error: ${error.details[0].message}`);
        }

        const {username, name, surname, email, phone, password} = value;

        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        const sequelize = await initializeSequelize();
        const userModel = sequelize.define('clients', clients, {
            timestamps: false,
            freezeTableName: true,
        });

        // Check if the username, email, or phone already exists
        const existingUser = await userModel.findOne({
            where: {
                [Op.or]: [
                    {username},
                    {email},
                    {phone},
                ],
            },
        });

        if (existingUser) {
            if (existingUser.username === username) {
                return res.status(400).send('Error: Username already exists.');
            }
            if (existingUser.email === email) {
                return res.status(400).send('Error: Email already exists.');
            }
            if (existingUser.phone === phone) {
                return res.status(400).send('Error: Phone already exists.');
            }
        }

        // Create a new user
        const newUser = await userModel.create({
            username,
            name,
            surname,
            email,
            phone,
            password: hashedPassword,
        });

        if (!newUser) {
            return res.status(500).send('Registration error occurred. Please try again.');
        }

        return res.status(201).send('User created successfully.');
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).send('Internal server error during registration.');
    }
});

// Query Ticket Swagger Documentation
/**
 * @swagger
 * /query-ticket:
 *   post:
 *     summary: Query Ticket
 *     description: Query with date, from, to, and number of people
 *     tags:
 *       - Non-Auth Endpoints
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date-time
 *                 example: "2023-12-01T12:00:00"
 *               from:
 *                 type: string
 *                 example: "IST"
 *               to:
 *                 type: string
 *                 example: "JFK"
 *               numOfPeople:
 *                 type: integer
 *                 example: 1
 *               page:
 *                 type: integer
 *                 example: 1
 *                 nullable: true
 *               perPage:
 *                 type: integer
 *                 example: 2
 *                 nullable: true
 *     responses:
 *       200:
 *         description: List of flights
 *       400:
 *         description: Bad Request
 *       404:
 *         description: No matching flights found or numOfPeople exceeds seat capacity
 */
// Query Ticket Endpoint
app.post('/query-ticket', async (req, res) => {
    try {
        const {error, value} = Joi.object({
            date: Joi.string().allow('', null),
            from: Joi.string().allow('', null),
            to: Joi.string().allow('', null),
            numOfPeople: Joi.number().integer().min(1),
            page: Joi.number().integer().allow('', null).min(1),
            perPage: Joi.number().integer().allow('', null).min(1).max(10),
        }).validate(req.body);

        if (error) {
            return res.status(400).send(`Validation Error: ${error.details[0].message}`);
        }

        const {date, from, to, numOfPeople, page, perPage} = value;

        if (!date && !from && !to && !numOfPeople) {
            return res.status(400).send('At least one of date, from, to, or numOfPeople must be provided');
        }
        const defaultPage = 1;
        const defaultPerPage = 5;
        const currentPage = page || defaultPage;
        const itemsPerPage = perPage || defaultPerPage;

        if (currentPage < 1) {
            return res.status(400).send('page must be greater than or equal to 1');
        }
        if (itemsPerPage < 1 || itemsPerPage > 10) {
            return res.status(400).send('perPage must be between 1 and 10');
        }

        const sequelize = await initializeSequelize();
        const flightModel = sequelize.define(
            "flights",
            flights,
            {
                timestamps: false,
                freezeTableName: true,
            }
        );

        let whereObj = {};
        if (date) {
            whereObj.date = date;
        }
        if (from) {
            whereObj.departure_location = from;
        }
        if (to) {
            whereObj.destination_location = to;
        }
        if (numOfPeople) {
            whereObj.seat_capacity = {
                [Op.gte]: numOfPeople,
            };
        }
        const {count, rows} = await flightModel.findAndCountAll({
            attributes: ['flight_id', 'date', 'price'],
            where: whereObj,
            limit: itemsPerPage,
            offset: (currentPage - 1) * itemsPerPage,
        });

        if (count === 0) {
            return res.status(404).send('No matching flights found.');
        }
        const invalidFlights = rows.filter(row => numOfPeople > row.seat_capacity);
        if (invalidFlights.length > 0) {
            return res.status(400).send('numOfPeople exceeds seat capacity.');
        }

        rows.forEach(row => {
            row.dataValues.totalPrice = row.dataValues.price * (numOfPeople || 1);
        });
        return res.send({
            data: rows,
            countOfData: count,
            totalPages: Math.ceil(count / itemsPerPage),
            currentPage: currentPage
        });
    } catch (error) {
        console.error('Error:', error);
        return res.status(400).send('Invalid JSON format or query error');
    }
});


/**
 * @swagger
 * tags:
 *   name: Auth Endpoints
 *   description: Endpoints that require authentication
 */
/**
 * @swagger
 * /buy-ticket:
 *   post:
 *     summary: Buy Ticket
 *     description: Perform a buy transaction using date, from, to, and passenger name
 *     tags: [Auth Endpoints]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date-time
 *                 example: "2023-12-01T12:00:00"
 *               from:
 *                 type: string
 *                 example: "IST"
 *               to:
 *                 type: string
 *                 example: "JFK"
 *               numOfPeople:
 *                 type: number
 *                 example: 1
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Ticket purchase successful
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: No available flights for the specified criteria
 *       500:
 *         description: Internal Server Error
 */
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 *          in: header
 *          name: Authorization
 *          description: JWT token for authentication
 */
// Buy Ticket endpoint
app.post('/buy-ticket', authenticateUser, async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).send('Unauthorized user.');
        }
        const {error, value} = Joi.object({
            date: Joi.string().required(),
            from: Joi.string().required(),
            to: Joi.string().required(),
            numOfPeople: Joi.number().required().integer().min(1),
        }).validate(req.body);

        if (error) {
            return res.status(400).send(`Validation Error: ${error.details[0].message}`);
        }

        const {date, from, to, numOfPeople} = value;
        const {name, surname} = req.user;

        const sequelize = await initializeSequelize();
        const flightsModel = sequelize.define("flights", flights, {
            timestamps: false,
            freezeTableName: true,
        });
        const transaction = await sequelize.transaction();
        try {

            let whereObj = {};
            if (date) {
                whereObj.date = date;
            }
            if (from) {
                whereObj.departure_location = from;
            }
            if (to) {
                whereObj.destination_location = to;
            }
            if (numOfPeople) {
                whereObj.seat_capacity = {
                    [Op.gte]: numOfPeople,
                };
            }

            const flight = await flightsModel.findOne({
                where: whereObj,
                lock: transaction.LOCK.UPDATE,
                transaction,
            });

            if (!flight) {
                await transaction.rollback();
                return res.status(404).send('No matching flight found! Please try another flight.');
            }
            if (flight.seat_capacity < numOfPeople) {
                await transaction.rollback();
                return res.status(404).send('Not enough seats available');
            }
            if (numOfPeople > flight.seat_capacity) {
                await transaction.rollback();
                return res.status(400).send('numOfPeople exceeds seat capacity.');
            }
            flight.seat_capacity -= numOfPeople;
            await flight.save({transaction});
            await transaction.commit();

            console.log('Authenticated user information:', req.user);

            return res.status(200).send(
                "Ticket purchase successfully. " +
                "Flight ID: " + flight.flight_id + " - " +
                "Date: " + flight.date + " - " +
                "Name: " + name + " - " +
                "Surname: " + surname + " - " +
                "Departure Location: " + flight.departure_location + " - " +
                "Destination Location: " + flight.destination_location + " - " +
                "Number of People: " + numOfPeople + " - " +
                "Total Price: " + flight.price * numOfPeople + " - " +
                "Single Ticket Price: " + flight.price
            );
        } catch (error) {
            console.error('Transaction Error:', error);
            await transaction.rollback();
            return res.status(500).send('Ticket purchase failed. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        return res.status(400).send('Invalid JSON format or buy ticket error');
    }
});



