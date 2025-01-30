import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetails } from "../store/productsReducer";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentProduct, currentProductStatus } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchProductDetails(id));
  }, [dispatch, id]);

  if (currentProductStatus === "failed") {
    return (
      <div className="container mt-5 text-center">
        <h2>Error loading product details</h2>
        <button
          className="btn btn-primary mt-3"
          onClick={() => navigate("/products")}>
          Back to Products
        </button>
      </div>
    );
  }

  if (!currentProduct || currentProductStatus !== "succeeded") {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}>
        <div
          className="spinner-grow"
          style={{ color: "#6366f1" }}
          role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <button
        className="btn mb-4"
        style={{
          color: "#6366f1",
          border: "1px solid #6366f1",
        }}
        onClick={() => navigate("/products")}>
        <i className="bi bi-arrow-left me-2"></i>
        Back to Products
      </button>

      <div className="row">
        <div className="col-md-6">
          <div className="product-images">
            <img
              src={currentProduct.thumbnail}
              alt={currentProduct.title}
              className="img-fluid rounded main-image mb-3"
              style={{ width: "100%", height: "400px", objectFit: "cover" }}
            />
            <div className="row">
              {currentProduct.images?.map((image, index) => (
                <div key={index} className="col-3 mb-3">
                  <img
                    src={image}
                    alt={`${currentProduct.title} - ${index + 1}`}
                    className="img-fluid rounded"
                    style={{
                      width: "100%",
                      height: "80px",
                      objectFit: "cover",
                      cursor: "pointer",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <h1 className="mb-3">{currentProduct.title}</h1>
          <div className="d-flex align-items-center mb-3">
            <span className="badge bg-success me-2">
              {currentProduct.brand}
            </span>
            <span className="badge bg-primary">{currentProduct.category}</span>
          </div>
          <p className="text-muted mb-4">{currentProduct.description}</p>

          <div className="mb-4">
            <h4 className="mb-3">Product Details</h4>
            <ul className="list-unstyled">
              <li className="mb-2">
                <strong>Price:</strong>{" "}
                <span className="text-success">
                  <del>${currentProduct.price}</del>
                </span>
              </li>
              <li className="mb-2">
                <strong>Stock:</strong>{" "}
                <span
                  className={
                    currentProduct.stock > 0 ? "text-success" : "text-danger"
                  }>
                  {currentProduct.stock > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </li>
              <li className="mb-2">
                <strong>Rating:</strong>{" "}
                <span className="text-warning">
                  {[...Array(5)].map((_, index) => (
                    <i
                      key={index}
                      className={`bi ${
                        index < Math.round(currentProduct.rating)
                          ? "bi-star-fill"
                          : "bi-star"
                      }`}></i>
                  ))}
                  <span className="ms-2">({currentProduct.rating})</span>
                </span>
              </li>
              <li className="mb-2">
                <strong>Discount: </strong>
                <span className="ms-2">
                  ({currentProduct.discountPercentage}%)
                </span>
              </li>
              <li className="mb-2">
                <strong>Discount Price:</strong>{" "}
                <span className="text-danger">
                  $
                  {currentProduct.price -
                    Math.round(
                      currentProduct.price * currentProduct.discountPercentage
                    ) /
                      100}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
