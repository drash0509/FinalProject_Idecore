import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Searchbar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/CustomerDashboard/search-results?query=${encodeURIComponent(query)}`);
    } else {
      alert("Please enter a search term.");
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for products..."
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default Searchbar;
