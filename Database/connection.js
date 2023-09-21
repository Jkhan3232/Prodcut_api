// Import mongoose module
const mongoose = require("mongoose");

// Function to connect to the database
const connectToDatabase = async () => {
    try {
        // Get MongoDB URI from environment variables
        let uri = process.env.MONGODB_URI;
        let isConnected = false;

        // Try to connect to Atlas database
        isConnected = await connect(uri);
        if (isConnected) {
            console.log("Atlas database connection successful...");
        } else {
            console.log("Atlas database connection failed. Trying to connect to local database...");
            // Set URI for local MongoDB instance
            uri = "mongodb://localhost:27017/Node_api";

            // Try to connect to local database
            isConnected = await connect(uri);
            if (isConnected) {
                console.log("Local database connection successful...");
            } else {
                console.log("Local database connection failed. Retrying in 5 seconds...");
                // Try to reconnect every 5 seconds
                setTimeout(connectToDatabase, 5000);
            }
        }
    } catch (error) {
        // Log any errors
        console.error("Error connecting to database: ", error);
    }
};

// Function to connect to a MongoDB instance
const connect = async (uri) => {
    try {
        // Connect to MongoDB with the given URI
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000 // Timeout after 5s instead of 30s
        });
        return true;
    } catch (error) {
        // Log any errors
        console.error("Error connecting to database: ", error);
        return false;
    }
};

// Export the connectToDatabase function
module.exports = connectToDatabase;