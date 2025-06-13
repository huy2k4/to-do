import React, { useState } from 'react';
// import Header from './components/Layout/Header';
// import Footer from './components/Layout/Footer';
import TaskCreator from './components/CreatingPanel/TaskCreator';
import TaskBoard from './components/TaskBoard/TaskBoard';
import CompletedTaskBoard from './components/TaskBoard/CompletedTaskBoard'
import './assets/css/app.css';
function App() {
  const [tasks, setTasks] = useState([]);
    const handleToggleDone = (taskId) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === taskId ? { ...task, isDone: !task.isDone } : task
            )
        );
    };
        const handleDelete = (taskId) => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    };
    const handleEdit = (taskId, newContent) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === taskId ? { ...task, content: newContent } : task
            )
        );
    };
  const addTask = (taskContent) => {
    const newTask = {
      id: Date.now(),
      content: taskContent,
      isDone: false,
    };
    setTasks([newTask, ...tasks]);
  };
  return (
    <div className="app-container">
      {/* <Header /> */}
      <div className="main-content">
        <div className="side-panel left-panel">
          <TaskCreator onAddTask={addTask} />
        </div>
        <div className="center-panel">
          <TaskBoard 
          tasks={tasks} 
          handleEdit={handleEdit} 
          handleDelete = {handleDelete}
          handleToggleDone = {handleToggleDone} />
          <CompletedTaskBoard/>
        </div>
        <div className="side-panel right-panel">
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
