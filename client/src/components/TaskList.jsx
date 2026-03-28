import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, refreshTasks }) => {
  if (!tasks || tasks.length === 0) {
    return (
      <div className="empty-state">
        <svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ margin: '0 auto 1rem auto', opacity: 0.5 }}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
        </svg>
        <h3 style={{ fontSize: '1.125rem', fontWeight: '500', color: 'var(--text-main)', marginBottom: '0.5rem' }}>No tasks found</h3>
        <p style={{ fontSize: '0.875rem' }}>Get started by creating a new task from the sidebar.</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} refreshTasks={refreshTasks} />
      ))}
    </div>
  );
};

export default TaskList;
