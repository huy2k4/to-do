import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeFilteredTasksSelector } from '../../redux/selectors/taskSelector';
import TaskItem from './TaskItem';
import '../../assets/css/taskboard.css';

export default function TaskBoard() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  // console.log(currentUser);
  // const tasks = useSelector(state => {
  //   // console.log(state);
  //   return state.tasks.items || []
  // });

  // const tags = Array.from(
  //   new Map(
  //     tasks
  //       .flatMap(task => task.tags || [])
  //       .map(tag => [tag.name.toLowerCase(), tag])
  //   ).values()
  // );

  const [sortBy, setSortBy] = useState('none');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTagId, setFilterTagId] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const handleDelete = useCallback(
    (id) => dispatch({ type: 'task/removeTask', payload: { userId: currentUser.id, taskId: id } }),
    [dispatch, currentUser]
  );

  const handleToggleDone = useCallback(
    (task) =>
      dispatch({
        type: 'task/updateTask',
        payload: { userId: currentUser.id, id: task.id, isDone: !task.isDone },
      }),
    [dispatch, currentUser]
  );

  const handleEdit = useCallback(
    (id, values) =>
      dispatch({
        type: 'task/updateTask',
        payload: { userId: currentUser.id, id, ...values },
      }),
    [dispatch, currentUser]
  );

  const filteredTasks = useSelector(
    makeFilteredTasksSelector({ searchTerm, sortBy, filterTagId, fromDate, toDate })
  );

  useEffect(() => {
    if (currentUser?.id) {
      dispatch({ type: 'task/fetchTasks', payload: currentUser.id });
    }
  }, [dispatch, currentUser]);

  if (!currentUser?.id) {
    return <div>Đang tải dữ liệu người dùng...</div>;
  }

  return (
    <div className="task-board-container">
      <div className="task-board-header">
        <label htmlFor="tasklabel" className="task-board-label">
          <span>Bảng việc</span>
        </label>

        <div className="task-board-controls">
          <input
            type="text"
            placeholder="Tìm kiếm"
            className="task-search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className="task-sort-buttons">
            <button
              className={`task-sort-button ${sortBy === 'priority' ? 'active' : ''}`}
              onClick={() => setSortBy(sortBy === 'priority' ? 'none' : 'priority')}
            >
              Ưu tiên
            </button>
            <button
              className={`task-sort-button ${sortBy === 'deadline' ? 'active' : ''}`}
              onClick={() => setSortBy(sortBy === 'deadline' ? 'none' : 'deadline')}
            >
              Deadline
            </button>
          </div>

        </div>
      </div>

      <div className="task-board">
        {filteredTasks.length === 0 ? (
          <p className="no-task">Trống</p>
        ) : (
          filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleDelete={() => handleDelete(task.id)}
              handleEdit={handleEdit}
              handleToggleDone={() => handleToggleDone(task)}
            />
          ))
        )}
      </div>

      <div className="task-date-picker">
        <div className="from-to">
          <span>Từ</span>
          <input
            type="date"
            className="task-date-filter"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>
        <div className="from-to">
          <span>Đến</span>
          <input
            type="date"
            className="task-date-filter"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
