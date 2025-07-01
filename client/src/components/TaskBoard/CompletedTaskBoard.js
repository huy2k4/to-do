import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CompletedTaskItem from './CompletedTaskItem';
import '../../assets/css/completedtaskboard.css';
import { selectCompletedTasks, selectTaskProgress } from '../../redux/selectors/taskSelector';


export default function CompletedTaskBoard() {
  const dispatch = useDispatch();
  // const currentUser = useSelector(state => state.user.currentUser);
  const completedTasks = useSelector(selectCompletedTasks);

  const { total, completed, percent } = useSelector(selectTaskProgress);

  const handleToggleDone = useCallback((userId, task) => {
    dispatch({
      type: 'task/updateTask',
      payload: { userId, id: task.id, isDone: false },
    });
  }, [dispatch]);

  return (
    <div className="cplt-tb-container">
      <div className="cplt-tb-header">
        <label className="cplt-tb-label">
          <span>Việc đã hoàn thành</span>
        </label>

        {total > 0 && (<div className="task-progress">
          {/* <span>{completed} / {total}</span> */}
          <div className="task-progress-bar">
            <div className="task-progress-fill" style={{ width: `${percent}%` }}></div>
          </div>
        </div>

        )}

      </div>
      <div className="cplt-tb">
        {completedTasks.length === 0 ? (
          <p className="no-cplt-task"></p>
        ) : (
          completedTasks.map((task) => (
            <CompletedTaskItem
              key={task.id}
              task={task}
              handleToggleDone={handleToggleDone}
            />
          ))
        )}
      </div>
    </div>
  );
}
