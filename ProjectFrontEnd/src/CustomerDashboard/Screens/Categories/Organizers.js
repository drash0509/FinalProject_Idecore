import React, { useState, useEffect } from 'react';
import FilterCat from './FilterCat';
import ProductList from '../Store/ProductList';
import items from '../../items';

const Organizers = () => {
  const [categoryFilter, setCategoryFilter] = useState('Organizers'); 
    const [sortPrice, setSortPrice] = useState('');

  const [ratingFilter, setRatingFilter] = useState(0);
  const [products, setProducts] = useState([]); 

  useEffect(() => {
    let filteredProducts = []; 

    items.forEach(item => {
      item.categories.forEach(category => {
        if (category.name === categoryFilter) { 
          filteredProducts = filteredProducts.concat(category.products);
        }
      });
    });

    if (ratingFilter > 0) {
      filteredProducts = filteredProducts.filter(product => product.rating >= ratingFilter);
    }

    if (sortPrice === 'high-to-low') {
      filteredProducts.sort((a, b) => b.price - a.price);
    } else if (sortPrice === 'low-to-high') {
      filteredProducts.sort((a, b) => a.price - b.price);
    }

    setProducts(filteredProducts);  
  }, [categoryFilter, sortPrice, ratingFilter]); 
  return (
    <div style={{ display: 'flex' }}>
      <FilterCat
        setCategoryFilter={setCategoryFilter}
        setSortPrice={setSortPrice}
        setRatingFilter={setRatingFilter}
      />
      <ProductList products={products} />
    </div>
  );
};

export default Organizers
;
