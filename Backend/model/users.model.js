const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        requied: true,
      },
    email: {
        type: String,
        required: true,
        unique: true,
        message: "Email already exists"
    },
    password: {
        type: String,
        required: true
    }
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
