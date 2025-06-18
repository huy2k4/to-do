import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TaskItem from './TaskItem';
import '../../assets/css/completedtaskboard.css';

import {
  deleteTask,
  toggleDone,
  editTask
} from '../../redux/features/tasks/taskSlice';

export default function CompletedTaskBoard() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.items);
  const completedTasks = tasks.filter((t) => t.isDone);

  return (
    <div className="cplt-tb-container">
      <div className="cplt-tb-header">
        <label className="cplt-tb-label">
          <span>Việc đã hoàn thành</span>
        </label>
      </div>
      <div className="cplt-tb">
        {completedTasks.length === 0 ? (
          <p className="no-task">Chưa có gì</p>
        ) : (
          completedTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleDelete={() => dispatch(deleteTask(task.id))}
              handleEdit={(newContent) =>
                dispatch(editTask({ id: task.id, newContent }))
              }
              handleToggleDone={() => dispatch(toggleDone(task.id))}
            />
          ))
        )}
      </div>
    </div>
  );
}
