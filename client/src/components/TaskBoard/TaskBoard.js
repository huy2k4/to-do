import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeFilteredTasksSelector } from '../../redux/selectors/taskSelector';
import TaskItem from './TaskItem';
import '../../assets/css/taskboard.css';

export default function TaskBoard() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  console.log(currentUser);
  const tasks = useSelector(state => {
    console.log(state);
    return state.tasks.items || []
  });

  console.log(tasks);
  const tags = Array.from(
    new Map(
      tasks
        .flatMap(task => task.tags || [])
        .map(tag => [tag.name.toLowerCase(), tag])
    ).values()
  );

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

          <select
            className="task-sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="none">Sắp xếp</option>
            <option value="priority">Ưu tiên</option>
            <option value="deadline">Deadline</option>
          </select>

          <select
            className="task-tag-filter"
            value={filterTagId}
            onChange={(e) => setFilterTagId(e.target.value)}
          >
            <option value="">Tất cả thẻ</option>
            {tags.map((tag) => (
              <option key={tag.id} value={tag.id}>
                {tag.name}
              </option>
            ))}
          </select>

          <input
            type="date"
            className="task-date-filter"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
          <input
            type="date"
            className="task-date-filter"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
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
    </div>
  );
}
