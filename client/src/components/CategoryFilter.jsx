import React from 'react';

const CategoryFilter = ({
  categories,
  selectedCategory,
  onSelectCategory,
  onDeleteCategory,
}) => {
  return (
    <ul className="category-list">
      <li 
        className="category-item" 
        style={{ 
          background: selectedCategory === null ? 'var(--primary)' : '#EEF2FF', 
          color: selectedCategory === null ? 'white' : 'var(--primary)', 
          fontWeight: '600' 
        }}
        onClick={() => onSelectCategory(null)}
      >
        All Tasks
      </li>
      {(!categories || categories.length === 0) ? (
        <li style={{ padding: '0.75rem 1rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          No custom categories yet.
        </li>
      ) : null}
      
      {categories && categories.map(cat => (
        <li 
          key={cat.id} 
          className="category-item"
          style={{
            background: selectedCategory === cat.id ? 'var(--primary)' : '',
            color: selectedCategory === cat.id ? 'white' : '',
            fontWeight: selectedCategory === cat.id ? '600' : ''
          }}
          onClick={() => onSelectCategory(cat.id)}
        >
          <span className="category-name">{cat.name}</span>
          <button
            type="button"
            className={`category-delete ${selectedCategory === cat.id ? 'is-selected' : ''}`}
            title="Delete category"
            aria-label={`Delete category ${cat.name}`}
            onClick={(e) => {
              e.stopPropagation();
              onDeleteCategory?.(cat);
            }}
          >
            ×
          </button>
        </li>
      ))}
    </ul>
  );
};

export default CategoryFilter;
