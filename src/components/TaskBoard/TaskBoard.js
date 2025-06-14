import React, { useState } from 'react';
import TaskItem from './TaskItem';
import '../../assets/css/taskboard.css';

export default function TaskBoard({ tasks, handleDelete, handleToggleDone, handleEdit }) {
    const [sortBy, setSortBy] = useState('none');
    const [searchTerm, setSearchTerm] = useState('');
    const [filterTag, setFilterTag] = useState('');
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');


    const availableTags = Array.from(
        new Set(
            tasks
                .filter(task => !task.isDone && task.tags?.trim())
                .map(task => task.tags.trim().toLowerCase())
        )
    );

    const sortedTasks = tasks
        .filter(task => !task.isDone)
        .filter(task =>
            task.content.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter(task =>
            filterTag === '' || task.tags?.toLowerCase() === filterTag
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


    return (
        <div className="task-board-container">
            <div className="task-board-header">
                <label htmlFor="tasklabel" className="task-board-label">
                    <span>task-board</span>
                </label>
                <div className="task-board-controls">

                    <input
                        type="text"
                        placeholder="Huy dep trai"
                        className="task-search-input"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}/>

                    <select
                        className="task-sort-select"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}>
                        <option value="none">Sắp xếp</option>
                        <option value="priority">ưu tiên</option>
                        <option value="deadline">deadline</option>
                    </select>
                    <select
                        className="task-tag-filter"
                        value={filterTag}
                        onChange={(e) => setFilterTag(e.target.value)}>
                    <option value="">Tất cả tags</option>
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
                        placeholder="Từ ngày"/>

                    <input
                        type="date"
                        className="task-date-filter"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        placeholder="Đến ngày"/>
                    
                </div>
            </div>

            <div className="task-board">
                {sortedTasks.length === 0 ? (
                    <p className="no-task">Ranh</p>
                ) : (
                    sortedTasks.map((task) => (
                        <TaskItem
                            key={task.id}
                            task={task}
                            handleDelete={handleDelete}
                            handleEdit={handleEdit}
                            handleToggleDone={handleToggleDone}
                        />
                    ))
                )}
            </div>
        </div>
    );
}
