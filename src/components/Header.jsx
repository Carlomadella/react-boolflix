const Header = ({ query, setQuery, onSearch }) => {
  const handleSubmit = (e) => {
    e.preventDefault(); 
    onSearch();
  };

  return (
    <header className="app-header d-flex justify-content-between align-items-center px-4 py-3">
      <h1 className="logo">BOOLFLIX</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Cerca..."
          className="search-bar"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
    </header>
  );
};

export default Header;
