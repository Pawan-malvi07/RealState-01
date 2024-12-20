const Order = require('../model/Order');

const user = {
  create: async (req, res) => {
    try {
      console.log('Body:', req.body);

      const { name, email,  toDate, fromDate,totalPrice } = req.body;

      if (!name || !email  || !toDate || !fromDate || !totalPrice ) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      const newOrder = new Order({ name, email, toDate, fromDate, totalPrice   });
      await newOrder.save();

      res.status(201).json({ message: 'Order created successfully', order: newOrder });
    } catch (error) {
      console.error('Error creating order:', error.message); 
      res.status(500).json({ message: 'Error creating order', error: error.message });
    }
  },
  getAllOrder: async (req, res) => {
    try {
      const orders = await Order.find(); 
      res.status(200).json(orders); 
    } catch (error) {
      console.error('Error fetching orders:', error);
      res.status(500).json({ message: 'Error fetching orders', error: error.message });
    }
  },
};

module.exports = user;
