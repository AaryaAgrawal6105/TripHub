// src/store/useChatStore.js
import { create } from 'zustand';
import { io } from 'socket.io-client';
import { axiosInstance } from '../api';

const socket = io('http://localhost:5000'); // Make sure backend is running here

export const useChatStore = create((set, get) => ({
  messages: [],
  typingUsers: [],
  socket,

  initSocketListeners: (tripId, authUser) => {
    socket.emit('join-trip', { tripId, userId: authUser._id });

    socket.off('receive-message').on('receive-message', (message) => {
      set((state) => ({ messages: [...state.messages, message] }));
    });

    socket.off('typing').on('typing', ({ user }) => {
      if (user._id !== authUser._id) {
        set((state) => ({
          typingUsers: [...new Set([...state.typingUsers, user.name])],
        }));
      }
    });

    socket.off('stop-typing').on('stop-typing', ({ user }) => {
      set((state) => ({
        typingUsers: state.typingUsers.filter((u) => u !== user.name),
      }));
    });

    get().fetchMessages(tripId);
  },

  fetchMessages: async (tripId) => {
    try {
      const res = await axiosInstance.get(`/trips/${tripId}`);
      set({ messages: res.data.messages || [] });
    } catch (err) {
      console.error('Error loading messages', err);
    }
  },

  sendMessage: (tripId, { sender, content, timestamp }) => {
    socket.emit('send-message', {
      tripId,
      userId: sender._id,
      text: content,
      timestamp,
    });
  },

  emitTyping: (tripId, user) => {
    socket.emit('typing', { tripId, user });
  },

  emitStopTyping: (tripId, user) => {
    socket.emit('stop-typing', { tripId, user });
  },
}));
