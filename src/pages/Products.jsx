import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, likeProduct } from "../store/productsReducer.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../styles/main.css";

function Products() {
  const dispatch = useDispatch();
  const { items, status, likedProducts } = useSelector(
    (state) => state.products
  );
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const handleLike = (id) => {
    dispatch(likeProduct(id));
  };

  return (
    <div className="products-container">
      <header className="products-header">
        <div className="header-content">
          <h4 className="welcome-text">Welcome, {user.name}!</h4>
          <div className="user-avatar">
            <i
              className="bi bi-person-circle fs-4"
              style={{ color: "white" }}></i>
          </div>
        </div>
      </header>

      <div className="main-content">
        <div className="section-title text-center mb-5">
          <h1 className="title">Discover Amazing Products</h1>
          <p className="subtitle">Find what you love and love what you find</p>
        </div>

        {status === "loading" && (
          <div className="loading-spinner">
            <div
              className="spinner-grow"
              style={{ color: "#6366f1" }}
              role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {status === "succeeded" && (
          <div className="products-grid">
            {items.map((product) => (
              <div key={product.id} className="product-card">
                <div
                  className="product-image-container"
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "translateY(-5px)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "translateY(0)")
                  }>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                  />
                  <button
                    onClick={() => handleLike(product.id)}
                    className={`like-button ${
                      likedProducts[product.id] ? "liked" : ""
                    }`}
                    disabled={likedProducts[product.id]}>
                    <i
                      className={`bi ${
                        likedProducts[product.id] ? "bi-heart-fill" : "bi-heart"
                      }`}></i>
                    {product.likes > 0 && (
                      <span className="likes-count">{product.likes}</span>
                    )}
                  </button>
                </div>

                <div className="product-details">
                  <h5 className="product-title">{product.name}</h5>
                  <p className="product-description">{product.description}</p>
                  <div className="product-footer">
                    <span className="product-price">${product.price}</span>
                    <button
                      className="add-to-cart-button"
                      onMouseEnter={(e) => {
                        e.target.style.background = "#6366f1";
                        e.target.style.color = "white";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = "transparent";
                        e.target.style.color = "#6366f1";
                      }}>
                      <i className="bi bi-cart-plus"></i>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;
