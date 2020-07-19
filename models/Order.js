const mongoose = require("mongoose");
const orderSchema = mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
      },
      quantity: Number,
    },
  ],
  total: {
    type: Number,
  },
});
module.exports = mongoose.model("Order", orderSchema);
