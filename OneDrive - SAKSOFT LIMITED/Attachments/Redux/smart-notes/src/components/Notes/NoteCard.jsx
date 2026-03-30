import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteNote, togglePin } from '../../store/notesSlice';

const priorityColor = { high: '#ef4444', normal: '#6366f1', low: '#22c55e' };
const priorityLabel = { high: 'HIGH', normal: 'NORMAL', low: 'LOW' };

export default function NoteCard({ note, onEdit }) {
  const dispatch = useDispatch();

  return (
    <div className="note-card" style={{ borderTop: `3px solid ${priorityColor[note.priority]}` }}>
      <div className="note-card-header">
        <h3 className="note-title">{note.title}</h3>

        <button
          className={`pin-btn ${note.pinned ? 'pinned' : ''}`}
          onClick={() => dispatch(togglePin(note.id))}
          title={note.pinned ? 'Unpin' : 'Pin'}
        >
          {note.pinned ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3" fill="white" stroke="white"/>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
          )}
        </button>
      </div>

      <span className={`priority-badge priority-${note.priority}`}>
        {priorityLabel[note.priority]}
      </span>

      <p className="note-content">
        {note.content.slice(0, 120)}{note.content.length > 120 ? '...' : ''}
      </p>

      <div className="note-tags">
        {note.tags.map(tag => <span key={tag} className="tag">#{tag}</span>)}
      </div>

      <div className="note-footer">
        <span className="note-date">{new Date(note.updatedAt).toLocaleDateString()}</span>
        <div className="note-actions">
          <button onClick={() => onEdit(note)} className="btn-edit" title="Edit">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
            Edit
          </button>

          <button onClick={() => dispatch(deleteNote(note.id))} className="btn-delete" title="Delete">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
              <path d="M10 11v6"/><path d="M14 11v6"/>
              <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
            </svg>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}