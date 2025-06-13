import React, { useState } from 'react';
import '../../assets/css/taskitem.css';

export default function TaskItem({ task, handleDelete, handleToggleDone, handleEdit  }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(task.content);

    const handleEditSubmit = () => {
        handleEdit(task.id, editValue);
        setIsEditing(false);
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
                        <span className={`task-content ${task.isDone ? 'completed' : ''}`}>
                            {task.content}
                        </span>
                    )}
                </div>
            </div>
            <button onClick={() => handleDelete(task.id)} className="tdl-del-btn">XÓA</button>
            <button onClick={() => handleToggleDone(task.id)} className='tdl-done-btn'>
                {task.isDone ? 'Hoàn tác' : 'Xong'}
            </button>
        </div>
    );
}
