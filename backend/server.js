const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");
const Trip = require('./models/Trip');
const User = require('./models/User'); 

dotenv.config();
const app = express();
const server = http.createServer(app); // ⬅️ use HTTP server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // frontend URL
    credentials: true,
  },
});

const tripRoutes = require('./routes/tripRoutes');
const authRoutes = require('./routes/authRoutes');
const emailRoutes = require('./routes/emailRoutes');
const blogRoutes = require('./routes/blogRoutes'); 
const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const aiRoutes = require("./routes/aiRoutes");

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

// Connect DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB is successfully connected"))
  .catch(err => console.log(err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/email',  emailRoutes);
app.use("/api/home/blogs", blogRoutes);
app.use('/api/user', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/expenses', expenseRoutes);
app.use("/api/ai", aiRoutes);

// Real-time Chat Handling
io.on('connection', (socket) => {
  socket.on('join-trip', ({ tripId, userId }) => {
    socket.join(tripId);
  });

  socket.on('send-message', async ({ tripId, userId, text }) => {
    try {
      const user = await User.findById(userId).select('name'); // fetch user name

      const message = {
        sender: userId,
        text,
        timestamp: new Date(),
      };

      const trip = await Trip.findById(tripId);
      trip.messages.push(message);
      await trip.save();

      const fullMessage = {
        sender: {
          _id: userId,
          name: user.name,
        },
        text,
        timestamp: message.timestamp,
      };

      io.to(tripId).emit('receive-message', fullMessage);
    } catch (err) {
      console.error('Error sending message:', err.message);
    }
  });
});

// Start Server
server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
