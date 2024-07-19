const userModel = require("../model/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    try {
      const { fullName, email, password } = req.body;
  
      const userExists = await userModel.findOne({ email });
  
      if (userExists) {
        return res.status(400).send({ message: "User already registered" });
      }
  
      const newUser = new userModel({
        fullName,
        email,
        password: bcrypt.hashSync(password, 10),
      });
  
      await newUser.save();
      
      res.status(200).send({ message: "User registered successfully" });
    } catch (error) {
      res.status(500).send({
        message: error.message || "Some error occurred while registering",
      });
    }
  };
  
  exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await userModel.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: "User is not registered" });
      }
  
      const isValidPassword = bcrypt.compareSync(password, user.password);
  
      if (!isValidPassword) {
        return res.status(401).send({ message: "Invalid Password" });
      }
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  
      res.send({
        user: {
          id: user._id,
          email: user.email,
          fullName: user.fullName,
        },
        accessToken: token,
      });
    } catch (error) {
      res.status(500).send({ message: "Server not running" });
    }
  };



/* *************************************** */

  exports.getUserInfo = async (req, res) => {
    try {
      // Get the access token from the request headers
      const token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  
      const userId = decodedToken.id;
  
      // Fetch user information based on the user ID
      const user = await userModel.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.json({
        fullName: user.fullName,
        email: user.email,
        // Add other user information fields as needed
      });
    } catch (error) {
      console.error('Error fetching user info:', error);
      res.status(500).send({ message: "Server error" });
    }
  };
  