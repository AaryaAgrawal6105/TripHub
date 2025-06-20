const express = require('express');
const router = express.Router();
const {getTripById, createTrip, getUserTrips, joinTrip, addTodo, toggleTodo, deleteTodo, addBudget, deleteBudget, addItinerary, deleteItinerary, addComment, deleteComment} = require('../controllers/tripController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, createTrip);
router.get('/', auth, getUserTrips);
router.post('/:id/join', auth, joinTrip);
router.get('/:id', auth, getTripById);

router.post('/:id/todos', auth, addTodo);
router.patch('/:id/todos/:todoId', auth, toggleTodo);
router.delete('/:id/todos/:todoId', auth, deleteTodo);

router.post('/:id/budget', auth, addBudget);
router.delete('/:id/budget/:budgetId', auth, deleteBudget);

router.post('/:id/itinerary', auth, addItinerary);
router.delete('/:id/itinerary/:itineraryId', auth, deleteItinerary);

router.post('/:id/comments', auth, addComment);
router.delete('/:id/comments/:commentId', auth, deleteComment);


module.exports = router;