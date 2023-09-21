// Import required modules
const express = require("express");
const { createProduct, getProduct, updateProduct, deleteProduct, getAllProduct } = require("../Controllers/product")

// Create a new router
const router = express.Router();

// Define route to get all products
router.route("/").get(getAllProduct)

// Define route to create a new product
router.route("/create").post(createProduct)

// Define route to get a specific product by id
router.route("/getproduct/:id").get(getProduct)

// Define route to update a specific product by id
router.route("/updateproduct/:id").put(updateProduct)

// Define route to delete a specific product by id
router.route("/deleteproduct/:id").delete(deleteProduct)

// Export the router
module.exports = router