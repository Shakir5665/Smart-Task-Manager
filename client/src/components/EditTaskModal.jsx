import React, { useEffect, useMemo, useState } from "react";
import api from "../api/axiosSetup";

const normalizeCategoryValue = (v) => {
  if (v === "" || v === null || v === undefined) return "";
  const n = Number(v);
  return Number.isFinite(n) ? String(n) : "";
};

const EditTaskModal = ({ isOpen, task, categories, onClose, onUpdated }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("PENDING");
  const [categoryId, setCategoryId] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const taskId = task?.id;

  const categoryOptions = useMemo(() => categories || [], [categories]);

  useEffect(() => {
    if (!isOpen || !task) return;
    setTitle(task.title || "");
    setDescription(task.description || "");
    setStatus(task.status || "PENDING");
    setCategoryId(normalizeCategoryValue(task.categoryId));
    setError("");
    setIsSaving(false);
  }, [isOpen, task]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!taskId) return;
    if (!title.trim()) {
      setError("Title is required.");
      return;
    }

    setIsSaving(true);
    setError("");

    try {
      await api.put(`/tasks/${taskId}`, {
        title: title.trim(),
        description: description?.trim?.() ?? "",
        status,
        categoryId: categoryId === "" ? null : Number(categoryId),
      });
      await onUpdated?.();
      onClose?.();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to update task. Please try again.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && !isSaving) {
      onClose?.();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="etm-overlay" onClick={handleOverlayClick} role="presentation">
      <div
        className="etm-dialog"
        role="dialog"
        aria-modal="true"
        aria-label="Edit task"
      >
        <div className="etm-header">
          <div className="etm-title-wrap">
            <h3 className="etm-title">Edit Task</h3>
            <p className="etm-subtitle">Update details and save changes.</p>
          </div>
          <button
            type="button"
            className="etm-close-btn"
            onClick={onClose}
            aria-label="Close"
            disabled={isSaving}
          >
            ×
          </button>
        </div>

        {error ? <div className="alert alert-danger etm-alert">{error}</div> : null}

        <form onSubmit={handleSave} className="etm-body">
          <div className="form-group">
            <label>Title</label>
            <input
              className="input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isSaving}
              placeholder="Task title..."
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              className="input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isSaving}
              placeholder="Add details..."
              style={{ minHeight: 110, resize: "vertical" }}
            />
          </div>

          <div className="etm-grid">
            <div className="form-group">
              <label>Status</label>
              <select
                className="input"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                disabled={isSaving}
              >
                <option value="PENDING">Pending</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>

            <div className="form-group">
              <label>Category</label>
              <select
                className="input"
                value={categoryId}
                onChange={(e) => setCategoryId(normalizeCategoryValue(e.target.value))}
                disabled={isSaving}
              >
                <option value="">No Category</option>
                {categoryOptions.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="etm-actions">
            <button
              type="button"
              className="btn btn-outline"
              onClick={onClose}
              disabled={isSaving}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={isSaving}>
              {isSaving ? (
                <>
                  <div className="btn-loading-spinner"></div>
                  <span className="btn-loading-text">Saving...</span>
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTaskModal;

