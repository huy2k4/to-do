import React, { useState } from 'react';
import { useEffect } from 'react';
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

    const [sortBy, setSortBy] = useState('none');
    const [searchTerm, setSearchTerm] = useState('');
    const [filterTag, setFilterTag] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    const priorityOrder = { high: 3, medium: 2, low: 1 };

    const availableTags = Array.from(
        new Set(
            tasks
                .filter(task => !task.isDone && task.tags?.trim())
                .map(task => task.tags.trim().toLowerCase())
        )
    );

    const sortedTasks = tasks
        .filter(task => task && typeof task === 'object')
        .filter(task => !task.isDone)
        .filter(task =>
            typeof task.content === 'string' &&
            task.content.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter(task =>
            filterTag === '' ||
            (typeof task.tags === 'string' && task.tags.toLowerCase() === filterTag)
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
        dispatch({ type: 'task/fetchTasks' }); // <- gọi saga tại đây
    }, [dispatch]);
    return (
        <div className="task-board-container">
            <script>{console.log('tasks:', tasks)}</script>
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
                        <option value="priority">ưu tiên</option>
                        <option value="deadline">deadline</option>
                    </select>

                    <select
                        className="task-tag-filter"
                        value={filterTag}
                        onChange={(e) => setFilterTag(e.target.value)}
                    >
                        <option value="">Tag</option>
                        {availableTags.map((tag, i) => (
                            <option key={i} value={tag}>
                                {tag}
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
                {sortedTasks.length === 0 ? (
                    <p className="no-task">Trống</p>
                ) : (
                    sortedTasks.map((task) => (
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
