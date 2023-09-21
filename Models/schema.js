// Import mongoose module
const mongoose = require("mongoose")

// Define product schema
const productSchema = mongoose.Schema({
    // Define name field
    name: {
        type: String,
        require: true,
        trim: true
    },
    // Define price field
    price: {
        type: Number,
        trim: true,
        require: true
    },
    // Define featured field
    featured: {
        type: Boolean,
        default: false,
        require: true
    },
    // Define rating field
    rating: {
        type: Number,
        default: 4.3
    },
    // Define createdAt field
    createdAt: {
        type: Date,
        default: Date.now()
    },
    // Define description field
    description: {
        type: String,
        required: true,
    },
    // Define images field
    images: {
        type: String, // Array of strings to store multiple image URLs
        required: true
    },
    // Define company field
    company: {
        type: String,
        trim: true,
        validate: {
            // Validator to ensure company is one of the supported ones
            validator: function (v) {
                return ["apple", "samsung", "nothing", "moto", "mi", "vivo", "oneplus"].includes(v);
            },
            // Message to display when validation fails
            message: props => `${props.value} is not supported`
        }
    }
})

// Create Product model from the schema
const Product = mongoose.model('Product', productSchema);

// Export the Product model
module.exports = Product;