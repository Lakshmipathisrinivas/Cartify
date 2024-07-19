const productController = require("../controllers/products.controller");
//const authUser = require("../middleware/authUser.middleware");

module.exports = (app) => {
    app.post("/api/product", productController.create);
    app.get("/api/products", productController.fetch);
    app.put("/api/product/:id", productController.updateOne);  
    app.get("/api/product/:id",  productController.fetchOne);   
    app.delete("/api/product/:id", productController.deleteOne);  
};