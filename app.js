const express = require('express');
// const dbconnect = require('./config/db');
const mongoose = require('mongoose');
const app = express();
const dotenv = require("dotenv").config();
const villaRouter = require('./routes/villaRouter'); 
const authRouter = require("./routes/villaRouter")
const cors = require('cors');
const path = require('path');
const OrderRouter = require("./routes/OrderRouter"); 
const stripe = require('stripe')('sk_test_51QHj6QALkxG8EHORogEqqZ09MBO1teylkolLDaqUlB4R47Ztav4QvcmvGNixtO7ACSrcd9ZWOORmw2M8Upx6ifY900EoLHZlob')
const dbconnect = require('./config/db.js'); // Import the dbconnect function

dbconnect(); // Connect to MongoDB



// dbconnect();



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


mongoose.connect('mongodb://localhost:27017/employee', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.post("/api/create-checkout-session", async (req, res) => {
    const { product } = req.body;
    
    const lineItems = product.map((item) => ({
        price_data: {
            currency: "inr",
            product_data: {
                name: item.dish
            },
            unit_amount: item.price * 100
        },
        quantity: item.qnty
    }));

    try {
       
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: "http://localhost:3000/success",
            cancel_url: "http://localhost:3000/cancel",
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({ message: 'Error creating checkout session', error: error.message });
    }
});


app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true
}));


app.use('/api/users', authRouter); 
app.use('/api/villas', villaRouter); 
app.use('/api/orders', OrderRouter); 



app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
