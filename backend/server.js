const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();


const tripRoutes = require('./routes/tripRoutes');
const authRoutes = require('./routes/authRoutes');
const emailRoutes = require('./routes/emailRoutes'); 

const app = express();
app.use(cors(
    {
  origin: 'http://localhost:5173', 
  credentials: true,                
}
));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB is successfully connected"))
.catch(err => console.log(err));

app.use('/api/auth', authRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/email',  emailRoutes);

app.listen(process.env.PORT, () => {
    console.log(`The server is running on port ${process.env.PORT}`)
});