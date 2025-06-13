import React, { useState } from 'react';
import '../../assets/css/taskcreator.css';

export default function TaskCreator({ onAddTask }) {
  const [task, setTask] = useState('');

  const handleAddTask = () => {
    if (task.trim() === '') return;

    onAddTask(task.trim());
    setTask('');
  };

  return (
    <div className="task-crt-container">
      <div className="task-crt-label">
        <label htmlFor="task">create-task</label>
      </div>
      <div className="task-crt">
        <textarea
          className="task-crt-type"
          name="task"
          placeholder="mày cần làm việc gì?"
          id="task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey && !e.ctrlKey) {
              e.preventDefault();
              handleAddTask();
            }
          }}
        ></textarea>
        <button
          className={`task-crt-add-btn ${task.trim() !== '' ? 'visible' : ''}`}
          onClick={handleAddTask}
        >
          Thêm
        </button>
      </div>
    </div>
  );
}
