import React, { useEffect, useState } from "react";
import api from "../api/axiosSetup";

const TaskForm = ({ categories, onSuccess, showSuccessMessage = true }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [newCategoryLine, setNewCategoryLine] = useState(false);
  const [newCatName, setNewCatName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (!successMessage) return;
    const t = setTimeout(() => setSuccessMessage(""), 2000);
    return () => clearTimeout(t);
  }, [successMessage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    setIsLoading(true);
    setSuccessMessage("");

    try {
      let finalCatId = categoryId !== "" ? Number(categoryId) : null;

      if (newCategoryLine && newCatName.trim()) {
        const catRes = await api.post("/categories", {
          name: newCatName.trim(),
        });
        finalCatId = catRes.data.id;
      }

      await api.post("/tasks", {
        title,
        description,
        categoryId: finalCatId ?? null,
      });

      setTitle("");
      setDescription("");
      setCategoryId("");
      setNewCatName("");
      setNewCategoryLine(false);
      setIsLoading(false);
      if (showSuccessMessage) setSuccessMessage("Task Added Successfully");

      if (onSuccess) onSuccess(finalCatId);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
    >
      {showSuccessMessage && successMessage ? (
        <div className="alert alert-success">{successMessage}</div>
      ) : null}
      <input
        placeholder="Task Title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        disabled={isLoading}
        className="input"
      />
      <textarea
        placeholder="Add details about this task..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        disabled={isLoading}
        className="input"
        style={{ minHeight: "100px", resize: "vertical" }}
      />

      {!newCategoryLine ? (
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <select
            value={categoryId}
            onChange={(e) => {
              const v = e.target.value;
              setCategoryId(v === "" ? "" : String(Number(v)));
            }}
            disabled={isLoading}
            className="input"
            style={{ flex: 1 }}
          >
            <option value="">No Category</option>
            {categories &&
              categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
          </select>
          <button
            type="button"
            className="btn btn-secondary btn-small"
            onClick={() => setNewCategoryLine(true)}
            disabled={isLoading}
            title="Create new category"
          >
            +
          </button>
        </div>
      ) : (
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <input
            placeholder="New Category Name..."
            value={newCatName}
            onChange={(e) => setNewCatName(e.target.value)}
            disabled={isLoading}
            className="input"
            style={{ flex: 1 }}
          />
          <button
            type="button"
            className="btn btn-danger btn-small"
            onClick={() => {
              setNewCategoryLine(false);
              setNewCatName("");
            }}
            disabled={isLoading}
            title="Cancel"
          >
            ×
          </button>
        </div>
      )}

      <button
        type="submit"
        className="btn btn-primary"
        disabled={isLoading}
        style={{ width: "100%" }}
      >
        {isLoading ? (
          <>
            <div className="btn-loading-spinner"></div>
            <span className="btn-loading-text">Adding...</span>
          </>
        ) : (
          "Add Task"
        )}
      </button>
    </form>
  );
};

export default TaskForm;
