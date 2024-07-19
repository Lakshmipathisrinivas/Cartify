const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    rating: {
        rate: Number,
        count: Number,
    },
    category: String,
    image: String,
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
