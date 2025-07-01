import React from 'react';
import { useSelector } from 'react-redux';
import TaskCreator from '../components/CreatingPanel/TaskCreator';
import TaskBoard from '../components/TaskBoard/TaskBoard';
import CompletedTaskBoard from '../components/TaskBoard/CompletedTaskBoard';
import IntroPanel from '../components/Layout/IntroPanel';

function TodoPage() {
  const currentUser = useSelector(state => state.user.currentUser);

  return (
    <div className="main-content">
      {!currentUser ? (
        <IntroPanel />
      ) : (
        <>
          <div className="left-panel">
            <TaskCreator />
          </div>
          <div className="center-panel">
            <TaskBoard />
          </div>
          <div className="right-panel">
            <CompletedTaskBoard />
          </div>
        </>
      )}
    </div>
  );
}

export default TodoPage;