const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const cors = require("cors");
const mongoose = require('mongoose');
require('dotenv').config();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

mongoose.connect("mongodb+srv://lakshmipathisrinivass2022cse:55667788@cluster0.a7vci6c.mongodb.net/productinto?retryWrites=true&w=majority&appName=Cluster0").then(() => {
  console.log("MongoDB connection successful");
}).catch(err => {
  console.error("MongoDB connection error:", err);
});

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Backend");
});

require("./routes/product.routes")(app);
require("./routes/users.routes")(app);
