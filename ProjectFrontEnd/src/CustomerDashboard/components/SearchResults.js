import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from './ProductCard';
import items from '../items';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState([]);

  useEffect(() => {
    const query = searchParams.get('query');
    if (query) {
      performSearch(decodeURIComponent(query));
    }
  }, [searchParams]);

  const performSearch = (query) => {
    let matchedItems = [];
    
    items.forEach(category => {
      category.categories.forEach(subCategory => {
        const matchedProducts = subCategory.products.filter(product =>
          product.title.toLowerCase().includes(query.toLowerCase())
        );
        if (matchedProducts.length > 0) {
          matchedItems = [...matchedItems, ...matchedProducts];
        }
      });
    });
    setResults(matchedItems);
  };
  if (results.length === 0) {
    return <div>No results found.</div>;
  }
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', rowGap:'10vh',padding:'5vh',paddingTop:'10vh' }}>
      {results.map(product => (
        <ProductCard
          key={product.id}
          id={product.id}
          imageUrl={product['image-url']}
          title={product.title}
          description={product.description}
          price={`$${product.price.toFixed(2)}`}
          rating={product.rating}
        />
      ))}
    </div>
  );
};

export default SearchResults;
