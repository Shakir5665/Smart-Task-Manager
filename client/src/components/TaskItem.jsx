import React, { useState } from "react";
import api from "../api/axiosSetup";
import EditTaskModal from "./EditTaskModal";

const TaskItem = ({ task, refreshTasks, categories }) => {
  const [isToggling, setIsToggling] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await api.delete(`/tasks/${task.id}`);
      await refreshTasks?.();
    } catch (error) {
      console.error(error);
      alert("Failed to delete task.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleToggle = async () => {
    setIsToggling(true);
    try {
      await api.put(`/tasks/${task.id}`, {
        status: task.status === "COMPLETED" ? "PENDING" : "COMPLETED",
      });
      await refreshTasks?.();
    } catch (error) {
      console.error(error);
      alert("Failed to update task status.");
    } finally {
      setIsToggling(false);
    }
  };

  const isCompleted = task.status === "COMPLETED";

  return (
    <div className={`task-item ${isCompleted ? "completed" : ""}`}>
      <div className="task-header">
        <div className="task-content">
          <h3 className={`task-title ${isCompleted ? "completed" : ""}`}>
            {task.title}
          </h3>
          <p className="task-desc">{task.description}</p>
          {task.category && (
            <span
              style={{
                display: "inline-block",
                marginTop: "0.5rem",
                background: "var(--primary-light)",
                color: "var(--primary)",
                fontSize: "0.75rem",
                padding: "0.25rem 0.625rem",
                borderRadius: "12px",
                fontWeight: "600",
              }}
            >
              {task.category.name}
            </span>
          )}
        </div>

        <div className="task-actions task-actions-row">
          <button
            onClick={() => setIsEditing(true)}
            disabled={isToggling || isDeleting}
            className="btn btn-outline btn-small task-action-btn task-action-edit"
            title="Edit task"
          >
            Edit
          </button>
          <button
            onClick={handleToggle}
            disabled={isToggling || isDeleting}
            className={`btn ${isCompleted ? "btn-secondary" : "btn-primary"} btn-small task-action-btn task-action-toggle`}
          >
            {isToggling ? (
              <>
                <div className="btn-loading-spinner"></div>
              </>
            ) : isCompleted ? (
              "Mark Pending"
            ) : (
              "Mark Done"
            )}
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting || isToggling}
            className="btn btn-danger btn-small task-action-btn task-action-delete"
            title="Delete Task"
          >
            {isDeleting ? (
              <div className="btn-loading-spinner"></div>
            ) : (
              <svg
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                ></path>
              </svg>
            )}
          </button>
        </div>
      </div>

      <EditTaskModal
        isOpen={isEditing}
        task={task}
        categories={categories}
        onClose={() => setIsEditing(false)}
        onUpdated={refreshTasks}
      />
    </div>
  );
};

export default TaskItem;
