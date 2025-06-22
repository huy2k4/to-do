import React from 'react';
import '../../assets/css/completedtaskitem.css';
import { RotateCcw } from 'lucide-react';

export default function CompletedTaskItem({ task, handleToggleDone }) {
  return (
    <div className="cplt-tiblock-container">
      <div className={`cplt-tiblock priority-${task.priority}`}>
        <div className="cplt-tiitem">
          <span className="cplt-ticontent">
            {typeof task.content === 'string' ? task.content : '[nội dung không hợp lệ]'}
          </span>
        </div>

        <div className="cplt-task-actions">
          <div
            onClick={() => handleToggleDone(task.id)}
            className="tdl-done-btn"
            title="Hoàn tác"
          >
            <RotateCcw size={24} strokeWidth={2.2} />
          </div>
        </div>
      </div>
    </div>
  );
}