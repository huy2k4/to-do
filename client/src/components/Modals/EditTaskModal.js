import React, { useState } from 'react';
import '../../assets/css/confirmdeletemodal.css';

export default function EditTaskModal({ initialValues, onConfirm, onCancel }) {
  const [values, setValues] = useState(initialValues);

  const handleChange = (field, value) => {
    setValues(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(values);
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

        <label>Tags</label>
        <input
          type="text"
          value={values.tags}
          onChange={(e) => handleChange('tags', e.target.value)}
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
