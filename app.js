// Import required modules
const express = require("express");
const app = express();
const port = 8000;
require("dotenv").config() // Load environment variables

// Middleware to parse JSON bodies from HTTP requests
app.use(express.json());

// Import and use router
const router = require("./Router/route");

// Define route for product API
app.use("/api/product", router);

// Middleware to parse URL-encoded bodies from HTTP requests
app.use(express.urlencoded({ extended: false }));

// Import and connect to database
const connectToDatabase = require("./Database/connection");
connectToDatabase();

// Define and start server
const server = async () => {
    try {
        // Start server on defined port
        app.listen(port, () => {
            console.log("server start on port 8000..");
        })
    } catch (error) {
        // Log any server start errors
        console.log(error);
    }
}
// Call server function to start server
server()