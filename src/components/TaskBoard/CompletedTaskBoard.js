import React from 'react'
import '../../assets/css/completedtaskboard.css';
import TaskItem from './TaskItem';


export default function CompletedTaskBoard({ tasks, handleDelete, handleToggleDone, handleEdit }) {
  return (
    <div className="cplt-tb-container">
      <div className="cplt-tb-header">
        <label className='cplt-tb-label'>
          <span>completed-taskboard</span>
        </label>
      </div>
      <div className="cplt-tb">
        {tasks.length === 0 ? (
          <p className="no-task"></p>
        ) : (
          tasks.filter((d) => d.isDone === true)
            .map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                tasks={tasks}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                handleToggleDone={handleToggleDone} />
            ))
        )}
      </div>
    </div>
  )
}
