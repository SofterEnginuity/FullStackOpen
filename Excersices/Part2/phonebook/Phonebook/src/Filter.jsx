const Filter = ({ searchQuery, handleSearchChange }) => {
    return (
      <div>
        Filter contacts: <input value={searchQuery} onChange={handleSearchChange} />
      </div>
    );
  };
  
  export default Filter;
  