import React from 'react';
import api from '../api/axiosSetup';

const TaskItem = ({ task, refreshTasks }) => {
  
  const handleDelete = async () => {
    try {
      await api.delete(`/tasks/${task.id}`);
      refreshTasks();
    } catch (error) {
      console.error(error);
      alert('Failed to delete task.');
    }
  };

  const handleToggle = async () => {
    try {
      await api.put(`/tasks/${task.id}`, { 
        status: task.status === 'COMPLETED' ? 'PENDING' : 'COMPLETED' 
      });
      refreshTasks();
    } catch (error) {
      console.error(error);
      alert('Failed to update task status.');
    }
  };

  const isCompleted = task.status === 'COMPLETED';

  return (
    <div className={`task-item ${isCompleted ? 'completed' : ''}`}>
      <div className="task-header">
        <div>
          <h3 className={`task-title ${isCompleted ? 'completed' : ''}`}>
            {task.title}
          </h3>
          <p className="task-desc">{task.description}</p>
          {task.category && (
            <span style={{ display: 'inline-block', marginTop: '0.5rem', background: '#E0E7FF', color: '#4F46E5', fontSize: '0.75rem', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: '500' }}>
              {task.category.name}
            </span>
          )}
        </div>
        
        <div className="task-actions" style={{ marginLeft: '1rem', flexShrink: 0 }}>
          <button 
            onClick={handleToggle}
            className={`btn ${isCompleted ? 'btn-secondary' : 'btn-primary'}`}
            style={{ minWidth: '130px', fontSize: '13px', padding: '0.5rem 1rem' }}
          >
            {isCompleted ? 'Mark Pending' : 'Mark Completed'}
          </button>
          <button 
            onClick={handleDelete} 
            className="btn btn-danger"
            style={{ padding: '0.5rem 0.75rem' }}
            title="Delete Task"
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
