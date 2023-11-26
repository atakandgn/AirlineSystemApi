# Airline API Project

This repository contains the source code for an API project developed for a fictitious airline company. The project provides web services for clients to perform ticketing transactions with the airline company.

## Project Overview

The API project includes the following features:

- **Query Ticket:** Clients can query for available flights based on the date, departure location, destination location, and the number of people.

- **Buy Ticket:** Clients can perform a ticket purchase transaction using the date, departure location, destination location, passenger name, and the number of people.

## Technologies Used

- **Node.js and Express:** The server is built using Node.js and the Express framework.

- **Swagger:** Swagger is integrated to provide API documentation. You can access the Swagger UI at the `/api-docs` endpoint.

- **Sequelize:** Sequelize is used as the ORM (Object-Relational Mapping) tool for interacting with the database.

- **JWT (JSON Web Token):** Authentication is implemented using JWT. Clients need to include a valid JWT token in the request header for authenticated endpoints.

- **Bcrypt:** Passwords are securely hashed using Bcrypt before being stored in the database.

## Development Environment

The project is developed using the Node.js runtime and can be run locally on any machine with Node.js installed. Make sure to set up the required environment variables by creating a `.env` file based on the provided `.env.example`.

## Database

The data model is implemented using Sequelize and assumes the usage of a relational database. Currently, the code is set up to work with a database service from any cloud provider, with a preference for Azure.

## How to Run

1. Install dependencies: `npm install`
2. Set up the database connection and environment variables in a `.env` file.
3. Run the server: `npm start`
4. Access the API at `http://localhost:3000`

## Endpoints

- **GET `/`:** Root endpoint providing a welcome message and information about the API.

- **POST `/login`:** Endpoint for user authentication. Requires a valid username and password.

- **POST `/register`:** Endpoint for user registration. Creates a new user account.

- **POST `/query-ticket`:** Endpoint for querying available flights based on specified criteria.

- **POST `/buy-ticket`:** Endpoint for purchasing tickets. Requires authentication and deducts available seats upon successful transaction.

## Additional Notes

- The project includes a basic front-end element using SCSS for styling. Access the welcome message by visiting the root URL.

- Please refer to the Swagger documentation for detailed information on each endpoint.

## Issues and Assumptions

- Refer to the [Issues](#) section for known issues and potential improvements.

- [Assumptions Document](#) provides information about assumptions made during the development process.

## Video Presentation

A short video presenting the project can be found [here](#).

Feel free to explore the code, contribute, and provide feedback. Thank you for checking out this Airline API project!

## Communication
For communication: reach out to atakandogan.info@gmail.com or [LinkedIn](https://www.linkedin.com/in/atakandoan/) 
