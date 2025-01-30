import React from 'react';
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

const NotFound = () => {
  return (
    <div className="container">
      <div className="row min-vh-100 justify-content-center align-items-center">
        <div className="col-md-6 text-center">
          <h1 className="display-1 fw-bold text-primary">404</h1>
          <h2 className="mb-3">Sahifa topilmadi</h2>
          <p className="text-muted mb-4">Kechirasiz, siz qidirayotgan sahifa mavjud emas.</p>
          <Link to="/" className="btn btn-primary px-4 py-2">
            Bosh sahifaga qaytish
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
