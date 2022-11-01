import React, { useContext } from 'react';
import Navbar from '../components/navbar';
import ProductCard from '../components/product';
import './products.css';
import Context from '../context/Context';

export default function Products() {
  const { products } = useContext(Context);

  return (
    <>
      <Navbar />
      {products.map((product) => (
        ProductCard(product)
      ))}
    </>
  );
}
