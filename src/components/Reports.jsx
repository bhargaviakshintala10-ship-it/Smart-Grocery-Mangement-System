import React from "react";
import "./Reports.css";

function Reports({ products }) {
  const totalProducts = products.length;

  const totalValue = products.reduce(
    (sum, p) => sum + p.price * p.stock,
    0
  );

  const lowStock = products.filter((p) => p.stock < 5);

  return (
    <div className="reports-container">
      <h2 className="reports-title">📊 Reports Dashboard</h2>

      {/* CARDS */}
      <div className="reports-cards">

        <div className="report-card">
          <span>📦</span>
          <h3>Total Products</h3>
          <p>{totalProducts}</p>
        </div>

        <div className="report-card">
          <span>💰</span>
          <h3>Total Value</h3>
          <p>₹ {totalValue}</p>
        </div>

        <div className="report-card danger-card">
          <span>⚠️</span>
          <h3>Low Stock</h3>
          <p>{lowStock.length}</p>
        </div>

      </div>

      {/* LOW STOCK SECTION */}
      <div className="low-stock-box">
        <h3>⚠️ Low Stock Products</h3>

        {lowStock.length === 0 ? (
          <p className="no-data">All good 👍</p>
        ) : (
          <div className="stock-list">
            {lowStock.map((p) => (
              <div key={p._id} className="stock-item">
                <span>{p.name}</span>
                <span className="stock-count">{p.stock}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Reports;