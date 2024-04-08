import React, { useState, useEffect } from 'react';
import FilterCat from './FilterCat';
import ProductList from '../Store/ProductList';
import items from '../../items';

const Homedecore = () => {
  const [categoryFilter, setCategoryFilter] = useState('Home Decor'); // Make sure the category name matches exactly
  const [sortPrice, setSortPrice] = useState('');
  const [ratingFilter, setRatingFilter] = useState(0);
  const [products, setProducts] = useState([]); // This state holds the list of products to display

  useEffect(() => {
    let filteredProducts = []; // Use a temporary array to filter the products

    items.forEach(item => {
      item.categories.forEach(category => {
        if (category.name === categoryFilter) { // Check if category matches "Home Decore"
          filteredProducts = filteredProducts.concat(category.products);
        }
      });
    });

    // Apply rating filter
    if (ratingFilter > 0) {
      filteredProducts = filteredProducts.filter(product => product.rating >= ratingFilter);
    }

    // Apply sorting
    if (sortPrice === 'high-to-low') {
      filteredProducts.sort((a, b) => b.price - a.price);
    } else if (sortPrice === 'low-to-high') {
      filteredProducts.sort((a, b) => a.price - b.price);
    }

    setProducts(filteredProducts); 
  }, [categoryFilter, sortPrice, ratingFilter]); 

  return (
    <div style={{ display: 'flex',    minHeight: '100vh', 
  }}>
      <FilterCat
        setCategoryFilter={setCategoryFilter}
        setSortPrice={setSortPrice}
        setRatingFilter={setRatingFilter}
      />
      <ProductList products={products} />
    </div>
  );
};

export default Homedecore;
