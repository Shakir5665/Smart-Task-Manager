import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosSetup";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await api.post("/auth/login", { email, password });
      const token = response.data.token;
      if (response.data.user && response.data.user.name) {
        localStorage.setItem("userName", response.data.user.name);
      }
      localStorage.setItem("token", token);
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Login failed. Please check your credentials.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-hero">
          <img
            src="/assets/hero.png"
            alt="Smart Task Manager Platform"
            style={{ borderRadius: "var(--radius-lg)" }}
          />
          <h1>Smart Task Manager</h1>
          <p>
            Organize your work and life, finally.
            <br />A modern task manager for personal & professional
            productivity.
          </p>
        </div>

        <div className="auth-form-wrapper">
          <div className="auth-header">
            <img src="/assets/logo.png" alt="Logo" />
            <h2>Welcome Back</h2>
            <p>Please enter your details to sign in.</p>
          </div>

          {error && (
            <div
              style={{
                backgroundColor: "#FEE2E2",
                color: "#DC2626",
                padding: "0.875rem 1.125rem",
                borderRadius: "var(--radius-lg)",
                marginBottom: "1.5rem",
                fontSize: "0.875rem",
                textAlign: "center",
                border: "1px solid #FECACA",
                animation: "slideUp 0.3s ease-out",
              }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                placeholder="mohamed@example.com"
                className="input"
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                placeholder="••••••••"
                className="input"
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: "100%", marginTop: "1rem", padding: "0.875rem" }}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="btn-loading-spinner"></div>
                  <span className="btn-loading-text">Signing in...</span>
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <p style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/register")}
                className="btn-link"
                style={{ fontWeight: "600", fontSize: "0.875rem" }}
              >
                Create one now
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
