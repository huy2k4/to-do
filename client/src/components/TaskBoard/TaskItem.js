import React, { useState } from 'react';
import '../../assets/css/taskitem.css';
import { Trash2, CheckCircle, Pin } from 'lucide-react';
import ConfirmDeleteModal from '../Modals/ConfirmDeleteModal';
import EditTaskModal from '../Modals/EditTaskModal';
import { useSelector } from 'react-redux';

export default function TaskItem({ task, handleDelete, handleToggleDone, handleEdit, handleTogglePin }) {
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
    handleDelete();
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
        className={`task-block priority-${task.priority} ${task.isPinned ? 'pinned-task' : ''} ${task.isDone ? 'completed' : ''}`}
        onClick={() => setShowEditModal(true)}
      >
        <div className="item">
          <span className="task-content">
            <span className="task-content">
              {typeof task.content === 'string' ? (
                <>
                  {task.content} {task.isPinned && '📌'}
                </>
              ) : (
                '[nội dung không hợp lệ]'
              )}
            </span>

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
            onClick={(event) => {
              event.stopPropagation();
              setShowDeleteModal(true);
            }}
            className="tdl-del-btn"
            title="Xoá"
          >
            <Trash2 size={24} strokeWidth={2.2} />
          </div>

          <div
            onClick={(event) => {
              event.stopPropagation();
              handleToggleDone();
            }}
            className="tdl-done-btn "
            title={task.isDone ? 'Hoàn tác' : 'Hoàn thành'}
          >
            <CheckCircle
              size={24}
              strokeWidth={2.2}
              fill={task.isDone ? '#2ecc71' : 'none'}
            />
          </div>

          <div
            onClick={(event) => {
              event.stopPropagation();
              handleTogglePin();
            }}
            className="tdl-pin-btn "
            title={task.isPinned ? 'Bỏ ghim' : 'Ghim'}
          >
            <Pin
              size={24}
              strokeWidth={2.2}
              fill={task.isPinned ? '#ff9800' : 'none'}
              color={task.isPinned ? '#ff9800' : 'currentColor'}
            />
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
            notes: task.notes || '',
            isPinned: task.isPinned || false
          }}
          onConfirm={handleEditConfirmed}
          onCancel={() => setShowEditModal(false)}
        />
      )}
    </div>
  );
}