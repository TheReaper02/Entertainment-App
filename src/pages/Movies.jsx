import { DataContext } from "../context/DataContext";
import Card from "../components/Card";
import { useContext, useState } from "react";
import SearchBar from "../components/SearchBar";

function Movies() {
  const { state, dispatch } = useContext(DataContext);
  const [query, setQuery] = useState("");
  var filteredShows = state.shows.filter((show) => {
    return show.title.toLowerCase().includes(query.toLowerCase());
  });
  const filteredMovies = filteredShows.filter(
    (show) => show.category === "Movie",
  );

  return (
    <section>
      <SearchBar
        query={query}
        setQuery={setQuery}
        placeholder='Search for movies.'
      />
      {filteredMovies.length === 0 ? (
        <p className='font-outfit text-white text-center mt-8 text-2xl md:text-3xl lg:text-4xl xl:text-5xl'>
          No movies found for "{query}".
        </p>
      ) : (
        <>
          <h2 className='text-xl text-white font-outfit font-light mb-4 px-4 md:text-2xl lg:text-3xl xl:text-4xl'>
            Movies
          </h2>
          <ul className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4'>
            {filteredMovies.map((show) => (
              <li key={show.title}>
                <Card
                  variant='recommended'
                  title={show.title}
                  imageSmall={show.thumbnail.regular.small}
                  imageMedium={show.thumbnail.regular.medium}
                  imageLarge={show.thumbnail.regular.large}
                  year={show.year}
                  category={show.category}
                  rating={show.rating}
                  isBookmarked={show.isBookmarked}
                  dispatch={dispatch}
                />
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}

export default Movies;
