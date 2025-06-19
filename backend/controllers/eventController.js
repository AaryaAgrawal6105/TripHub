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

const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findOne({ _id: req.params.id, user: req.user.id });
    if (!event) return res.status(404).json({ msg: 'Event not found' });
    await event.deleteOne();
    res.json({ success: true, msg: 'Event deleted' });
  } catch (error) {
    res.status(500).json({ msg: 'Error deleting event' });
  }
};

module.exports = { addEvent, getEvents, deleteEvent };
