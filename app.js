// Import required modules
const express = require("express");
const app = express();
const port = 8000 || process.env.port
require("dotenv").config() // Load environment variables

// Middleware to parse JSON bodies from HTTP requests
app.use(express.json());

// Import and use router
const router = require("./Router/route");

// Define route for product API
app.use("/api/product", router);

app.get('/', (req, res) => {
    res.send("Hi am Live")
})

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
            console.log(`server start on port ${port}`);
        })
    } catch (error) {
        // Log any server start errors
        console.log(error);
    }
}
// Call server function to start server
server()