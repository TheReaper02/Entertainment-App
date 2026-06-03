import { useContext, useState } from "react";
import { DataContext } from "../context/DataContext";
import Card from "../components/Card";
import SearchBar from "../components/SearchBar";

function Home() {
  const { state, dispatch } = useContext(DataContext);
  const [query, setQuery] = useState("");
  const filteredShows = state.shows.filter((show) => {
    return show.title.toLowerCase().includes(query.toLowerCase());
  });
  var trendingShows = filteredShows.filter((show) => show.isTrending);
  var recommendedShows = filteredShows.filter((show) => !show.isTrending);
  return (
    <>
      <SearchBar query={query} setQuery={setQuery} />
      <section>
        <h2 className='text-xl tracking-wide text-white font-outfit font-light mb-4 px-4 md:text-2xl lg:text-3xl xl:text-4xl'>
          Trending
        </h2>
        <ul className='flex overflow-x-auto gap-4 py-4 snap-x snap-mandatory px-4 scrollbar-thumb-blue-500 scrollbar-track-blue900 scrollbar-thin scrollbar-thumb-rounded'>
          {trendingShows.map((show) => (
            <li
              key={show.title}
              className='snap-start shrink-0 w-64 md:w-72 lg:w-80 xl:w-96'>
              <Card
                variant='trending'
                title={show.title}
                imageSmall={show.thumbnail.trending.small}
                imageMedium={show.thumbnail.trending.medium}
                imageLarge={show.thumbnail.trending.large}
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
      <section>
        <h2 className='text-xl tracking-wide text-white font-outfit font-light mb-4 px-4 md:text-2xl lg:text-3xl xl:text-4xl'>
          Recommended for you
        </h2>
        <ul className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 xl:grid-cols-5'>
          {recommendedShows.map((show) => (
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
    </>
  );
}

export default Home;
