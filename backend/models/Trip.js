const mongoose = require('mongoose');

// Sub-schema for todos
const todoSchema = new mongoose.Schema(
  {
    task: { type: String, required: true },
    done: { type: Boolean, default: false },
  },
  { _id: true }
);

// Sub-schema for itinerary
const itinerarySchema = new mongoose.Schema({
  day: Number,
  date: Date,
  timeOfDay: {
    type: String,
    enum: ['Morning', 'Afternoon', 'Evening', 'Night'],
  },
  exactTime: String,
  activity: String,
  location: String,
  accommodation: String,
  transportation: String,
  notes: String,
});

// Sub-schema for chat messages
const chatMessageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  senderName: String, // 🟢 new field to store name directly
  text: String,
  timestamp: { type: Date, default: Date.now },
});

// Main Trip schema
const tripSchema = new mongoose.Schema({
  name: { type: String, required: true },
  destination: String,
  startDate: Date,
  endDate: Date,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  todos: [todoSchema],
  budget: [{ description: String, amount: Number }],
  itinerary: [itinerarySchema],
  messages: [chatMessageSchema],
  comments: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      comment: String,
    },
  ],
});

module.exports = mongoose.model('Trip', tripSchema);
