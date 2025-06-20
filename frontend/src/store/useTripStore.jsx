// src/store/useTripStore.js
import { create } from 'zustand';
import { axiosInstance } from '../api';

export const useTripStore = create((set, get) => ({
  trip: JSON.parse(localStorage.getItem('selectedTrip')) || null,

  setTrip: (tripData) => {
    const normalizedTrip = {
      ...tripData,
      todos: tripData.todos || []
    };
    localStorage.setItem('selectedTrip', JSON.stringify(normalizedTrip));
    set({ trip: normalizedTrip });
  },

  fetchTripById: async (tripId) => {
    if (!tripId) return;
    try {
      const res = await axiosInstance.get(`/trips/${tripId}`);
      get().setTrip(res.data);
    } catch (err) {
      console.error('Failed to fetch trip:', err);
    }
  },

addTodo: async (tripId, task) => {
  if (!tripId || !task) return;
  try {
    const res = await axiosInstance.post(`/trips/${tripId}/todos`, { task });
    const addedTodo = res.data;

    if (!addedTodo || !addedTodo._id) {
      console.warn('Invalid todo returned from API');
      return;
    }

    const currentTrip = get().trip;
    const updatedTrip = {
      ...currentTrip,
      todos: [...(currentTrip?.todos || []), addedTodo],
    };
    get().setTrip(updatedTrip);
  } catch (err) {
    console.error('Error adding todo:', err);
  }
},

  toggleTodo: async (tripId, todoId) => {
    if (!tripId || !todoId) return;
    try {
      const res = await axiosInstance.patch(`/trips/${tripId}/todos/${todoId}`);
      const updatedTodo = res.data;

      const currentTrip = get().trip;
      const updatedTodos = (currentTrip?.todos || []).map((todo) =>
        todo._id === todoId ? updatedTodo : todo
      );

      get().setTrip({ ...currentTrip, todos: updatedTodos });
    } catch (err) {
      console.error('Error toggling todo:', err);
    }
  },

  deleteTodo: async (tripId, todoId) => {
    if (!tripId || !todoId) return;
    try {
      await axiosInstance.delete(`/trips/${tripId}/todos/${todoId}`);
      const currentTrip = get().trip;
      const updatedTodos = (currentTrip?.todos || []).filter((todo) => todo._id !== todoId);
      get().setTrip({ ...currentTrip, todos: updatedTodos });
    } catch (err) {
      console.error('Error deleting todo:', err);
    }
  },
}));
