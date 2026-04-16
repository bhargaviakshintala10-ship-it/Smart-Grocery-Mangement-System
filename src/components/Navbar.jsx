import React from "react";
import "./Navbar.css";

function Navbar({ onLogout, setPage, page }) {
  return (
    <div className="navbar">

      {/* LOGO */}
      <div className="logo">🛒 Grocery Admin</div>

      {/* NAV LINKS */}
      <div className="nav-links">
        <button
          className={page === "dashboard" ? "active" : ""}
          onClick={() => setPage("dashboard")}
        >
          📊 Dashboard
        </button>

        <button
          className={page === "reports" ? "active" : ""}
          onClick={() => setPage("reports")}
        >
          📈 Reports
        </button>
      </div>

      {/* RIGHT */}
      <div className="navbar-right">
        <div className="user-badge">👤 Admin</div>

        <button
          className="logout-btn"
          onClick={onLogout}
        >
          🚪 Logout
        </button>
      </div>

    </div>
  );
}

export default Navbar;