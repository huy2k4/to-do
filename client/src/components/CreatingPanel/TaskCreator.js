import React, { useState, useRef, useEffect } from 'react';
import '../../assets/css/taskcreator.css';
import { useDispatch, useSelector } from 'react-redux';
import { addTag } from '../../redux/slices/tagSlice';

export default function TaskCreator() {
  const dispatch = useDispatch();
  const tags = useSelector(state => state.tags.items || []);

  const tagColors = [
    '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5',
    '#2196f3', '#009688', '#4caf50', '#ff9800', '#795548',
    '#607d8b', '#ff5722', '#8bc34a', '#ffc107', '#9e9e9e'
  ];
  
  const currentUser = useSelector(state => state.user.currentUser);
  const [content, setContent] = useState('');
  const today = new Date().toISOString().split('T')[0];
  const [deadline, setDeadline] = useState(today);
  const [priority, setPriority] = useState('medium');
  const [notes, setNotes] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [tagsInput, setTagsInput] = useState([{ name: '', color: tagColors[0] }]);
  
  // Error messages
  const [errorMessages, setErrorMessages] = useState([]);

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

  const validateContent = (value) => {
    const trimmed = value.trim();
    const specialChars = /[@#!^*$]/;
    
    if (specialChars.test(trimmed)) {
      return 'Nội dung không được chứa ký tự đặc biệt @#!^*$';
    }
    
    if (trimmed.length > 44) {
      return 'Nội dung không được quá 44 ký tự';
    }
    
    return null;
  };

  const validateTagName = (name) => {
    const trimmed = name.trim();
    const specialChars = /[@#!^*$]/;
    
    if (specialChars.test(trimmed)) {
      return 'Tên thẻ không được chứa ký tự đặc biệt @#!^*$';
    }
    
    if (trimmed.length > 20) {
      return 'Tên thẻ không được quá 20 ký tự';
    }
    
    return null;
  };

  const handleContentChange = (e) => {
    const value = e.target.value;
    setContent(value);
    
    setErrorMessages([]);
  };

  const handleTagChange = (index, field, value) => {
    setTagsInput(prev => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
    
    setErrorMessages([]);
  };

  const getRandomColor = () => {
    return tagColors[Math.floor(Math.random() * tagColors.length)];
  };

  const handleAddTagField = () => {
    const lastTag = tagsInput[tagsInput.length - 1];
    if (lastTag.name.trim() === '') {
      setErrorMessages(['Vui lòng nhập tên thẻ trước khi thêm thẻ mới']);
      return;
    }
    
    setTagsInput(prev => [...prev, { name: '', color: getRandomColor() }]);
    setErrorMessages([]);
  };

  const handleRemoveTagField = (index) => {
    setTagsInput(prev => prev.filter((_, i) => i !== index));
    setErrorMessages([]);
  };

  const getOrCreateTag = (name, color) => {
    const normalizedName = name.trim().toLowerCase();

    const existing = tags.find(tag => tag.name.toLowerCase() === normalizedName);
    if (existing) {
      return existing;
    }


    const newTag = {
      id: `tag-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      name: name.trim(),
      color: color || getRandomColor()
    };

    dispatch(addTag(newTag));
    return newTag;
  };

  const canAddTask = () => {
    return content.trim() !== '' && currentUser;
  };

  const handleAddTask = () => {
    const errors = [];
    
    if (content.trim() === '') {
      errors.push('Vui lòng nhập nội dung công việc');
    } else {
      const contentError = validateContent(content);
      if (contentError) {
        errors.push(contentError);
      }
    }

    if (!currentUser) {
      errors.push('Phải đăng nhập trước khi tạo task');
    }

    const tagErrors = [];
    tagsInput.forEach((tag, index) => {
      if (tag.name.trim() !== '') {
        const tagError = validateTagName(tag.name);
        if (tagError) {
          tagErrors.push(`Thẻ ${index + 1}: ${tagError}`);
        }
      }
    });

    if (tagErrors.length > 0) {
      errors.push(...tagErrors);
    }

    if (errors.length > 0) {
      setErrorMessages(errors);
      return;
    }

    // Lọc và tạo tags (loại bỏ trùng lặp)
    const validTags = tagsInput
      .filter(tag => tag.name.trim() !== '')
      .map(tag => ({ name: tag.name.trim(), color: tag.color }));

    // Loại bỏ tags trùng tên (case-insensitive)
    const uniqueTags = validTags.filter((tag, index, self) => 
      index === self.findIndex(t => t.name.toLowerCase() === tag.name.toLowerCase())
    );

    const finalTags = uniqueTags.map(tag => getOrCreateTag(tag.name, tag.color));

    const newTask = {
      content: content.trim(),
      deadline: deadline || today,
      priority,
      tags: finalTags,
      notes: notes.trim(),
      isDone: false,
      // isPined:false,
      userId: currentUser.id,
    };

    dispatch({ type: 'task/createTask', payload: newTask });

    // Reset form
    setContent('');
    setDeadline(today);
    setPriority('medium');
    setTagsInput([{ name: '', color: getRandomColor() }]);
    setNotes('');
    setIsExpanded(false);
    setErrorMessages([]);
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
          onChange={handleContentChange}
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
            >
              <option value="" disabled>Ưu tiên</option>
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
                  <button 
                    type="button" 
                    onClick={handleAddTagField}
                    className="tag-btn add-btn"
                    disabled={tag.name.trim() === ''}
                  >
                    +
                  </button>
                  {tagsInput.length > 1 && (
                    <button 
                      type="button" 
                      onClick={() => handleRemoveTagField(index)}
                      className="tag-btn remove-btn"
                    >
                      ×
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
                  if (canAddTask()) {
                    handleAddTask();
                  }
                }
              }}
            />
          </div>

          {/* Error Messages */}
          {errorMessages.length > 0 && (
            <div className="error-messages">
              {errorMessages.map((error, index) => (
                <div key={index} className="error-message">
                  {error}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="task-field">
          <button
            className={`task-crt-add-btn ${canAddTask() ? 'visible' : 'disabled'}`}
            onClick={handleAddTask}
            disabled={!canAddTask()}
          >
            Thêm
          </button>
        </div>
      </div>
    </div>
  );
}