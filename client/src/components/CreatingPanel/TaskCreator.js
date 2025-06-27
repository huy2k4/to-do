import React, { useState, useRef, useEffect } from 'react';
import '../../assets/css/taskcreator.css';
import { useDispatch, useSelector } from 'react-redux';
import { addTag } from '../../redux/slices/tagSlice';

export default function TaskCreator() {
  const dispatch = useDispatch();
  const tags = useSelector(state => state.tags.items || []);

  const tagColors = [
    '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5',
    '#2196f3', '#009688', '#4caf50', '#ff9800', '#795548'
  ];
  const currentUser = useSelector(state => state.user.currentUser);
  const [content, setContent] = useState('');
  const today = new Date().toISOString().split('T')[0];
  const [deadline, setDeadline] = useState(today);
  const [priority, setPriority] = useState('medium');
  const [notes, setNotes] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [tagsInput, setTagsInput] = useState([{ name: '', color: tagColors[0] }]);

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

  const handleTagChange = (index, field, value) => {
    setTagsInput(prev => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  };

  const handleAddTagField = () => {
    setTagsInput(prev => [...prev, { name: '', color: tagColors[0] }]);
  };

  const handleRemoveTagField = (index) => {
    setTagsInput(prev => prev.filter((_, i) => i !== index));
  };

  const getOrCreateTag = (name, color) => {
    const normalizedName = name.trim().toLowerCase();
    const existing = tags.find(tag => tag.name.toLowerCase() === normalizedName);
    if (existing) return existing;

    const newTag = {
      id: `tag-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      name: name.trim(),
      color: color || tagColors[0]
    };

    dispatch(addTag(newTag));
    return newTag;
  };

  const handleAddTask = () => {
    if (content.trim() === '') return;
    if (!currentUser) {
      alert('Phải đăng nhập trước khi tạo task');
      return;
    }

    const finalTags = tagsInput
      .filter(tag => tag.name.trim() !== '')
      .map(tag => getOrCreateTag(tag.name.trim(), tag.color));

    const newTask = {
      content: content.trim(),
      deadline: deadline || today,
      priority,
      tags: finalTags,
      notes,
      isDone: false,
      userId: currentUser.id,
    };

    dispatch({ type: 'task/createTask', payload: newTask });

    setContent('');
    setDeadline('');
    setPriority('medium');
    setTagsInput([{ name: '', color: tagColors[0] }]);
    setNotes('');
    setIsExpanded(false);
  };

  return (
    <div className="task-crt-container" ref={containerRef}>
      <div className="task-crt-label">
        <label>Tạo công việc</label>
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
            <span className="field-icon">📅</span>
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
            <span className="field-icon">🔥</span>
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
            ><option value="" disabled selected>Ưu tiên</option>
              <option value="low">Thấp</option>
              <option value="medium">Trung bình</option>
              <option value="high">Cao</option>
            </select>
          </div>

          <div className="task-field">
            <span className="field-icon">🏷️</span>
            <div className="tag-input-group">
              {tagsInput.map((tag, index) => (
                <div key={index} className="single-tag-input">
                  <input
                    type="text"
                    placeholder="Tên thẻ"
                    value={tag.name}
                    onChange={(e) => handleTagChange(index, 'name', e.target.value)}
                    ref={index === 0 ? tagsRef : null}
                  />
                  <button type="button" onClick={handleAddTagField}>
                    +
                  </button>
                  {/* <select
                    style={{
                      backgroundColor: tag.color
                    }}
                    value={tag.color}
                    onChange={(e) => handleTagChange(index, 'color', e.target.value)}
                  >
                    {tagColors.map((color) => (

                      <option style={{
                        backgroundColor: color,
                        color: 'transparent',
                        fontSize: '0px'
                      }} key={color} value={color}
                      ></option>
                    ))}
                  </select> */}
                  {tagsInput.length > 1 && (
                    <button type="button" onClick={() => handleRemoveTagField(index)}>
                      X
                    </button>
                  )}
                </div>
              ))}

            </div>
          </div>

          <div className="task-field">
            <span className="field-icon">📝</span>
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

        <div className="task-field">
          <button
            className={`task-crt-add-btn ${content.trim() !== '' ? 'visible' : ''}`}
            onClick={handleAddTask}
          >
            Thêm
          </button>
        </div>
      </div>
    </div>
  );
}
