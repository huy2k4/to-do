import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TaskItem from './TaskItem';
import '../../assets/css/taskboard.css';
import {
  deleteTask,
  toggleDone,
  editTask
} from '../../redux/features/tasks/taskSlice';

export default function TaskBoard() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.items || []);
  const tags = useSelector((state) => state.tags.items || []);

  const [sortBy, setSortBy] = useState('none');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTagId, setFilterTagId] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const priorityOrder = { high: 3, medium: 2, low: 1 };

  const availableTags = tags;

  const filteredTasks = tasks
    .filter(task => task && typeof task === 'object')
    .filter(task => !task.isDone)
    .filter(task =>
      typeof task.content === 'string' &&
      task.content.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(task =>
      filterTagId === '' || (Array.isArray(task.tagIds) && task.tagIds.includes(filterTagId))
    )
    
    .filter(task => {
      const taskDate = new Date(task.deadline);
      const from = fromDate ? new Date(fromDate) : null;
      const to = toDate ? new Date(toDate) : null;
      if (from && taskDate < from) return false;
      if (to && taskDate > to) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'priority') {
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      if (sortBy === 'deadline') {
        return new Date(a.deadline) - new Date(b.deadline);
      }
      return 0;
    });

  useEffect(() => {
    dispatch({ type: 'task/fetchTasks' });
  }, [dispatch]);

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
            {availableTags.map(tag => (
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
              handleDelete={() => dispatch(deleteTask(task.id))}
              handleEdit={(id, updatedValues) => dispatch(editTask({ id, ...updatedValues }))}
              handleToggleDone={() => dispatch(toggleDone(task.id))}
            />
          ))
        )}
      </div>
    </div>
  );
}
