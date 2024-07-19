const jwt = require("jsonwebtoken");
const userModel = require("../model/users.model");

const authUser = (req, res, next) => {

    if (
        req.headers &&
        req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "JWT"
      ) {
        jwt.verify(
          req.headers.authorization.split(" ")[1],
          process.env.JWT_SECRET,
          function (err, verifiedToken) {
            console.log("verified Token", verifiedToken);
            if (err) {
              res.status(401).json({ message: "Invalid JWT Token" });
            }
    
            userModel
              .findById(verifiedToken._id)
              .then((user) => {
                req.user = user;
                next();
              })
              .catch((err) =>
                res.status(500).json({ messsage: "server not available" })
              );
          }
        );
      } else {
        res.status(403).json({ message: "token not present" });
      }
      
    };
    
    module.exports = authUser;

