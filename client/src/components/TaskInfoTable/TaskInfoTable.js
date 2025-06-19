import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../../assets/css/taskinfotable.css';

const TaskInfoTable = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'task/fetchTasks' });
    dispatch({ type: 'tag/fetchTags' });
  }, [dispatch]);

  const tasks = useSelector((state) => state.tasks.items || []);

  return (
    <div className="task-table-wrapper">
      <table className="task-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nội dung</th>
            <th>Trạng thái</th>
            <th>Tag</th>
            <th>Hạn chót</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.content}</td>
                <td className={task.isDone ? 'status-done' : 'status-pending'}>
                  {task.isDone ? 'Đã xong' : 'Chưa xong'}
                </td>
                <td>
                  {Array.isArray(task.tags) && task.tags.length > 0 ? (
                    task.tags.map(tag => (
                      <span
                        key={tag.id}
                        style={{
                          backgroundColor: tag.color,
                          color: '#fff',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          marginRight: '4px',
                          display: 'inline-block',
                          fontSize: '0.85em',
                        }}
                      >
                        {tag.name}
                      </span>
                    ))
                  ) : '—'}
                </td>
                <td>{task.deadline || '—'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="empty-row">
                Không có nhiệm vụ nào.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TaskInfoTable;
