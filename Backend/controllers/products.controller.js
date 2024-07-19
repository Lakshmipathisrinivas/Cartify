const productModel = require('../model/products.model');

exports.create = async (req, res) => {
    try {
        const {
            title,
            description,
            price,
            rating: { rate, count },
            category,
            image,
        } = req.body;

        const newProduct = new productModel({
            title,
            description,
            price,
            rating: { rate, count },
            category,
            image,
        });

        const data = await newProduct.save();

        if (!data) {
            return res.status(400).json({ message: "Something went wrong" });
        }

        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ message: "Server not available", error: error.message });
    }
};

exports.fetch = async (req, res) => {
    try {
        const data = await productModel.find();

        if (!data) {
            return res.status(404).json({ message: "Data not found" });
        }

        res.send(data);
    } catch (error) {
        res.status(500).json({ message: "Server not available", error: error.message });
    }
};

exports.updateOne = async (req, res) => {
    const _id = req.params.id;

    try {
        const data = await productModel.findById(_id);

        if (!data) {
            return res.status(404).json({ message: "Data not found" });
        }

        res.send(data);
    } catch (error) {
        res.status(500).json({ message: "Server not available", error: error.message });
    }
};

exports.fetchOne = async (req, res) => {
    const _id = req.params.id;

    try {
        const data = await productModel.findById(_id);

        if (!data) {
            return res.status(404).json({ message: "Data not found" });
        }

        res.send(data);
    } catch (error) {
        res.status(500).json({ message: "Server not available", error: error.message });
    }
};

exports.deleteOne = async (req, res) => {
    const _id = req.params.id;

    try {
        const data = await productModel.findByIdAndDelete(_id);

        if (!data) {
            return res.status(404).json({ message: "Data not found" });
        }

        res.send(data);
    } catch (error) {
        res.status(500).json({ message: "Server not available", error: error.message });
    }
};
