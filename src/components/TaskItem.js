import React from 'react'
import '../assets/css/taskitem.css';
export default function TaskItem({ content, index, setFullTask }) {
        const handleDelTask = () => {
        setFullTask(prevTasks => prevTasks.filter((_, i) => i !== index));
    };
    return (
        <div className='task-block-container' >
            <div className="task-block">
                <div className="item">
                    <span className='task-content' >{content}</span>
                </div>
            </div>
            <button onClick={handleDelTask} className="tdl-del-btn">XOA</button>
            <button onClick={handleDelTask} className='tdl-del-btn'>Xong</button>
        </div>
    )
}
