const userModel = require('../model/user.js'); 

const user = {
   Login: async (req, res) => {
    const {email,password} = req.body;
        userModel.findOne({email:email})
        .then(user =>{
            if(user){
                if(user.password === password){
                    res.json("success")
                }else{
                    res.json("the password is incorrect")
                }
            } else{
                res.json("no record found")
            }
        })

    },
    
  regi : async (req, res) => {
    const { email } = req.body;
    const existingUser = await userModel.findOne({ email });
    
    if (existingUser) {
        return res.json({ error: "Email already registered" });
    }
    userModel.create(req.body)
        .then(result => res.json(result))
        .catch(err => res.json({ error: err.message }));
}

};

module.exports = user; 
