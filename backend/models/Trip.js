const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema(
  {
    task: String,
    done: { type: Boolean, default: false },
  },
  { _id: true } // ✅ ensure _id is included for each todo
);

const tripSchema = new mongoose.Schema({
  name: String,
  destination: String,
  startDate: Date,
  endDate: Date,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  todos: [todoSchema], // ✅ use embedded sub-schema
  budget: [{ description: String, amount: Number }],
  itinerary: [{ day: Number, title: String, description: String }],
  comments: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      comment: String,
    },
  ],
});

module.exports = mongoose.model('Trip', tripSchema);
