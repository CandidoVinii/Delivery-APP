import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/navbar';
import ProductCard from '../components/product';

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await axios('http://localhost:3001/products');
      setProducts(data);
    })();
  }, []);

  // useEffect(() => {
  //   const bla = products
  //     .map(({ id }, index) => <div className="teste" key={ index }>{id}</div>);
  //   console.log(bla);
  //   setCards(bla);
  // }, [products]);

  return (
    <>
      <Navbar />
      {products.map((product) => (
        ProductCard(product)
      ))}
    </>
  );
}
