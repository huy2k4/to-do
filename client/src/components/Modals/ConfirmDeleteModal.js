import React from 'react';
import '../../assets/css/confirmdeletemodal.css';

export default function ConfirmDeleteModal({ onConfirm, onCancel }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>Bạn có chắc muốn xoá công việc này không?</p>
        <div className="modal-actions">
          <button onClick={onCancel}
            className="modal-btn cancel">Huỷ</button>
          <button onClick={onConfirm}
            className="modal-btn confirm">Xoá</button>
        </div>
      </div>
    </div>
  );
}
