import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../../assets/css/confirmdeletemodal.css';
import { addTag } from '../../redux/slices/tagSlice';

export default function EditTaskModal({ initialValues, onConfirm, onCancel }) {
  const dispatch = useDispatch();
  const tags = useSelector(state => state.tags.items || []);

  const tagColors = [
    '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5',
    '#2196f3', '#009688', '#4caf50', '#ff9800', '#795548'
  ];

  const initialTagInput = (initialValues.tags || [])
    .map(tag => tag.name)
    .join(', ');

  const [values, setValues] = useState({
    content: initialValues.content || '',
    priority: initialValues.priority || '',
    deadline: initialValues.deadline || '',
    notes: initialValues.notes || '',
    tagInput: initialTagInput,
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const tagNames = values.tagInput
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    const finalTags = tagNames.map(getOrCreateTag);

    onConfirm({
      content: values.content,
      priority: values.priority,
      deadline: values.deadline,
      notes: values.notes,
      tags: finalTags,
    });
  };

  return (
    <div className="modal-overlay">
      <form className="modal-content" onSubmit={handleSubmit}>
        <h3>Chỉnh sửa công việc</h3>

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
          placeholder="Giải trí, học tập..."
        />

        <label>Ghi chú</label>
        <textarea
          value={values.notes}
          onChange={(e) => handleChange('notes', e.target.value)}
        />

        <div className="modal-actions">
          <button type="button" className="modal-btn cancel" onClick={onCancel}>Huỷ</button>
          <button type="submit" className="modal-btn confirm">Lưu</button>
        </div>
      </form>
    </div>
  );
}
