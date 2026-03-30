import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';
import NotesList from './NotesList';
import NoteEditor from './NoteEditor';
import Threads from '../Threads/Threads';

export default function NotesApp() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState('');
  const [sort, setSort] = useState('date');
  const [showEditor, setShowEditor] = useState(false);
  const [editNote, setEditNote] = useState(null);
  const allNotes = useSelector(state => state.notes.items);
  const allTags = [...new Set(allNotes.flatMap(n => n.tags))];
  const openCreate = () => { setEditNote(null); setShowEditor(true); };
  const openEdit = (note) => { setEditNote(note); setShowEditor(true); };
  const closeEditor = () => { setShowEditor(false); setEditNote(null); };
  const handleSortToggle = (clicked) => {
    if (clicked === 'priority') {
      setSort(prev => prev === 'priority' ? 'date' : 'priority');
    } else {
      setSort('date');
    }
  };

  return (
    <div className="app-layout">
      <div className="threads-app-bg">
        <Threads
          color={[0.38, 0.4, 0.95]}
          amplitude={0.6}
          distance={0.15}
          enableMouseInteraction={false}
        />
      </div>
      <aside className="sidebar">
        <div className="sidebar-logo">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '8px', flexShrink: 0}}>
            <polygon points="12 2 2 7 12 12 22 7 12 2"/>
            <polyline points="2 17 12 22 22 17"/>
            <polyline points="2 12 12 17 22 12"/>
          </svg>
          <span>SmartNotes</span>
        </div>

        <div className="sidebar-user">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
          {user.username}
        </div>

        <button className="new-note-btn" onClick={openCreate}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          New Note
        </button>

        <div className="sidebar-section">
          <p className="sidebar-label">FILTER BY TAG</p>
          <button
            className={`tag-btn ${activeTag === '' ? 'active' : ''}`}
            onClick={() => setActiveTag('')}
          >
            All Notes
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              className={`tag-btn ${activeTag === tag ? 'active' : ''}`}
              onClick={() => setActiveTag(tag)}
            >
              # {tag}
            </button>
          ))}
        </div>

        <div className="sidebar-section">
          <p className="sidebar-label">SORT BY</p>
          <button
            className={`tag-btn ${sort === 'date' ? 'active' : ''}`}
            onClick={() => handleSortToggle('date')}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{marginRight:'6px'}}>
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            Date
          </button>
          <button
            className={`tag-btn ${sort === 'priority' ? 'active' : ''}`}
            onClick={() => handleSortToggle('priority')}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{marginRight:'6px'}}>
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
            Priority {sort === 'priority' && <span className="sort-active-hint">(click to reset)</span>}
          </button>
        </div>

        <button className="logout-btn" onClick={() => dispatch(logout())}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          Logout
        </button>
      </aside>
      <main className="main-area">
        <div className="topbar">
          <div className="search-wrapper">
            <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              className="search-input"
              placeholder="Search notes..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>

        <NotesList search={search} activeTag={activeTag} sort={sort} onEdit={openEdit} />
      </main>

      {showEditor && <NoteEditor note={editNote} onClose={closeEditor} />}
    </div>
  );
}