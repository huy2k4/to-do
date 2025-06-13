import React, { useState } from 'react';
import '../assets/css/todolist.css';
import TaskItem from './TaskBoard/TaskItem';

export default function ToDoList() {

  const [task, setTask] = useState('');
  const [fullTask, setFullTask] = useState([]);

  const handleAddTask = () => {
    if (task.trim() === '') return;

    const newTask = {
      id: Date.now(),
      content: task.trim(),
      isDone: false,
    };

    setFullTask([newTask, ...fullTask]);
    setTask('');
  };

  return (
    <div className="tdl-container">
      <div className="tdl-label">
        <label htmlFor="task">🐉 <span>TO DO LIST RỒNG</span> 🐉</label>
      </div>
      <div className="tdl-task">
        <textarea
          className="tdl-textarea"
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
          className={`tdl-add-btn ${task.trim() !== '' ? 'visible' : ''}`}
          onClick={handleAddTask}
        >
          Thêm
        </button>
      </div>
      <div className="task-list">
        <div className="task-item">
          {fullTask.map((item) => (
            <TaskItem
              key={item.id}
              task={item}
              setFullTask={setFullTask}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
