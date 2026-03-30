import React from 'react';
import { useSelector } from 'react-redux';
import NoteCard from './NoteCard';

export default function NotesList({ search, activeTag, sort, onEdit }) {
  const notes = useSelector(state => state.notes.items);

  let filtered = notes.filter(note => {
    const matchSearch = note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.content.toLowerCase().includes(search.toLowerCase());
    const matchTag = activeTag === '' || note.tags.includes(activeTag);
    return matchSearch && matchTag;
  });

  if (sort === 'date') {
    filtered = [...filtered].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  } else if (sort === 'priority') {
    const order = { high: 0, normal: 1, low: 2 };
    filtered = [...filtered].sort((a, b) => order[a.priority] - order[b.priority]);
  }

  const pinned = filtered.filter(n => n.pinned);
  const unpinned = filtered.filter(n => !n.pinned);

  return (
    <div className="notes-container">
      {pinned.length > 0 && (
        <>
          <h2 className="notes-section-title">📌 Pinned</h2>
          <div className="notes-grid">
            {pinned.map(note => <NoteCard key={note.id} note={note} onEdit={onEdit} />)}
          </div>
        </>
      )}
      {unpinned.length > 0 && (
        <>
          {pinned.length > 0 && <h2 className="notes-section-title">📄 Notes</h2>}
          <div className="notes-grid">
            {unpinned.map(note => <NoteCard key={note.id} note={note} onEdit={onEdit} />)}
          </div>
        </>
      )}
      {filtered.length === 0 && (
        <div className="empty-state">
          <p> No notes found. Create your first note!</p>
        </div>
      )}
    </div>
  );
}