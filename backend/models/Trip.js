const mongoose = require('mongoose');

// Sub-schema for todos
const todoSchema = new mongoose.Schema({
  task: { type: String, required: true },
  done: { type: Boolean, default: false },
}, { _id: true });

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
  senderName: String,
  text: String,
  timestamp: { type: Date, default: Date.now },
});

  // Sub-schema for saved pins
  const savedPinSchema = new mongoose.Schema({
    lat: Number,
    lng: Number,
    label: String,
  });

  // Sub-schema for saved places
  const placeSchema = new mongoose.Schema({
    name: String,
    lat: Number,
    lng: Number,
    description: String,
  });

// Main Trip schema
const tripSchema = new mongoose.Schema({
  name: { type: String, required: true },
  destination: String,
  destinationCoordinates: {
    lat: Number,
    lng: Number,
  },
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
  savedPins: [savedPinSchema],
  placesToVisit: [placeSchema],
});

module.exports = mongoose.model('Trip', tripSchema);

