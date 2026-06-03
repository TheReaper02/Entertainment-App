import { DataContext } from "../context/DataContext";
import Card from "../components/Card";
import { useContext, useState } from "react";
import SearchBar from "../components/SearchBar";

function Bookmarked() {
  const { state, dispatch } = useContext(DataContext);
  const [query, setQuery] = useState("");
  var filteredBookmarks = state.shows.filter((show) => {
    return show.title.toLowerCase().includes(query.toLowerCase());
  });
  const isBookmarked = (show) => show.isBookmarked === true;
  const BookmarkedMovies = filteredBookmarks.filter(
    (show) => isBookmarked(show) && show.category === "Movie",
  );
  const BookmarkedTVSeries = filteredBookmarks.filter(
    (show) => isBookmarked(show) && show.category === "TV Series",
  );
  return (
    <>
      <SearchBar
        query={query}
        setQuery={setQuery}
        placeholder='Search for bookmarks.'
      />
      {BookmarkedMovies.length === 0 && BookmarkedTVSeries.length === 0 ? (
        <p className='text-center text-white font-outfit font-light mt-8 text-2xl md:text-3xl lg:text-4xl xl:text-5xl'>
          No bookmarked shows found.
        </p>
      ) : (
        <>
          {BookmarkedMovies.length > 0 && (
            <section>
              <h2 className='text-white text-xl font-outfit mb-4 px-4 font-light md:text-2xl lg:text-3xl xl:text-4xl'>
                Bookmarked Movies
              </h2>
              <ul className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4'>
                {BookmarkedMovies.map((show) => (
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
            </section>
          )}
          {BookmarkedTVSeries.length > 0 && (
            <section>
              <h2 className='text-white  text-xl font-outfit mb-4 mt-4 px-4 font-light md:text-2xl lg:text-3xl xl:text-4xl'>
                Bookmarked TV Series
              </h2>
              <ul className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4'>
                {BookmarkedTVSeries.map((show) => (
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
            </section>
          )}
        </>
      )}
    </>
  );
}

export default Bookmarked;
