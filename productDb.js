// Import the database connection function
const connectToDatabase = require("./Database/connection");

// Import the Product model
const Product = require("./Models/schema");

// Import the product data
const products = require("./product.json");

// Load environment variables
require("dotenv").config()

// Function to add data to the database
const addDataToDb = async () => {
    try {
        // Connect to the database
        await connectToDatabase();

        // Create new products in the database
        await Product.create(products)

        // Delete any duplicate products
        await Product.deleteMany({ products })

        // Log success message
        console.log("Data added to the database successfully...");

    } catch (error) {
        // Log any errors
        console.error("Error adding data to the database: ", error);
    }
};

// Call the function to add data to the database
addDataToDb();