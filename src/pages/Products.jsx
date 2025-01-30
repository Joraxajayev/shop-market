import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/productsReducer.js";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function Products() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, status } = useSelector((state) => state.products);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const handleDetails = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="container-fluid">
      <nav className="navbar navbar-dark bg-primary mb-4">
        <div className="container">
          <span className="navbar-brand">Welcome, {user.name}!</span>
          <div className="ms-auto">
            <i className="bi bi-person-circle fs-4 text-white"></i>
          </div>
        </div>
      </nav>

      <div className="container">
        <div className="text-center mb-5">
          <h1 className="display-4">Discover Amazing Products</h1>
          <p className="lead text-muted">Find what you love and love what you find</p>
        </div>

        {status === "loading" && (
          <div className="d-flex justify-content-center">
            <div className="spinner-grow text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {status === "succeeded" && (
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {items.map((product) => (
              <div key={product.id} className="col">
                <div className="card h-100 shadow-sm">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text text-muted">
                      {product.description.length > 100
                        ? product.description.substring(0, 100) + "..."
                        : product.description}
                    </p>
                  </div>
                  <div className="card-footer bg-white d-flex justify-content-between align-items-center">
                    <span className="h5 mb-0 text-primary">${product.price}</span>
                    <button
                      className="btn btn-outline-primary"
                      onClick={() => handleDetails(product.id)}>
                      Details
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
