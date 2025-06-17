const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const register = async (req,res) => {
    const { name, email, password} = req.body;
    // console.log("Received data:", req.body);
    try
    {
        if (!name || !email || !password) 
        {
            return res.status(400).json({ msg: 'All fields are required' });
        }
        const existingUser = await User.findOne({email});
        if(existingUser) return res.status(400).json({ msg: 'User already exists'});

        const hashed = await bcrypt.hash(password, 10);
        const newUser = await User.create({ name, email, password: hashed});

        const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET,{expiresIn: '2d'});
        res.status(201).json({ user: newUser, token});
    }
    catch(err)
    {
        res.status(500).json({ msg: err.message});
    }
};

const login = async (req,res) => {
    const { email, password } = req.body;
    try
    {
        if (!email || !password) 
        {
            return res.status(400).json({ msg: 'All fields are required' });
        }
        const user = await User.findOne({ email });
        if(!user) 
        {
            return res.status(400).json({ msg: `Invalid email`});
        }

        const match = await bcrypt.compare(password, user.password);
        if(!match)
        {
            return res.status(400).json({ msg: `Invalid password`});
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET , {expiresIn: '2d'});
        res.json({user, token});
    }
    catch(err)
    {
        res.status(500).json({ msg: err.message });
    }
};

const checkAuth=  async(req, res)=>{
    try {
        return res.status(200).json(req.user)
    } catch (error) {
        console.log("Error in the checkAuth controller" , error.message);

            return res.status(500).json({ message: "Internal  Server Error" })
    }

}


module.exports = {register, login , checkAuth};