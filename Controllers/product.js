// Import Product model
const Product = require("../Models/schema")

// Controller to get all products
exports.getAllProduct = async (req, res) => {
    try {
        // Destructure query parameters
        const { company, featured, name, price, sort, select, page = 1, limit = 5 } = req.query
        const Pass_Data = {}

        // Add Filtering
        if (name) {
            Pass_Data.name = { $regex: name, $options: "i" }
        }
        if (company) {
            Pass_Data.company = company
        }
        if (featured) {
            Pass_Data.featured = featured
        }
        if (price) {
            Pass_Data.price = price
        }

        let sortQuery = Product.find(Pass_Data)

        // Add Sorting
        if (sort) {
            const sortParams = sort.split(",").join(" ")
            sortQuery = sortQuery.sort(sortParams)
        }

        // Add Select
        if (select) {
            const selectParams = select.split(",").join(" ")
            sortQuery = sortQuery.select(selectParams)
        }

        // Add pagination
        const skip = (page - 1) * limit;
        sortQuery = sortQuery.skip(skip).limit(parseInt(limit));

        // Execute query
        const Product_data = await sortQuery

        // Send response
        res.status(200).json({ Product_data, nhight: Product_data.length })

    } catch (error) {
        // Log error
        console.log(error);
    }
}

// Controller to create a product
exports.createProduct = async (req, res) => {
    try {
        // Destructure request body
        const { name, price, featured, company, description, images } = req.body
        // Create new product
        const product = new Product({ company, featured, name, price, description, images });

        // Save product
        await product.save();
        // Send response
        res.status(201).json({ product });
    } catch (error) {
        // Log error
        console.log(error);
        // Send error response
        res.status(500).json({ error: 'An error occurred while creating a product' });
    }
}

// Controller to get a single product by id
exports.getProduct = async (req, res) => {
    try {
        // Find product by id
        const product = await Product.findById(req.params.id);
        // Send response
        res.status(200).json({ product });
    } catch (error) {
        // Log error
        console.log(error);
        // Send error response
        res.status(500).json({ error: 'An error occurred while fetching the product' });
    }
}

// Controller to update a product by id
exports.updateProduct = async (req, res) => {
    try {
        // Update product by id and get updated product
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        // Send response
        res.status(200).json({ product });
    } catch (error) {
        // Log error
        console.log(error);
        // Send error response
        res.status(500).json({ error: 'An error occurred while updating the product' });
    }
}

// Controller to delete a product by id
exports.deleteProduct = async (req, res) => {
    try {
        // Delete product by id
        await Product.findByIdAndDelete(req.params.id);
        // Send response
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        // Log error
        console.log(error);
        // Send error response
        res.status(500).json({ error: 'An error occurred while deleting the product' });
    }
}