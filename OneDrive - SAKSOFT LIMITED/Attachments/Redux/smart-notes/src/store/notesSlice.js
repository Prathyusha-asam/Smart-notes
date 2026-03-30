import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const loadNotes = (username) => {
  const data = localStorage.getItem(`notes_${username}`);
  return data ? JSON.parse(data) : [];
};

const saveNotes = (username, notes) => {
  localStorage.setItem(`notes_${username}`, JSON.stringify(notes));
};

const notesSlice = createSlice({
  name: 'notes',
  initialState: { items: [], username: null },
  reducers: {
    loadUserNotes: (state, action) => {
      state.username = action.payload;
      state.items = loadNotes(action.payload);
    },
    addNote: (state, action) => {
      const note = {
        id: uuidv4(),
        title: action.payload.title || 'Untitled',
        content: action.payload.content || '',
        tags: action.payload.tags || [],
        priority: action.payload.priority || 'normal',
        pinned: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      state.items.unshift(note);
      saveNotes(state.username, state.items);
    },
    updateNote: (state, action) => {
      const idx = state.items.findIndex(n => n.id === action.payload.id);
      if (idx !== -1) {
        state.items[idx] = { ...state.items[idx], ...action.payload, updatedAt: new Date().toISOString() };
        saveNotes(state.username, state.items);
      }
    },
    deleteNote: (state, action) => {
      state.items = state.items.filter(n => n.id !== action.payload);
      saveNotes(state.username, state.items);
    },
    togglePin: (state, action) => {
      const note = state.items.find(n => n.id === action.payload);
      if (note) {
        note.pinned = !note.pinned;
        saveNotes(state.username, state.items);
      }
    },
    clearUserNotes: (state) => {
      state.items = [];
      state.username = null;
    },
  },
});

export const { loadUserNotes, addNote, updateNote, deleteNote, togglePin, clearUserNotes } = notesSlice.actions;
export default notesSlice.reducer;