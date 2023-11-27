// app.js
const express = require('express');
const sql = require('mssql');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const {sequelize, initializeSequelize} = require("./helpers/sequelize");
const {client, flights} = require("./helpers/sequelizemodels");
const {Op, literal} = require("sequelize");
const cors = require('cors');
const Joi = require('joi');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const sass = require('node-sass');
const path = require('path');


require('dotenv').config();
const app = express();
const port = "https://airlinesystemapi.onrender.com" || 3000;

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
            title: 'Airline API',
            version: '1.0.0',
            description: 'API for an Airline Company',
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
};

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login
 *     description: Authenticate user and generate JWT token
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
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token for authentication
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
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
        const userModel = sequelize.define("client", client, {
            timestamps: false,
            freezeTableName: true,
        });

        const user = await userModel.findOne({
            where: {
                username
            }
        });

        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).send('Authentication failed. Invalid username or password.');
        }

        const token = jwt.sign({username: user.username, password: user.password}, process.env.JWT_SECRET_KEY);

        return res.status(200).json({token});
    } catch (error) {
        console.error('Error:', error);
        return res.status(400).send('Invalid JSON format or login error');
    }
});

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register
 *     description: Create a new user account
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 required: true
 *                 description: Alphanumeric, 3-30 characters long
 *                 example: atakandogan
 *               name:
 *                 type: string
 *                 required: true
 *                 example: Atakan
 *               surname:
 *                 type: string
 *                 required: true
 *                 example: Doğan
 *               email:
 *                 type: string
 *                 format: email
 *                 required: true
 *                 example: atakan@example.com
 *               phone:
 *                 type: string
 *                 required: true
 *                 example: +1234567890
 *               password:
 *                 type: string
 *                 required: true
 *                 description: Minimum 6 characters long
 *                 example: secretPassword
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad Request
 */
// Register endpoint
app.post('/register', async (req, res) => {
    try {
        const {error, value} = Joi.object({
            username: Joi.string().alphanum().min(3).max(30).required(), // Alphanumeric, 3-30 karakter uzunluğunda
            name: Joi.string().required(),
            surname: Joi.string().required(),
            email: Joi.string().email().required(),
            phone: Joi.string().required(),
            password: Joi.string().min(6).required(), // Minimum 6 karakter uzunluğunda şifre
        }).validate(req.body);

        if (error) {
            return res.status(400).send(`Validation Error: ${error.details[0].message}`);
        }

        const {username, name, surname, email, phone, password} = value;

        // Şifreyi bcrypt kullanarak hashleme
        const hashedPassword = await bcrypt.hash(password, 10);

        const sequelize = await initializeSequelize();
        const userModel = sequelize.define("client", client, {
            timestamps: false,
            freezeTableName: true,
        });
        // Kullanıcıyı veritabanına ekleme
        const newUser = await userModel.create({
            username,
            name,
            surname,
            email,
            phone,
            password: hashedPassword, // Hashlenmiş şifreyi kaydetme
        });

        return res.status(201).send('User created successfully.');
    } catch (error) {
        console.error('Error:', error);
        return res.status(400).send('Invalid JSON format or registration error');
    }
});

/**
 * @swagger
 * /query-ticket:
 *   post:
 *     summary: Query ticket
 *     description: Query with date, from, to, and number of people
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
 *               perPage:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: List of flights
 *       400:
 *         description: Bad Request
 *       404:
 *         description: No matching flights found or numOfPeople exceeds seat capacity
 */
// Query Ticket endpoint
app.post('/query-ticket', async (req, res) => {
    try {
        const {error, value} = Joi.object({
            date: Joi.string().allow('', null),
            from: Joi.string().allow('', null),
            to: Joi.string().allow('', null),
            numOfPeople: Joi.number().integer().min(1),
            page: Joi.number().integer().min(1),
            perPage: Joi.number().integer().min(1).max(10),
        }).validate(req.body);

        if (error) {
            return res.status(400).send(`Validation Error: ${error.details[0].message}`);
        }

        const {date, from, to, numOfPeople, page = 1, perPage = 5} = value;

        if (!date && !from && !to && !numOfPeople) {
            return res.status(400).send('At least one of date, from, to, or numOfPeople must be provided');
        }
        if (page < 1) {
            return res.status(400).send('page must be greater than or equal to 1');
        }
        if (perPage < 1 || perPage > 10) {
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
        if (date && from && to) {
            whereObj = literal(`CONCAT(departure_location, destination_location) = '${from}${to}' AND date = '${date}'`);
        }

        const {count, rows} = await flightModel.findAndCountAll({
            attributes: ['flight_id', 'date', 'price'],
            where: whereObj,
            offset: (page - 1) * perPage,
            limit: perPage,
        });

        if (count === 0) {
            return res.status(404).send('No matching flights found.');
        }
        if (numOfPeople > rows.seat_capacity) {
            return res.status(400).send('numOfPeople exceeds seat capacity.');
        }
        rows.map((row) => {
            row.dataValues.totalPrice = row.dataValues.price * (numOfPeople || 1);
            return row;
        });

        return res.send({data: rows, countOfData: count, totalPages: Math.ceil(count / perPage), currentPage: page});
    } catch (error) {
        console.error('Error:', error);
        return res.status(400).send('Invalid JSON format or query error');
    }
});

/**
 * @swagger
 * /buy-ticket:
 *   post:
 *     summary: Buy ticket
 *     description: Perform a buy transaction using date, from, to, and passenger name
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
 *               name:
 *                 type: string
 *                 example: "Atakan"
 *               surname:
 *                 type: string
 *                 example: "Doğan"
 *               numOfPeople:
 *                 type: number
 *                 example: 1
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Status
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: No available flights for the specified criteria
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
        const {error, value} = Joi.object({
            date: Joi.string().required(),
            from: Joi.string().required(),
            to: Joi.string().required(),
            name: Joi.string().required(),
            surname: Joi.string().required(),
            numOfPeople: Joi.number().required().integer().min(1)
        }).validate(req.body);

        if (error) {
            return res.status(400).send(`Validation Error: ${error.details[0].message}`);
        }

        const {date, from, to, name, surname, numOfPeople} = value;
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
                return res.status(404).send('No matching flight found ');
            }
            if (flight.seat_capacity < numOfPeople) {
                await transaction.rollback();
                return res.status(404).send('Not enough seats available');
            }

            flight.seat_capacity -= numOfPeople;
            await flight.save({transaction});
            await transaction.commit();


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



