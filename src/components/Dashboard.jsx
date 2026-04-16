import React, { useState } from "react";
import "./Dashboard.css";

function Dashboard({
  products,
  name,
  price,
  stock,
  image,
  discount,
  category,
  setName,
  setPrice,
  setStock,
  setImage,
  setDiscount,
  setCategory,
  handleSaveProduct,
  search,
  setSearch,
  editId,
  editProduct,
  deleteProduct,
  cancelEdit,
}) {

  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortOption, setSortOption] = useState("");

  // ✅ FINAL CATEGORY LIST (CORRECT & COMPLETE)
  const categories = [
    "Fruits & Vegetables",
    "Dairy",
    "Snacks",
    "Beverages",
    "Grocery (Staples)",   // ✅ salt, jaggery
    "Household"
  ];

  // ✅ FILTER
  const filteredProducts = products
    .filter((item) =>
      item.name?.toLowerCase().includes(search.toLowerCase())
    )
    .filter((item) =>
      categoryFilter ? item.category === categoryFilter : true
    );

  // ✅ SORT
  let sortedProducts = [...filteredProducts];

  if (sortOption === "low") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortOption === "high") {
    sortedProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <div className="dashboard-container">

      <h1 className="title">Admin Dashboard</h1>

      {/* ✅ PRODUCT FORM */}
      <div className="form-box">

        <input
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />

        <input
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        {/* ✅ CATEGORY DROPDOWN */}
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select Category</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>{cat}</option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Discount %"
          value={discount || ""}
          onChange={(e) => setDiscount(e.target.value)}
        />

        <button onClick={handleSaveProduct}>
          {editId ? "Update Product" : "Add Product"}
        </button>

        {editId && (
          <button className="cancel-btn" onClick={cancelEdit}>
            Cancel
          </button>
        )}

      </div>

      {/* ✅ SEARCH */}
      <input
        className="search"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* ✅ FILTER + SORT */}
      <div className="filters">

        <select onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="">All Categories</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>{cat}</option>
          ))}
        </select>

        <select onChange={(e) => setSortOption(e.target.value)}>
          <option value="">Sort By</option>
          <option value="low">Price: Low → High</option>
          <option value="high">Price: High → Low</option>
        </select>

      </div>

      {/* ✅ PRODUCTS LIST */}
      <div className="card-container">
        {sortedProducts.length > 0 ? (
          sortedProducts.map((item) => {

            const stockValue = Number(item.stock ?? item.quantity ?? 0);

            return (
              <div className="card" key={item._id}>

                {/* TOP SECTION */}
                <div className="card-top">
                  <div className="left-badges">

                    {stockValue <= 5 && (
                      <span className="badge low">⚠ Low Stock</span>
                    )}

                    {Number(item.discount) > 0 && (
                      <span className="badge discount">
                        -{item.discount}%
                      </span>
                    )}

                  </div>

                  <div className="category">{item.category}</div>
                </div>

                {/* IMAGE */}
                <img src={item.image} alt={item.name} />

                {/* NAME */}
                <h4>{item.name}</h4>

                {/* PRICE */}
                <p className="price">
                  {Number(item.discount) > 0 ? (
                    <>
                      <span className="old">₹{item.price}</span>
                      <span className="new">
                        ₹{Math.floor(item.price * (100 - item.discount) / 100)}
                      </span>
                    </>
                  ) : (
                    <>₹{item.price}</>
                  )}
                </p>

                {/* STOCK */}
                <p className="stock">Stock: {stockValue}</p>

                {stockValue <= 5 && (
                  <p className="low-text">Only few left 🔥</p>
                )}

                {/* BUTTONS */}
                <div className="btns">
                  <button onClick={() => editProduct(item)}>✏️</button>
                  <button onClick={() => deleteProduct(item._id)}>🗑</button>
                </div>

              </div>
            );
          })
        ) : (
          <p className="empty-state">No products found 😔</p>
        )}
      </div>

    </div>
  );
}

export default Dashboard;