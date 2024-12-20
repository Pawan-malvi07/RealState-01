const Villa = require('../model/Property.js'); 


const user = {
create: async (req, res) => {
    try {
        console.log('File:', req.file); 
        console.log('Body:', req.body); 

        const { title, guest, bedroom, bathroom, location, price, meters, checkin, checkout } = req.body;
      
        const image = req.file ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}` : null;

     
        if (!title || !image ||!guest || !bedroom || !bathroom || !location || !price || !meters || !checkin || !checkout ) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newVilla = new Villa({
            title,
            image,
            guest,
            bedroom,
            bathroom,
            location,
            price,
            meters,
            checkin,
            checkout,
            
        });

        const savedVilla = await newVilla.save();
        res.status(201).json(savedVilla);
    } catch (error) {
        res.status(500).json({ message: 'Error creating villa', error: error.message });
    }
},

delet: async (req, res) => {  
    try {
        const villaId = req.params.id;
        const deletedVilla = await Villa.findByIdAndDelete(villaId);
        if (!deletedVilla) {
            return res.json({ message: 'Villa not found' });
        }
        res.json({ message: 'Villa deleted successfully', villa: deletedVilla });
    } catch (error) {
        res.json({ message: 'Error deleting villa', error: error.message });
    }
},

    all: async(req,res) =>{
        try {
            
            const allVillas = await Villa.find();
            if (!allVillas) {
                return res.json({ message: 'Villa not found' });
            }   
            res.json({ message: 'Villa find all successfully', villa: allVillas });
        } catch (error) {
            res.json({ message: 'Error finding villa', error: error.message });
        }
        },

       
    id: async(req,res) =>{
        try {
            const villaId = req.params.id;
            const deletedVilla = await Villa.findById(villaId);
            if (!deletedVilla) {
                return res.json({ message: 'Villa not found' });
            }   
            res.json({ message: 'Villa find  successfully', villa: deletedVilla });
        } catch (error) {
            res.json({ message: 'Error finding villa', error: error.message });
        }
        },
        update: async (req, res) => {
            try {
                const { id } = req.params; 
                const updates = req.body;  
        
                const requiredFields = ['title', 'guestCapacity', 'bedrooms', 'bathrooms', 'location', 'price', 'squareMeters', 'checkInDate', 'checkOutDate'];
        
                const missingFields = requiredFields.filter(field => !updates[field]);
                if (missingFields.length > 0) {
                    return res.json({ message: 'All fields are required', missingFields });
                }
        
                const updatedVilla = await Villa.findByIdAndUpdate(id, updates, { new: true });
        
                if (!updatedVilla) {
                    return res.json({ message: 'Villa not found' });
                }
        
                res.json(updatedVilla);
            } catch (error) {
                res.json({ message: 'Error updating villa', error: error.message });
            }
        },
        
    

};  
module.exports = user;
