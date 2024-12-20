const mongoose = require("mongoose");

const dbconnect = async () => {
    try {
        // Connect to MongoDB using the URI from the .env file
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Database connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Database connection error: ${error.message}`);
        process.exit(1); // Exit the process with failure
    }
};

module.exports = dbconnect;
