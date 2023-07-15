import React, { useState, useEffect, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './SearchBar.css';

export default function SearchBar() {
  const [input, setInput] = useState('');
  const [results, setResults] = useState([]);
  const dropdownRef = useRef(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (input.length > 2 && results.length < 1) {
      setError(true);
    } else {
      setError(false);
    }
  }, [input]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      window.alert('Please select an item from the dropdown');
    }
  };

  const fetchData = (value) => {
    if (value) {
      fetch(`/api/stocks/search/${value}`)
        .then((response) => response.json())
        .then((data) => setResults(data));
    } else {
      setResults([]);
    }
  };

  const handleChange = (value) => {
    setInput(value);
    if (value.trim() === '') {
      setResults([]);
    } else {
      fetchData(value);
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setResults([]);
    }
  };

  return (
    <div className="search-bar">
      <div className="input-wrapper">
        <FaSearch id="search-icon" />
        <input
          className="searchbar-input"
          placeholder="Search"
          value={input}
          onKeyPress={handleKeyPress}
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>
      {results.length > 0 && (
        <div className="results-dropdown-menu" ref={dropdownRef}>
          <ul className="results-list">
            {error && (
              <li>We were unable to find any results for your search.</li>
            )}
            {results.map((result) => (
              <li key={result.symbol}>
                <Link
                  to={`/stocks/${result.symbol}`}
                  onClick={() => setResults([])}
                >
                  <span className="result-item">
                    {result.symbol} - {result.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
