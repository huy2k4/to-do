import React, { useState } from 'react';
import '../assets/css/taskitem.css';

export default function TaskItem({ task, setFullTask }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(task.content);
    const handleEditSubmit = () => {
        setFullTask(prevTasks =>
            prevTasks.map(t =>
                t.id === task.id ? { ...t, content: editValue } : t
            )
        );
        setIsEditing(false);
    };
    const handleDelTask = () => {
        setFullTask(prevTasks => prevTasks.filter(t => t.id !== task.id));
    };

    const handleDoneTask = () => {
        setFullTask(prevTasks =>
            prevTasks.map(t =>
                t.id === task.id ? { ...t, isDone: !t.isDone } : t
            )
        );
    };

    return (
        <div className='task-block-container'>
            <div className="task-block" onDoubleClick={() => setIsEditing(true)}>
                <div className="item">
                    {isEditing ? (
                        <input
                            type="text"
                            className="task-edit-input"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onBlur={handleEditSubmit}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleEditSubmit();
                                }
                            }}
                            autoFocus
                        />
                    ) : (
                    <span className={`task-content ${task.isDone ? 'completed' : ''}`}
                            >
                        {task.content}
                    </span>)}
                </div>
            </div>
            <button onClick={handleDelTask} className="tdl-del-btn">XOA</button>
            <button onClick={handleDoneTask} className='tdl-done-btn'>
                {task.isDone ? 'Hoàn tác' : 'Xong'}
            </button>
        </div>
    );
}
