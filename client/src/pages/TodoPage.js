import React from 'react';
import TaskCreator from '../components/CreatingPanel/TaskCreator';
import TaskBoard from '../components/TaskBoard/TaskBoard';
import CompletedTaskBoard from '../components/TaskBoard/CompletedTaskBoard';

function TodoPage() {
  return (
    <div className="main-content">
      <div className="left-panel">
        <TaskCreator />
      </div>
      <div className="center-panel">
        <TaskBoard />
      </div>
      <div className="right-panel">
        <CompletedTaskBoard />
      </div>
    </div>
  );
}

export default TodoPage;
