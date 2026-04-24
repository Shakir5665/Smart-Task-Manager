import React, { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosSetup";
import TaskList from "../components/TaskList";
import CategoryFilter from "../components/CategoryFilter";
import AddTaskModal from "../components/AddTaskModal";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [userName, setUserName] = useState("");
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [showDeleteCategoryModal, setShowDeleteCategoryModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [isDeletingCategory, setIsDeletingCategory] = useState(false);
  const navigate = useNavigate();
  const tasksTopRef = useRef(null);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await api.get("/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  }, []);

  const fetchTasks = useCallback(async () => {
    try {
      const response = await api.get("/tasks");
      setTasks(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching tasks", error);
      setIsLoading(false);
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
  }, [navigate]);

  const handleDeleteCategory = useCallback(
    (cat) => {
      if (!cat?.id) return;
      setCategoryToDelete(cat);
      setShowDeleteCategoryModal(true);
    },
    [],
  );

  const confirmDeleteCategory = useCallback(async () => {
    if (!categoryToDelete?.id) return;

    try {
      setIsDeletingCategory(true);
      await api.delete(`/categories/${categoryToDelete.id}`);
      if (selectedCategory === categoryToDelete.id) setSelectedCategory(null);
      await fetchCategories();
      await fetchTasks();
      setShowDeleteCategoryModal(false);
      setCategoryToDelete(null);
    } catch (error) {
      console.error("Error deleting category", error);
      alert(error.response?.data?.message || "Failed to delete category.");
    } finally {
      setIsDeletingCategory(false);
    }
  }, [categoryToDelete, fetchCategories, fetchTasks, selectedCategory]);

  const closeDeleteCategoryModal = useCallback(() => {
    if (isDeletingCategory) return;
    setShowDeleteCategoryModal(false);
    setCategoryToDelete(null);
  }, [isDeletingCategory]);

  const handleDeleteOverlayClick = useCallback(
    (event) => {
      if (event.target === event.currentTarget) {
        closeDeleteCategoryModal();
      }
    },
    [closeDeleteCategoryModal],
  );

  useEffect(() => {
    fetchTasks();
    fetchCategories();

    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setUserName(storedName);
    }
  }, [fetchTasks, fetchCategories]);

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = async () => {
    setIsLoggingOut(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    navigate("/login");
  };

  const filteredTasks =
    selectedCategory !== null
      ? tasks.filter((t) => t.categoryId === selectedCategory)
      : tasks;

  return (
    <div className="dashboard-layout">
      <nav className="navbar">
        <div className="navbar-brand">
          <img
            src="/assets/logo.png"
            alt="Logo"
            style={{ borderRadius: "var(--radius-md)" }}
          />
          <span>Smart Task Manager</span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1.5rem",
            "@media(max-width: 768px)": { gap: "1rem" },
          }}
        >
          {userName && (
            <span
              style={{
                fontSize: "0.95rem",
                fontWeight: "500",
                color: "var(--text-main)",
              }}
            >
              Welcome,{" "}
              <strong style={{ color: "var(--primary)" }}>{userName}</strong>!
            </span>
          )}
          <button
            onClick={handleLogout}
            className="btn btn-ghost"
            style={{
              fontWeight: "500",
              color: "var(--text-muted)",
              fontSize: "0.875rem",
            }}
          >
            Sign Out
          </button>
        </div>
      </nav>

      <div className="dashboard-container">
        <aside className="sidebar">
          <div className="card" style={{ padding: "1.5rem" }}>
            <h3 className="section-title">
              <svg
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                ></path>
              </svg>
              Categories
            </h3>
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              onDeleteCategory={handleDeleteCategory}
            />
          </div>

          <div
            style={{
              padding: "1.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.75rem",
              marginTop: "auto",
              borderTop: "1px solid var(--border)",
            }}
          >
            <img
              src="/assets/shakir_logo.jpg"
              alt="Shakir Tech"
              style={{
                height: "28px",
                width: "28px",
                borderRadius: "50%",
                objectFit: "cover",
                boxShadow: "0 0 0 2px white, 0 0 0 3px var(--primary)",
              }}
            />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{
                  fontSize: "0.6rem",
                  color: "var(--text-muted)",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  fontWeight: "600",
                }}
              >
                Designed & Developed by
              </span>
              <strong
                style={{
                  fontSize: "0.85rem",
                  color: "var(--text-main)",
                  lineHeight: "1",
                }}
              >
                Shakir Tech Solutions
              </strong>
            </div>
          </div>
        </aside>

        <main className="main-content">
          <div className="welcome-sticky">
            <div
              className="card welcome-card"
              style={{
                padding: "2rem",
                marginBottom: "1rem",
                background:
                  "linear-gradient(135deg, var(--primary) 0%, rgba(59, 130, 246, 0.8) 100%)",
                color: "white",
                borderRadius: "12px",
                boxShadow: "0 10px 15px -3px rgba(59, 130, 246, 0.3)",
              }}
            >
              <h2
                style={{
                  fontSize: "1.8rem",
                  fontWeight: "700",
                  marginBottom: "0.5rem",
                  color: "white",
                }}
              >
                Hello, {userName || "User"}! 👋
              </h2>
              <p style={{ opacity: 0.9, fontSize: "1rem", margin: 0 }}>
                Ready to conquer your tasks for today? Let's get things done.
              </p>
            </div>

            <button
              type="button"
              className="btn btn-primary add-task-cta"
              onClick={() => setShowAddTaskModal(true)}
              style={{ width: "100%", marginBottom: "1rem" }}
            >
              + Add Task
            </button>
          </div>

          <div className="card" style={{ padding: "2rem" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "2rem",
              }}
            >
              <div ref={tasksTopRef} />
              <h2
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "700",
                  color: "var(--text-main)",
                }}
              >
                My Tasks
              </h2>
              <span
                style={{
                  fontSize: "0.875rem",
                  color: "var(--text-muted)",
                  background: "#F3F4F6",
                  padding: "0.25rem 0.75rem",
                  borderRadius: "1rem",
                }}
              >
                {filteredTasks.length}{" "}
                {filteredTasks.length === 1 ? "task" : "tasks"}
              </span>
            </div>
            <TaskList
              tasks={filteredTasks}
              refreshTasks={fetchTasks}
              categories={categories}
            />
          </div>
        </main>
      </div>

      <AddTaskModal
        isOpen={showAddTaskModal}
        categories={categories}
        onClose={() => setShowAddTaskModal(false)}
        onCreated={async (newCatId) => {
          await fetchTasks();
          await fetchCategories();
          if (newCatId) setSelectedCategory(newCatId);
          setTimeout(() => {
            tasksTopRef.current?.scrollIntoView?.({
              behavior: "smooth",
              block: "start",
            });
          }, 50);
        }}
      />

      {showDeleteCategoryModal && (
        <div className="modal-overlay" onClick={handleDeleteOverlayClick}>
          <div className="modal" role="dialog" aria-modal="true">
            <div className="modal-header">
              <div>
                <h3 className="modal-title">Delete Category</h3>
                <p className="modal-subtitle">
                  This action cannot be undone.
                </p>
              </div>
            </div>
            <div className="modal-body">
              <p style={{ color: "var(--text-main)", marginBottom: "0.5rem" }}>
                Are you sure you want to delete{" "}
                <strong>"{categoryToDelete?.name}"</strong>?
              </p>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
                Tasks in this category will become uncategorized.
              </p>
              <div className="modal-actions">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={closeDeleteCategoryModal}
                  disabled={isDeletingCategory}
                >
                  No
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={confirmDeleteCategory}
                  disabled={isDeletingCategory}
                >
                  {isDeletingCategory ? (
                    <>
                      <div className="btn-loading-spinner"></div>
                      <span className="btn-loading-text">Deleting...</span>
                    </>
                  ) : (
                    "Yes"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showLogoutModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(17, 24, 39, 0.4)",
            backdropFilter: "blur(4px)",
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "white",
              padding: "2rem",
              borderRadius: "var(--radius-lg)",
              width: "90%",
              maxWidth: "400px",
              textAlign: "center",
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
              animation: "slideUp 0.3s ease-out",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                background: "#FEE2E2",
                color: "#DC2626",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1.5rem auto",
              }}
            >
              <svg
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                ></path>
              </svg>
            </div>
            <h3
              style={{
                fontSize: "1.25rem",
                fontWeight: "700",
                marginBottom: "0.5rem",
                color: "var(--text-main)",
              }}
            >
              Confirm Sign Out
            </h3>
            <p
              style={{
                color: "var(--text-muted)",
                marginBottom: "2rem",
                fontSize: "0.9rem",
                lineHeight: "1.5",
              }}
            >
              Are you sure you want to sign out of your account? You will need
              to log back in to manage your tasks.
            </p>
            <div
              style={{ display: "flex", gap: "1rem", justifyContent: "center" }}
            >
              <button
                className="btn btn-outline"
                style={{ flex: 1 }}
                onClick={() => setShowLogoutModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-danger"
                style={{ flex: 1 }}
                onClick={confirmLogout}
                disabled={isLoggingOut}
              >
                {isLoggingOut ? (
                  <>
                    <div className="btn-loading-spinner"></div>
                    <span className="btn-loading-text">Signing out...</span>
                  </>
                ) : (
                  "Sign Out"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
