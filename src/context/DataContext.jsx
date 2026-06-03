import { useReducer, createContext } from "react";
import Shows from "../data/data.json";

const DataContext = createContext();

function DataProvider({ children }) {
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "TOGGLE_BOOKMARK":
          return {
            ...state,
            shows: state.shows.map((show) => {
              if (show.title === action.payload) {
                return {
                  ...show,
                  isBookmarked: !show.isBookmarked,
                };
              }
              return show;
            }),
          };

        default:
          return state;
      }
    },
    {
      shows: Shows,
    },
  );

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
}

export { DataContext, DataProvider };
