const Trip = require('../models/Trip');

const createTrip = async (req,res) => {
    const{name, destination, startDate, endDate} = req.body;
    try
    {
        const trip = await Trip.create({
            name, destination, startDate, endDate, createdBy: req.userId, members: [req.userId]
        });

        res.status(201).json(trip);
    }
    catch(err)
    {
        res.status(500).json({msg: err.message});
    }
};

const getUserTrips = async (req,res) => {
    try
    {
        const trips = await Trip.find({members: req.userId});
        res.json(trips);
    }
    catch(err)
    {
        res.status(500).json({ msg: err.message});
    }
};

// controllers/tripController.js
const joinTrip = async (req, res) => {
  const tripId = req.params.id;  // ✅ FIXED
  const userId = req.userId;

  console.log("Join Trip Request", { tripId, userId });

  try {
    const trip = await Trip.findById(tripId);
    if (!trip) {
      return res.status(404).json({ msg: 'Trip not found' });
    }

    if (trip.members.includes(userId)) {
      return res.status(400).json({ msg: 'Already joined' });
    }

    trip.members.push(userId);
    await trip.save();

    res.status(200).json({ msg: 'Successfully joined the trip' });
  } catch (err) {
    console.error("Join Trip Error:", err);
    res.status(500).json({ msg: 'Error joining trip' });
  }
};


const addTodo = async (req, res) => {
  const { id } = req.params;
  const { task } = req.body;

  try {
    const trip = await Trip.findById(id);
    if (!trip) return res.status(404).json({ message: "Trip not found" });

    const newTodo = { task, done: false };
    trip.todos.push(newTodo);
    await trip.save();

    // Send back the newly added todo
    const addedTodo = trip.todos[trip.todos.length - 1];
    res.status(201).json(addedTodo); // ✅ this must return the todo
  } catch (err) {
    console.error("Failed to add todo:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const toggleTodo = async (req, res) => {
  const { id: tripId, todoId } = req.params;

  try {
    const trip = await Trip.findById(tripId);
    if (!trip) return res.status(404).json({ message: 'Trip not found' });

    const todo = trip.todos.id(todoId); // Access by subdocument ID
    if (!todo) return res.status(404).json({ message: 'Todo not found' });

    todo.done = !todo.done;
    await trip.save();

    res.status(200).json(todo);
  } catch (err) {
    console.error('Error toggling todo:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
const deleteTodo = async (req, res) => {
  const { id: tripId, todoId } = req.params;

  try {
    const trip = await Trip.findById(tripId);
    if (!trip) return res.status(404).json({ message: 'Trip not found' });

    const todo = trip.todos.id(todoId);
    if (!todo) return res.status(404).json({ message: 'Todo not found' });

    todo.deleteOne(); // or todo.remove() if using Mongoose <6
    await trip.save();

    res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (err) {
    console.error('Error deleting todo:', err);
    res.status(500).json({ message: 'Server error' });
  }
};



const addBudget = async (req,res) => {
    const {description, amount} = req.body;
    const trip = await Trip.findById(req.params.id);
    trip.budget.push({description, amount});
    await trip.save();  
    res.json(trip.budget);
};

const deleteBudget = async (req,res) => {
    const trip = await Trip.findById(req.params.id);
    trip.budget = trip.budget.filter(b => b._id.toString() !== req.params.budgetId);
    await trip.save();
    res.json(trip.budget);
};

const addItinerary  = async (req,res) => {
    const {day, title, description} = req.body;
    const trip = await Trip.findById(req.params.id);
    trip.itinerary.push({day, title, description});
    await trip.save();
    res.json(trip.itinerary);
}

const deleteItinerary = async (req,res) => {
    const trip = await Trip.findById(req.params.id);
    trip.itinerary = trip.itinerary.filter(i => i._id.toString() !== req.params.itineraryId);
    await trip.save();
    res.json(trip.itinerary);
};

const addComment = async (req,res) => {
    const {comment} = req.body;
    const trip = await Trip.findById(req.params.id);
    trip.comments.push({user: req.userId, comment});
    await trip.save();
    res.json(trip.comments);
};

const deleteComment = async (req,res) => {
    const trip =  await Trip.findById(req.params.id);
    trip.comments = trip.comments.filter(c => !(c._id.toString() === req.params.commentId && c.user.toString() === req.userId));
    await trip.save();
    res.json(trip.comments);
};

module.exports = { createTrip, getUserTrips, joinTrip, addTodo, toggleTodo, deleteTodo, addBudget, deleteBudget, addItinerary, deleteItinerary, addComment, deleteComment};