import React, { useState, useRef, useEffect } from 'react';
import '../../assets/css/taskcreator.css';
import { useDispatch } from 'react-redux';
import { addTask } from '../../redux/features/tasks/taskSlice';

export default function TaskCreator() {
  const dispatch = useDispatch();
  const [content, setContent] = useState('');
  const today = new Date().toISOString().split('T')[0];
  const [deadline, setDeadline] = useState(today);
  const [priority, setPriority] = useState('medium');
  const [tags, setTags] = useState('');
  const [notes, setNotes] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef(null);

  const deadlineRef = useRef();
  const priorityRef = useRef();
  const tagsRef = useRef();
  const notesRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsExpanded(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAddTask = () => {
    if (content.trim() === '') return;

    const newTask = {
      content: content.trim(),
      deadline: deadline || today,
      priority,
      tags,
      notes,
      isDone: false,
    };

    dispatch(addTask(newTask));

    // Reset form
    setContent('');
    setDeadline('');
    setPriority('medium');
    setTags('');
    setNotes('');
    setIsExpanded(false);
  };

  return (
    <div className="task-crt-container" ref={containerRef}>
      <div className="task-crt-label">
        <label htmlFor="content">Tạo công việc</label>
      </div>

      <div className="task-crt">
        <textarea
          className="task-crt-type"
          name="content"
          id="content"
          placeholder="Nghe nhạc, gym,..."
          value={content}
          onFocus={() => setIsExpanded(true)}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey && !e.ctrlKey) {
              e.preventDefault();
              deadlineRef.current?.focus();
            }
          }}
        />

        <div className={`task-fields-wrapper ${isExpanded ? 'show' : ''}`}>
          <div className="task-field">
            <label htmlFor="deadline">Hạn chót</label>
            <input
              type="date"
              id="deadline"
              ref={deadlineRef}
              className="task-crt-deadline field-deadline"
              value={deadline || today}
              onChange={(e) => setDeadline(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  priorityRef.current?.focus();
                }
              }}
              min={today}
            />
          </div>

          <div className="task-field">
            <label htmlFor="priority">Mức độ ưu tiên</label>
            <select
              id="priority"
              ref={priorityRef}
              className="task-crt-priority field-priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  tagsRef.current?.focus();
                }
              }}
            >
              <option value="low">Thấp</option>
              <option value="medium">Trung bình</option>
              <option value="high">Cao</option>
            </select>
          </div>

          <div className="task-field">
            <label htmlFor="tags">Thẻ</label>
            <input
              type="text"
              id="tags"
              ref={tagsRef}
              className="task-crt-tags field-tags"
              placeholder="Giải trí, học tập,..."
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  notesRef.current?.focus();
                }
              }}
            />
          </div>

          <div className="task-field">
            <label htmlFor="notes">Ghi chú</label>
            <textarea
              id="notes"
              ref={notesRef}
              className="task-crt-notes field-notes"
              placeholder="Ghi chú thêm"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleAddTask();
                }
              }}
            />
          </div>
        </div>

        <button
          className={`task-crt-add-btn ${content.trim() !== '' ? 'visible' : ''}`}
          onClick={handleAddTask}
        >
          Thêm
        </button>
      </div>
    </div>
  );
}
