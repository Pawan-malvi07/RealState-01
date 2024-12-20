const fs = require('fs');
const path = require('path');
const multer = require('multer');

// Define the uploads directory path
const uploadsDir = path.join(__dirname, '../uploads');

// Check if 'uploads' directory exists, and create it if it doesn't
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true }); // Create 'uploads' directory if it doesn't exist
}

// Set up multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir); // Store files in the 'uploads' folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Rename the file to avoid duplicates
    }
});

// Create the multer upload instance with storage configuration
const upload = multer({ storage: storage });

module.exports = upload; // Export the upload instance
