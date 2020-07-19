const express = require("express");
const clientController = require("../controllers/clientController");
const productController = require("..//controllers/productController");
const orderController = require("../controllers/orderController");
const userController = require("../controllers/userController");
const auth = require("../midleware/auth");
const router = express.Router();
module.exports = function () {
  // clientes
  router.post("/clients", auth, clientController.newClient);
  router.get("/clients", auth, clientController.getClients);
  router.get("/clients/:id", auth, clientController.getClient);
  router.put("/clients/:id", auth, clientController.updateClient);
  router.delete("/clients/:id", auth, clientController.deleteClient);
  // productos
  router.get("/products", auth, productController.showProducts);
  router.get("/products/:id", auth, productController.showProduct);
  router.post("/products/search/:query", auth, productController.searchProduct);
  router.post(
    "/products",
    auth,
    productController.uploadFile,
    productController.newProduct
  );
  router.put(
    "/products/:id",
    auth,
    productController.uploadFile,
    productController.updateProduct
  );
  router.delete("/products/:id", auth, productController.deleteProduct);
  // ordenes de compra
  router.get("/orders", auth, orderController.getOrders);
  router.get("/orders/:id", auth, orderController.getOrder);
  router.post("/orders/:idUser", auth, orderController.createOrder);
  router.put("/orders/:id", auth, orderController.updateOrder);
  router.delete("orders/:id", auth, orderController.deleteOrder);
  // user
  router.post("/signup", userController.signUp);
  router.post("/signin", userController.signIn);
  return router;
};
