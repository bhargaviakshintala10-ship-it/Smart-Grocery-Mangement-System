import React, { useState, useEffect } from "react";
import axios from "axios";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import Reports from "./components/Reports";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [page, setPage] = useState("dashboard");

  // ✅ FIXED BASE URL (NO process.env)
  const API = "http://localhost:5000/api/products";

  // Products state
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem("products");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  // Fetch products
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API}/all`);
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  // Form states
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState("");
  const [discount, setDiscount] = useState("");
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);

  const cancelEdit = () => {
    setName("");
    setPrice("");
    setStock("");
    setImage("");
    setDiscount("");
    setCategory("");
    setEditId(null);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  // Add / Update Product
  const handleSaveProduct = async () => {
    if (!name || !price || !stock) {
      alert("Please fill required fields!");
      return;
    }

    const productData = {
      name,
      price: Number(price),
      stock: Number(stock),
      image: image || "",
      discount: Number(discount) || 0,
      category: category || "",
    };

    try {
      if (editId) {
        const res = await axios.put(
        `http://localhost:5000/api/products/${editId}`,
         productData        
        );
        setProducts(products.map(p => (p._id === editId ? res.data : p)));
      } else {
        const res = await axios.post(
          `${API}/add`,
          productData
        );
        setProducts([...products, res.data]);
      }
      cancelEdit();
    } catch (err) {
      console.error("Error saving product:", err);
    }
  };

  const editProduct = (item) => {
    setName(item.name);
    setPrice(item.price);
    setStock(item.stock);
    setImage(item.image || "");
    setDiscount(item.discount || "");
    setCategory(item.category || "");
    setEditId(item._id);
  };

  const deleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
       await axios.delete(`http://localhost:5000/api/products/${id}`);
        setProducts(products.filter(p => p._id !== id));
      } catch (err) {
        console.error("Error deleting product:", err);
      }
    }
  };

  // Login check
  if (!isLoggedIn) {
    return <Login setIsLoggedIn={setIsLoggedIn} />;
  }

  return (
    <>
      <Navbar onLogout={handleLogout} setPage={setPage} />

      {page === "dashboard" && (
        <Dashboard
          products={products}
          name={name}
          price={price}
          stock={stock}
          image={image}
          category={category}
          setCategory={setCategory}
          setName={setName}
          setPrice={setPrice}
          setStock={setStock}
          setImage={setImage}
          handleSaveProduct={handleSaveProduct}
          discount={discount}
          setDiscount={setDiscount}
          cancelEdit={cancelEdit}
          search={search}
          setSearch={setSearch}
          editId={editId}
          editProduct={editProduct}
          deleteProduct={deleteProduct}
        />
      )}

      {page === "reports" && <Reports products={products} />}
    </>
  );
}

export default App;