import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import './SearchBar.css';

export default function SearchBar() {
  const [input, setInput] = useState('');
  const [results, setResults] = useState([]);

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

  console.log(results);

  return (
    <>
      <div className="input-wrapper">
        <FaSearch id="search-icon" />
        <input
          placeholder="Search"
          value={input}
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>
      <div className="results-wrapper">
        {results.length > 0 && (
          <ul className="results-list">
            {results.map((result) => (
              <li key={result.symbol}>
                <span>
                  {result.symbol} - {result.name}
                </span>
              </li>
            ))}
          </ul>
        )}
        {results.length === 0 && <p></p>}
      </div>
    </>
  );
}
