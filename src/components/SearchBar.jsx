import SearchIcon from "../assets/icon-search.svg";

function SearchBar({
  query,
  setQuery,
  placeholder = "Search for movies or TV series.",
}) {
  return (
    <form
      role='search'
      className='flex items-center gap-4 p-4 md:px-8 lg:px-12'
      onSubmit={(e) => e.preventDefault()}>
      <img
        src={SearchIcon}
        alt=''
        className='w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10'
      />
      <label htmlFor='search-input' className='flex-1'>
        <input
          id='search-input'
          type='text'
          placeholder={placeholder}
          className='bg-transparent border-none text-gray-400 placeholder-gray-400 focus:ring-0 w-full px-4 md:text-lg lg:text-xl'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <span className='sr-only'>Search</span>
      </label>
    </form>
  );
}

export default SearchBar;
