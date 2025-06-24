// src/store/useTripStore.js
import { create } from 'zustand';
import { axiosInstance } from '../api';

export const useTripStore = create((set, get) => ({
  trip: JSON.parse(localStorage.getItem('selectedTrip')) || null,
  selectedTrip: null,
  savedPins: [],
  placesToVisit: [],
  
  setSelectedTrip: (trip) => {
    console.log("Setting selected trip:", trip);
    set({ selectedTrip: trip });
  },

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
      console.log("Fetching trip by ID:", tripId);
      const res = await axiosInstance.get(`/trips/${tripId}`);
      if (res.data && res.data._id) {
        get().setTrip(res.data);
        get().setSelectedTrip(res.data);
      } else {
        console.warn("Invalid trip data returned from backend", res.data);
      }
    } catch (err) {
      console.error('Failed to fetch trip:', err);
      throw err;
    }
  },

  // Todo functions
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
      throw err;
    }
  },

  toggleTodo: async (tripId, todoId) => {
    try {
      const res = await axiosInstance.patch(`/trips/${tripId}/todos/${todoId}`);
      const updatedTodo = res.data;

      if (!updatedTodo || !updatedTodo._id) {
        console.warn('Invalid todo returned from toggle API');
        return;
      }

      const currentTrip = get().trip;
      const updatedTodos = (currentTrip?.todos || []).map((todo) =>
        todo._id === todoId ? updatedTodo : todo
      );

      const updatedTrip = {
        ...currentTrip,
        todos: updatedTodos,
      };

      get().setTrip(updatedTrip);
    } catch (err) {
      console.error('Error toggling todo:', err);
      throw err;
    }
  },

  deleteTodo: async (tripId, todoId) => {
    try {
      await axiosInstance.delete(`/trips/${tripId}/todos/${todoId}`);
      const currentTrip = get().trip;

      const updatedTodos = (currentTrip?.todos || []).filter(
        (todo) => todo._id !== todoId
      );

      const updatedTrip = {
        ...currentTrip,
        todos: updatedTodos,
      };

      get().setTrip(updatedTrip);
    } catch (err) {
      console.error('Error deleting todo:', err);
      throw err;
    }
  },

  // Pin functions - Fixed
  getSavedPins: async (tripId) => {
    if (!tripId) {
      console.warn("No tripId provided to getSavedPins");
      return [];
    }
    
    try {
      console.log("Getting saved pins for trip:", tripId);
      const res = await axiosInstance.get(`/trips/${tripId}/pins`);
      console.log("API response for pins:", res.data);
      
      const pins = Array.isArray(res.data) ? res.data : [];
      set({ savedPins: pins });
      return pins;
    } catch (err) {
      console.error("Failed to fetch saved pins:", err);
      
      // Check if it's a 404 (trip not found) vs other errors
      if (err.response?.status === 404) {
        console.warn("Trip not found when fetching pins");
        return [];
      }
      
      throw err;
    }
  },

  addSavedPin: async (tripId, pinData) => {
    if (!tripId || !pinData) {
      throw new Error("Missing tripId or pinData");
    }
    
    try {
      console.log("Adding pin to trip:", tripId, pinData);
      const res = await axiosInstance.post(`/trips/${tripId}/pins`, pinData);
      console.log("Add pin API response:", res.data);
      
      // The backend returns the full pins array
      const updatedPins = Array.isArray(res.data) ? res.data : [];
      set({ savedPins: updatedPins });
      
      return updatedPins;
    } catch (err) {
      console.error("Failed to add pin:", err);
      
      // Log more details about the error
      if (err.response) {
        console.error("Error response:", err.response.data);
        console.error("Error status:", err.response.status);
      }
      
      throw err;
    }
  },

  deletePin: async (tripId, pinId) => {
    if (!tripId || !pinId) {
      throw new Error("Missing tripId or pinId");
    }
    
    try {
      console.log("Deleting pin:", pinId, "from trip:", tripId);
      const res = await axiosInstance.delete(`/trips/${tripId}/pins/${pinId}`);
      
      const updatedPins = Array.isArray(res.data) ? res.data : [];
      set({ savedPins: updatedPins });
      
      return updatedPins;
    } catch (err) {
      console.error("Failed to delete pin:", err);
      throw err;
    }
  },

  // Places to visit functions
  addPlaceToVisit: async (tripId, placeData) => {
    try {
      const res = await axiosInstance.post(`/trips/${tripId}/places`, placeData);
      const updatedPlaces = Array.isArray(res.data) ? res.data : [];
      set({ placesToVisit: updatedPlaces });
      return updatedPlaces;
    } catch (err) {
      console.error("Failed to add place to visit:", err);
      throw err;
    }
  },

  deletePlaceToVisit: async (tripId, placeId) => {
    try {
      const res = await axiosInstance.delete(`/trips/${tripId}/places/${placeId}`);
      const updatedPlaces = Array.isArray(res.data) ? res.data : [];
      set({ placesToVisit: updatedPlaces });
      return updatedPlaces;
    } catch (err) {
      console.error("Failed to delete place to visit:", err);
      throw err;
    }
  },
}));