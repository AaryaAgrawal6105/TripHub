// src/store/useTripStore.js
import { create } from 'zustand';
import { axiosInstance } from '../utils/axiosInstance';

export const useTripStore = create((set, get) => ({
  trip: null,
  setTrip: (tripData) => set({ trip: tripData }),

  addTodo: async (tripId, task) => {
    try {
      const res = await axiosInstance.post(`/trips/${tripId}/todos`, { task });
      const updatedTrip = { ...get().trip, todos: [...get().trip.todos, res.data] };
      set({ trip: updatedTrip });
    } catch (err) {
      console.error('Error adding todo:', err);
    }
  },

  toggleTodo: async (tripId, todoId) => {
    try {
      const res = await axiosInstance.patch(`/trips/${tripId}/todos/${todoId}`);
      const updatedTodos = get().trip.todos.map((todo) =>
        todo._id === todoId ? res.data : todo
      );
      set({ trip: { ...get().trip, todos: updatedTodos } });
    } catch (err) {
      console.error('Error toggling todo:', err);
    }
  },

  deleteTodo: async (tripId, todoId) => {
    try {
      await axiosInstance.delete(`/trips/${tripId}/todos/${todoId}`);
      const updatedTodos = get().trip.todos.filter((todo) => todo._id !== todoId);
      set({ trip: { ...get().trip, todos: updatedTodos } });
    } catch (err) {
      console.error('Error deleting todo:', err);
    }
  },
}));
