import './SearchBar.css'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchListings } from '../../store/listings';

const SearchBar = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(fetchListings(query))  
    setQuery('')  
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search by location"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar