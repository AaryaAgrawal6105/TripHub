const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
    name: String,
    destination: String,
    startDate: Date,
    endDate: Date,
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    todos: [{ task: String, done: Boolean}],
    budget: [{ description: String, amount: Number}],
    itinerary: [{ day: Number, title: String, description: String}],
    comments: [{user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}, comment: String}]
});

module.exports = mongoose.model('Trip', tripSchema);


