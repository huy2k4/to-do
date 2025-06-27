import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../../assets/css/edittaskmodal.css';
import { addTag } from '../../redux/slices/tagSlice';

export default function EditTaskModal({ initialValues, onConfirm, onCancel }) {
  const dispatch = useDispatch();
  const tags = useSelector(state => state.tags.items || []);

  const tagColors = [
    '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5',
    '#2196f3', '#009688', '#4caf50', '#ff9800', '#795548'
  ];

  const initialTagList = (initialValues.tags || []).map(tag => ({
    id: tag.id,
    name: tag.name,
    color: tag.color || tagColors[Math.floor(Math.random() * tagColors.length)],
  }));

  const [values, setValues] = useState({
    content: initialValues.content || '',
    priority: initialValues.priority || '',
    deadline: initialValues.deadline || '',
    notes: initialValues.notes || '',
    tagInput: '',
  });

  const [tagList, setTagList] = useState(initialTagList);

  useEffect(() => {
    setValues(prev => ({
      ...prev,
      tagInput: tagList.map(t => t.name).join(', ')
    }));
  }, [tagList]);

  const handleChange = (field, value) => {
    setValues(prev => ({ ...prev, [field]: value }));
  };

  const getOrCreateTag = (name) => {
    const normalized = name.trim();
    const existing = tags.find(tag => tag.name.toLowerCase() === normalized.toLowerCase());
    if (existing) return existing;

    const newTag = {
      id: `tag-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      name: normalized,
      color: tagColors[Math.floor(Math.random() * tagColors.length)],
    };

    dispatch(addTag(newTag));
    return newTag;
  };

  const syncTagsFromInput = () => {
    const tagNames = values.tagInput
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    const updatedTags = tagNames.map(name => {
      const existing = tagList.find(t => t.name.toLowerCase() === name.toLowerCase());
      if (existing) return existing;
      const created = getOrCreateTag(name);
      return {
        id: created.id,
        name: created.name,
        color: created.color,
      };
    });

    setTagList(updatedTags);
  };

  const handleTagColorChange = (index, color) => {
    setTagList(prev => {
      const updated = [...prev];
      updated[index].color = color;
      return updated;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    syncTagsFromInput();

    onConfirm({
      content: values.content,
      priority: values.priority,
      deadline: values.deadline,
      notes: values.notes,
      tags: tagList.map(tag => ({
        id: tag.id,
        name: tag.name,
        color: tag.color,
      })),
    });
  };

  return (
    <div className="edit-task-modal-overlay">
      <form className="edit-task-modal-content" onSubmit={handleSubmit}>
        <h3 className="edit-task-modal-title">Chỉnh sửa công việc</h3>

        <label>Nội dung</label>
        <input
          type="text"
          value={values.content}
          onChange={(e) => handleChange('content', e.target.value)}
          required
        />

        <label>Độ ưu tiên</label>
        <select
          value={values.priority}
          onChange={(e) => handleChange('priority', e.target.value)}
          required
        >
          <option value="">Chọn mức độ</option>
          <option value="high">Cao</option>
          <option value="medium">Trung bình</option>
          <option value="low">Thấp</option>
        </select>

        <label>Hạn hoàn thành</label>
        <input
          type="date"
          value={values.deadline}
          onChange={(e) => handleChange('deadline', e.target.value)}
        />

        <label>Tags (phân cách bằng dấu phẩy)</label>
        <input
          type="text"
          value={values.tagInput}
          onChange={(e) => handleChange('tagInput', e.target.value)}
          onBlur={syncTagsFromInput}
          placeholder="Giải trí, học tập..."
        />

        {tagList.length > 0 && (
          <div className="edit-task-modal-tag-list">
            {tagList.map((tag, index) => (
              <div className="edit-task-modal-tag-item" key={tag.id}>
                <span
                  className="edit-task-modal-tag-label"
                  style={{ backgroundColor: tag.color }}
                >
                  {tag.name}
                </span>
                <select
                  className="edit-task-modal-color-select"
                  style={{ backgroundColor: tag.color }}
                  value={tag.color}
                  onChange={(e) => handleTagColorChange(index, e.target.value)}
                >
                  {tagColors.map(color => (
                    <option
                      key={color}
                      value={color}
                      style={{
                        backgroundColor: color,
                        color: 'transparent',
                        fontSize: '0px',
                      }}
                    >
                      {color}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        )}

        <label>Ghi chú</label>
        <textarea
          value={values.notes}
          onChange={(e) => handleChange('notes', e.target.value)}
        />

        <div className="edit-task-modal-actions">
          <button type="button" className="edit-task-modal-btn cancel" onClick={onCancel}>Huỷ</button>
          <button type="submit" className="edit-task-modal-btn confirm">Lưu</button>
        </div>
      </form>
    </div>
  );
}
