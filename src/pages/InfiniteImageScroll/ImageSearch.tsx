import React from "react";
import { Close, Refresh, Search } from "@material-ui/icons";
import css from "./inifiniteImageScroll.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/Store";
import {
  clearSearchTerm,
  setImagesEmpty,
  setPage,
  setSearchTerm,
} from "../../redux/reducers/InfiniteImageScrollReducer";
import { useTheme } from "@mui/material";

const ImageSearch: React.FC = () => {
  const term = useSelector(
    (state: RootState) => state.InfiniteImageScrollReducer.term
  );

  const dispatch: AppDispatch = useDispatch();

  const handleSearchSubmit = () => {
    if (term.trim() !== "") {
      dispatch(setImagesEmpty());
      dispatch(setPage(1));
      setTimeout(() => {
        dispatch(setSearchTerm(term.trim()));
      }, 500);
    }
  };

  const onEnterKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (term.trim() !== "") {
      if (e.key === "Enter") {
        dispatch(setImagesEmpty());
        dispatch(setPage(1));
        setTimeout(() => {
          dispatch(setSearchTerm(term.trim()));
        }, 500);
      }
    }
  };

  const handleResetSearch = () => {
    dispatch(setImagesEmpty());
    dispatch(setPage(1));
    setTimeout(() => {
      dispatch(clearSearchTerm());
    }, 500);
  };

  const handleResetImage = () => {
    dispatch(setImagesEmpty());
    dispatch(setPage(1));
    setTimeout(() => {
      dispatch(clearSearchTerm());
    }, 500);
  };

  const theme = useTheme();
  const iconColor = theme.customKey.icon.main;

  return (
    <>
      <div className={css["search-bar"]}>
        <input
          id={"search-input"}
          value={term}
          type="text"
          placeholder="Search Images Here"
          onChange={(e) => dispatch(setSearchTerm(e.target.value))}
          onKeyDown={onEnterKeyDown}
          className=""
        />

        <button
          type="button"
          onClick={handleResetSearch}
          disabled={term === ""}
          style={{ background: "none " }}
        >
          <Close style={{ color: iconColor }} />
        </button>
        <button onClick={handleSearchSubmit} style={{ background: "none " }}>
          <Search style={{ color: iconColor }} />
        </button>
        <button onClick={handleResetImage} style={{ background: "none " }}>
          <Refresh style={{ color: iconColor }} />
        </button>
      </div>
    </>
  );
};

export default ImageSearch;
