import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/main.css';

const NotFound = () => {
  return (
    <div className="not-found">
      <div className="not-found-content">
        <h1>404</h1>
        <h2>Sahifa topilmadi</h2>
        <p>Kechirasiz, siz qidirayotgan sahifa mavjud emas.</p>
        <Link to="/" className="back-home">
          Bosh sahifaga qaytish
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
