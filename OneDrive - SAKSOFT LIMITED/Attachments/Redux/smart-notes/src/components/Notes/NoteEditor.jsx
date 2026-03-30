import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNote, updateNote } from '../../store/notesSlice';

export default function NoteEditor({ note, onClose }) {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    title: note?.title || '',
    content: note?.content || '',
    tags: note?.tags?.join(', ') || '',
    priority: note?.priority || 'normal',
  });

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });

  const save = () => {
    const payload = {
      ...form,
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
    };
    if (note) dispatch(updateNote({ id: note.id, ...payload }));
    else dispatch(addNote(payload));
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{note ? 'Edit Note' : 'New Note'}</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <input name="title" className="modal-input" placeholder="Note title..." value={form.title} onChange={handle} />
        <textarea name="content" className="modal-textarea" placeholder="Write your note here..." value={form.content} onChange={handle} rows={8} />
        <input name="tags" className="modal-input" placeholder="Tags (comma separated): React, Work, Ideas" value={form.tags} onChange={handle} />

        <div className="priority-row">
          <span>Priority:</span>
          {['low', 'normal', 'high'].map(p => (
            <button
              key={p}
              className={`priority-btn ${form.priority === p ? 'active-' + p : ''}`}
              onClick={() => setForm({ ...form, priority: p })}
            >
              {p === 'high' ? '🔴' : p === 'normal' ? '🟡' : '🟢'} {p}
            </button>
          ))}
        </div>

        <div className="modal-actions">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-save" onClick={save}>💾 Save Note</button>
        </div>
      </div>
    </div>
  );
}