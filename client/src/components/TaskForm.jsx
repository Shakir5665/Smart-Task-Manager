import React, { useState } from 'react';
import api from '../api/axiosSetup';

const TaskForm = ({ categories, onSuccess }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [newCategoryLine, setNewCategoryLine] = useState(false);
  const [newCatName, setNewCatName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      let finalCatId = categoryId;
      
      // If user wants to create a new category
      if (newCategoryLine && newCatName.trim()) {
        const catRes = await api.post('/categories', { name: newCatName.trim() });
        finalCatId = catRes.data.id;
      }
      
      await api.post('/tasks', { 
        title, 
        description,
        categoryId: finalCatId ? finalCatId : null
      });
      
      setTitle('');
      setDescription('');
      setCategoryId('');
      setNewCatName('');
      setNewCategoryLine(false);
      
      if (onSuccess) onSuccess(finalCatId); 
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <input 
        placeholder="Task Title..." 
        value={title} 
        onChange={e => setTitle(e.target.value)} 
        required 
        className="input"
      />
      <textarea 
        placeholder="Add details about this task..." 
        value={description} 
        onChange={e => setDescription(e.target.value)}
        className="input"
        style={{ minHeight: '100px', resize: 'vertical' }}
      />
      
      {!newCategoryLine ? (
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <select 
            value={categoryId} 
            onChange={(e) => setCategoryId(e.target.value)}
            className="input"
            style={{ flex: 1 }}
          >
            <option value="">No Category</option>
            {categories && categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={() => setNewCategoryLine(true)}
            style={{ padding: '0 0.75rem', fontSize: '1.2rem' }}
            title="Create new category"
          >
            +
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input 
            placeholder="New Category Name..." 
            value={newCatName} 
            onChange={e => setNewCatName(e.target.value)}
            className="input"
            style={{ flex: 1 }}
          />
          <button 
            type="button" 
            className="btn btn-danger"
            onClick={() => { setNewCategoryLine(false); setNewCatName(''); }}
            style={{ padding: '0 0.75rem', fontSize: '1.2rem' }}
            title="Cancel"
          >
            ×
          </button>
        </div>
      )}

      <button type="submit" className="btn btn-primary">
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
