const Event = require('../models/Events');

const addEvent = async (req, res) => {
  const { date, text, color } = req.body;
  const userId = req.user.id;

  try {
    const existing = await Event.findOne({ user: userId, date });
    if (existing) {
      existing.text = text;
      existing.color = color;
      await existing.save();
      return res.status(200).json(existing);
    }

    const newEvent = await Event.create({ user: userId, date, text, color });
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getEvents = async (req, res) => {
  try {
    const events = await Event.find({ user: req.user.id });
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { addEvent, getEvents };
