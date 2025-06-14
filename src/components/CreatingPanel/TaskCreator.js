import React, { useState } from 'react';
import '../../assets/css/taskcreator.css';

export default function TaskCreator({ onAddTask }) {
  const [content, setContent] = useState('');
  const today = new Date().toISOString().split('T')[0];
  const [deadline, setDeadline] = useState(today);
  const [priority, setPriority] = useState('medium');
  const [tags, setTags] = useState('');
  const [notes, setNotes] = useState('');
  const handleAddTask = () => {
    if (content.trim() === '') return;

    const newTask = {
      content: content.trim(),
      deadline: deadline || today,
      priority,
      tags,
      notes,
      isDone: false
    };

    onAddTask(newTask);
    setContent('');
    setDeadline('');
    setPriority('medium');
    setTags('');
    setNotes('');
    console.log(newTask);
  };

  return (
    <div className="task-crt-container">
      <div className="task-crt-label">
        <label htmlFor="content">Tạo công việc</label>
      </div>
      <div className="task-crt">
        <textarea
          className="task-crt-type"
          name="content"
          placeholder="nghe nhạc,gym,..."
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey && !e.ctrlKey) {
              e.preventDefault();
              handleAddTask();
            }
          }}></textarea>
        <input
          type="date"
          className="task-crt-deadline"
          value={deadline || today}
          onChange={(e) => setDeadline(e.target.value)}
          min={today} />
        <select
          className="task-crt-priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}>
          <option value="low">Chill</option>
          <option value="medium">Tàn tàn</option>
          <option value="high">Căng</option>
        </select>
        <input
          type="text"
          className="task-crt-tags"
          placeholder="thẻ (tag1, tag2...)"
          value={tags}
          onChange={(e) => setTags(e.target.value)} />
        <textarea
          className="task-crt-notes"
          placeholder="ghi chú thêm"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}></textarea>
        <button
          className={`task-crt-add-btn ${content.trim() !== '' ? 'visible' : ''}`}
          onClick={handleAddTask}>Thêm</button>
      </div>
    </div>
  );
}
