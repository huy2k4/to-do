import React from 'react';
import TaskItem from './TaskItem';
import '../../assets/css/taskboard.css'

export default function TaskBoard({ tasks, handleDelete, handleToggleDone, handleEdit}) {
    return (
        <div className="task-board-container">
            <div className="task-board-header">
                <label htmlFor="tasklabel" className='task-board-label'>
                    <span>task-board</span>
                </label>
            </div>
            <div className="task-board">
                {tasks.length === 0 ? (
                    <p className="no-task"></p>
                ) : (
                    tasks.map((task) => (
                        <TaskItem
                            key={task.id}
                            task={task}
                            tasks={tasks}
                            handleDelete = {handleDelete}
                            handleEdit={handleEdit}
                            handleToggleDone={handleToggleDone} />
                    ))
                )}
            </div>
        </div>
    );
}
