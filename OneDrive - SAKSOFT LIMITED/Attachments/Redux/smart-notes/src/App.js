import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadUserNotes, clearUserNotes } from './store/notesSlice';
import AuthPage from './components/Auth/AuthPage';
import NotesApp from './components/Notes/NotesApp';

function App() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    if (user) {
      dispatch(loadUserNotes(user.username));
    } else {
      dispatch(clearUserNotes());
    }
  }, [user, dispatch]);

  return user ? <NotesApp /> : <AuthPage />;
}

export default App;