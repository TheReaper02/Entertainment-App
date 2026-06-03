import { DataContext } from "../context/DataContext";
import Card from "../components/Card";
import { useContext, useState } from "react";
import SearchBar from "../components/SearchBar";

function TVSeries() {
  const { state, dispatch } = useContext(DataContext);
  const [query, setQuery] = useState("");
  var filteredShows = state.shows.filter((show) => {
    return show.title.toLowerCase().includes(query.toLowerCase());
  });
  const filteredTVSeries = filteredShows.filter(
    (show) => show.category === "TV Series",
  );

  return (
    <section>
      <SearchBar
        query={query}
        setQuery={setQuery}
        placeholder='Search for TV Series.'
      />
      <h2 className='text-white text-xl font-outfit mb-4 px-4 font-light md:text-2xl lg:text-3xl xl:text-4xl'>
        TV Series
      </h2>
      {filteredTVSeries.length === 0 ? (
        <p className='font-outfit text-white text-center mt-8 text-2xl md:text-3xl lg:text-4xl xl:text-5xl'>
          No TV series found for "{query}".
        </p>
      ) : (
        <ul className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4'>
          {filteredTVSeries.map((show) => (
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
      )}
    </section>
  );
}

export default TVSeries;
