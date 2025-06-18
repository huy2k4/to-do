import React, { useState } from 'react';
import '../../assets/css/taskitem.css';
import { Trash2, CheckCircle, RotateCcw } from 'lucide-react';
import ConfirmDeleteModal from '../Modals/ConfirmDeleteModal';
import EditTaskModal from '../Modals/EditTaskModal';

export default function TaskItem({ task, handleDelete, handleToggleDone, handleEdit }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleDeleteConfirmed = () => {
    handleDelete(task.id);
    setShowDeleteModal(false);
  };

  const handleEditConfirmed = (updatedValues) => {
    handleEdit(task.id, updatedValues);
    setShowEditModal(false);
  };

  return (
    <div className="task-block-container">
      <div className="task-block" onDoubleClick={() => setShowEditModal(true)}>
        <div className="item">
          <span className={`task-content ${task.isDone ? 'completed' : ''}`}>
            {typeof task.content === 'string' ? task.content : '[nội dung không hợp lệ]'}
          </span>

          <div className="task-meta">
            {task.priority && (
              <div className="task-priority"><strong>Ưu tiên:</strong> {task.priority}</div>
            )}
            {task.deadline && (
              <div className="task-deadline"><strong>Hạn:</strong> {task.deadline}</div>
            )}
            {task.tags && task.tags.trim() !== '' && (
              <div className="task-tags"><strong>Tags:</strong> {task.tags}</div>
            )}
            {task.notes && task.notes.trim() !== '' && (
              <div className="task-notes"><strong>Ghi chú:</strong> {task.notes}</div>
            )}
          </div>
        </div>

        <div className="task-actions">
          <div onClick={() => setShowDeleteModal(true)} className="tdl-del-btn" title="Xoá">
            <Trash2 size={24} strokeWidth={2.2} />
          </div>

          <div
            onClick={() => handleToggleDone(task.id)}
            className="tdl-done-btn"
            title={task.isDone ? 'Hoàn tác' : 'Xong'}
          >
            {task.isDone ? (
              <RotateCcw size={24} strokeWidth={2.2} />
            ) : (
              <CheckCircle size={24} strokeWidth={2.2} />
            )}
          </div>
        </div>
      </div>

      {showDeleteModal && (
        <ConfirmDeleteModal
          onConfirm={handleDeleteConfirmed}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}

      {showEditModal && (
        <EditTaskModal
          initialValues={{
            content: task.content || '',
            priority: task.priority || '',
            deadline: task.deadline || '',
            tags: task.tags || '',
            notes: task.notes || ''
          }}
          onConfirm={handleEditConfirmed}
          onCancel={() => setShowEditModal(false)}
        />
      )}
    </div>
  );
}
