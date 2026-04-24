import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosSetup";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await api.post("/auth/register", { name, email, password });
      setSuccess("Registration successful!");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Registration failed. Please check the requirements.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-form-wrapper">

          <div className="auth-header">
             <img src="/assets/logo.png" alt="Smart Task Manager"/>
            <h2>Create Account</h2>
            <p>Start managing your tasks effectively.</p>
          </div>

          {error && !success && (
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

          {success ? (
            <div
              style={{
                padding: "3rem 2rem",
                textAlign: "center",
                backgroundColor: "#F0FDF4",
                borderRadius: "var(--radius-xl)",
                border: "1px solid #BBF7D0",
                marginBottom: "2rem",
                animation: "slideUp 0.4s ease-out",
              }}
            >
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  backgroundColor: "#D1FAE5",
                  color: "#10B981",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1.5rem auto",
                  animation: "pulse 2s ease-in-out infinite",
                }}
              >
                <svg
                  width="32"
                  height="32"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              <h3
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "700",
                  color: "#065F46",
                  marginBottom: "1rem",
                }}
              >
                Registration Successful!
              </h3>
              <p
                style={{
                  color: "#047857",
                  fontSize: "1rem",
                  marginBottom: "1.5rem",
                }}
              >
                Your account has been created successfully.
              </p>
              <button
                onClick={() => navigate("/login")}
                className="btn btn-primary"
                style={{ width: "100%", padding: "0.875rem 1.5rem" }}
              >
                Go to Login
              </button>
            </div>
          ) : (
            <form onSubmit={handleRegister}>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  placeholder="Mohamed"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={isLoading}
                  className="input"
                />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  placeholder="mohamed@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  className="input"
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Requires at least 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  className="input"
                />
              </div>

              <button
                type="submit"
                className="btn btn-secondary"
                style={{
                  width: "100%",
                  marginTop: "1rem",
                  padding: "0.875rem",
                }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="btn-loading-spinner"></div>
                    <span className="btn-loading-text">Creating...</span>
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>
          )}

          {!success && (
            <div style={{ textAlign: "center", marginTop: "2rem" }}>
              <p style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>
                Already a member?{" "}
                <button
                  onClick={() => navigate("/login")}
                  className="btn-link"
                  style={{ fontWeight: "600", fontSize: "0.875rem" }}
                >
                  Sign in here
                </button>
              </p>
            </div>
          )}
        </div>

        <div
          className="auth-hero"
          style={{
            background: "linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)",
          }}
        >
          <img
            src="/assets/hero.png"
            alt="Smart Task Manager Dashboard"
            style={{ borderRadius: "var(--radius-lg)" }}
          />
          <h1 style={{ color: "var(--secondary-hover)" }}>
            Elevate Your Productivity
          </h1>
          <p>
            Join thousands of users organizing their workflow in a clean,
            professional workspace.
          </p>
        </div>
      </div>

      {/* Floating Author Signature */}
      
    </div>
  );
};

export default Register;
