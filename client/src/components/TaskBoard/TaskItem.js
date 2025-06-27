import React, { useState } from 'react';
import '../../assets/css/taskitem.css';
import { Trash2, CheckCircle } from 'lucide-react';
import ConfirmDeleteModal from '../Modals/ConfirmDeleteModal';
import EditTaskModal from '../Modals/EditTaskModal';
import { useSelector } from 'react-redux';

export default function TaskItem({ task, handleDelete, handleToggleDone, handleEdit }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const currentUser = useSelector(state => state.user.currentUser);

  function getDeadlineStatus(deadlineStr) {
    const today = new Date();
    const deadline = new Date(deadlineStr);
    today.setHours(0, 0, 0, 0);
    deadline.setHours(0, 0, 0, 0);

    const diffTime = deadline - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 0) return { status: `Còn ${diffDays} ngày nữa`, color: '#4caf50' };
    if (diffDays === 0) return { status: `Hôm nay đến hạn!`, color: '#ff9800' };
    return { status: `Đã trễ ${Math.abs(diffDays)} ngày`, color: '#f44336' };
  }

  const handleDeleteConfirmed = () => {
    handleDelete(currentUser.id, task.id);
    setShowDeleteModal(false);
  };

  const handleEditConfirmed = (updatedValues) => {
    handleEdit(task.id, updatedValues);
    setShowEditModal(false);
  };


  const deadlineStatus = task.deadline ? getDeadlineStatus(task.deadline) : null;
  const taskTags = Array.isArray(task.tags) ? task.tags : [];

  return (
    <div className="task-block-container">
      <div
        className={`task-block priority-${task.priority}`}
        onClick={() => setShowEditModal(true)}
      >
        <div className="item">
          <span className="task-content">
            {typeof task.content === 'string' ? task.content : '[nội dung không hợp lệ]'}
          </span>

          <div className="task-meta">
            {deadlineStatus && (
              <div className="task-deadline" style={{ color: deadlineStatus.color }}>
                {deadlineStatus.status}
              </div>
            )}

            {taskTags.length > 0 && (
              <div className="task-tags">
                {taskTags.map((tag) => (
                  <span
                    key={tag.id}
                    style={{
                      backgroundColor: tag.color,
                      color: '#fff',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      marginRight: '4px',
                      display: 'inline-block'
                    }}
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            )}

            {task.notes?.trim() && (
              <div className="task-notes">
                <strong>Ghi chú:</strong> {task.notes}
              </div>
            )}
          </div>
        </div>

        <div className="task-actions">
          <div
            onClick={() => setShowDeleteModal(true)}
            className="tdl-del-btn"
            title="Xoá"
          >
            <Trash2 size={24} strokeWidth={2.2} />
          </div>

          <div
            onClick={() => handleToggleDone(currentUser.id, task)}
            className="tdl-done-btn"
            title="Xong"
          >
            <CheckCircle size={24} strokeWidth={2.2} />
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
            tags: task.tags || [],
            notes: task.notes || ''
          }}
          onConfirm={handleEditConfirmed}
          onCancel={() => setShowEditModal(false)}
        />
      )}
    </div>
  );
}
