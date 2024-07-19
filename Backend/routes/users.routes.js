const userController = require("../controllers/users.controller");
const authUser = require("../middleware/authUser.middleware");

module.exports = (app) => {
    app.post("/api/register", userController.register);
    app.post("/api/login", userController.login);


    app.get("/api/user", authUser, userController.getUserInfo);
}