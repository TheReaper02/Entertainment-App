import bookmarkIcon from "../assets/icon-bookmark-empty.svg";
import bookmarkIconFilled from "../assets/icon-bookmark-full.svg";
import movieIcon from "../assets/icon-category-movie.svg";
import tvIcon from "../assets/icon-category-tv.svg";
import PlayIcon from "../assets/icon-play.svg";

function Card({
  title,
  imageSmall,
  imageMedium,
  imageLarge,
  year,
  category,
  rating,
  variant,
  isBookmarked,
  dispatch,
}) {
  const srcSet = imageMedium
    ? `${imageSmall} 480w, ${imageMedium} 800w, ${imageLarge} 1200w`
    : `${imageSmall} 480w, ${imageLarge} 1200w`;
  const isTrending = variant === "trending";
  return (
    <div className='relative overflow-hidden rounded-lg cursor-pointer group hover:brightness-110 transition-all'>
      <img
        srcSet={srcSet}
        alt={title}
        className={`w-full object-cover rounded-2xl ${isTrending ? "h-full" : "aspect-video"}`}
      />
      <div
        className={
          isTrending
            ? "absolute inset-0 bg-linear-to-t from-black/70 to-transparent"
            : ""
        }>
        <div className={isTrending ? "absolute bottom-0 left-0 p-6" : ""}>
          <div className='flex gap-2 text-sm font-light font-outfit mb-1'>
            <span
              className={isTrending ? "text-gray-300" : "text-gray-300 mt-2"}>
              {year}
            </span>
            <span
              className={isTrending ? "text-gray-300" : "text-gray-300 mt-2"}>
              ·
            </span>
            <span
              className={
                isTrending
                  ? "flex items-center gap-1 text-gray-300"
                  : "flex items-center gap-1 text-gray-300 mt-2"
              }>
              <img
                src={category === "Movie" ? movieIcon : tvIcon}
                alt=''
                className='inline w-4 h-4'
              />{" "}
              {category}
            </span>
            <span
              className={isTrending ? "text-gray-300" : "text-gray-300 mt-2"}>
              ·
            </span>
            <span
              className={
                isTrending
                  ? "text-gray-300"
                  : "text-gray-300 font-light mt-2 xl:mt-0 xl:text-lg"
              }>
              {rating}
            </span>
          </div>
          <p
            className={
              isTrending
                ? "text-white text-lg font-semibold xl:text-2xl"
                : "text-white text-lg font-semibold xl:text-xl"
            }>
            {title}
          </p>
        </div>
      </div>
      <div
        className={`absolute flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity ${isTrending ? "inset-0" : "top-0 left-0 right-0 aspect-video"}`}>
        <div className='bg-white/20 rounded-full px-4 py-2 flex items-center gap-2'>
          <img src={PlayIcon} alt='Play' className='w-8 h-8' />
          <span className='text-white font-semibold'>Play</span>
        </div>
      </div>
      <button
        className='absolute top-3 right-3 rounded-full bg-blue950/80 p-2 hover:bg-blue950 transition-colors cursor-pointer'
        aria-label='Toggle bookmark'
        onClick={() => {
          dispatch({ type: "TOGGLE_BOOKMARK", payload: title });
        }}>
        <img
          src={isBookmarked ? bookmarkIconFilled : bookmarkIcon}
          alt=''
          className='w-4 h-4'
        />
      </button>
    </div>
  );
}

export default Card;
