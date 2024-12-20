const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    toDate: { type: String, required: true },
    fromDate: { type: String, required: true },
    totalPrice: { type: String, required: true },
});

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;
