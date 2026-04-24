import React, { useEffect, useState } from "react";
import TaskForm from "./TaskForm";

const AddTaskModal = ({ isOpen, categories, onClose, onCreated }) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (!isOpen) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setIsClosing(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      onMouseDown={() => {
        if (!isClosing) onClose?.();
      }}
      role="presentation"
    >
      <div
        className="modal"
        onMouseDown={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Add task"
      >
        <div className="modal-header">
          <div>
            <h3 className="modal-title">Add Task</h3>
            <p className="modal-subtitle">Create a new task in seconds.</p>
          </div>
          <button
            type="button"
            className="btn btn-ghost btn-small"
            onClick={() => {
              if (!isClosing) onClose?.();
            }}
            aria-label="Close"
            style={{ minWidth: 36 }}
            disabled={isClosing}
          >
            ×
          </button>
        </div>

        <div className="modal-body">
          <TaskForm
            categories={categories}
            showSuccessMessage={false}
            onSuccess={async (newCatId) => {
              setIsClosing(true);
              await onCreated?.(newCatId);
              onClose?.();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;

