const Order = require("../models/Order");

exports.createOrder = async (req, res, next) => {
  const order = new Order(req.body);
  try {
    await order.save();
    res.json({ msn: "Se agrego un nuevo pedido" });
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({}).populate("client").populate({
      path: "products.product",
      model: "Products",
    });
    res.json(orders);
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.getOrder = async (req, res, next) => {
  const order = await (await Order.findById(req.params.id))
    .populate("client")
    .populate({
      path: "products.product",
      model: "Products",
    });
  if (!order) {
    res.json({ msn: "ID no valido" });
    return next();
  }
  res.json(order);
};

exports.updateOrder = async (req, res, next) => {
  try {
    const order = await Order.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    )
      .populate("client")
      .populate({
        path: "products.product",
        model: "Products",
      });
    res.json(order);
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.deleteOrder = async (req, res, next) => {
  try {
    await Order.findOneAndDelete({ _id: req.params.id });
    res.json({ msn: "Orden Eliminada" });
  } catch (error) {
    console.log(error);
    next();
  }
};
