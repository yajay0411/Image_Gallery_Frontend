import React from "react";
import { Close, Refresh, Search } from "@material-ui/icons";
import css from "./inifiniteImageScroll.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/Store";
import {
  clearSearchTerm,
  setPage,
  setSearchTerm,
} from "../../redux/reducers/InfiniteImageScrollReducer";
import { useTheme } from "@mui/material";
import { Grid } from "@material-ui/core";

const ImageSearch: React.FC = () => {
  const term = useSelector(
    (state: RootState) => state.InfiniteImageScrollReducer.term
  );

  const dispatch: AppDispatch = useDispatch();

  const onEnterKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (term.trim() !== "") {
      if (e.key === "Enter") {
        // dispatch(setImagesEmpty());
        dispatch(setPage(1));
        setTimeout(() => {
          dispatch(setSearchTerm(term.trim()));
        }, 500);
      }
    }
  };

  const handleResetSearch = () => {
    dispatch(setPage(1));
    setTimeout(() => {
      dispatch(clearSearchTerm());
    }, 500);
  };

  const handleResetImage = () => {
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
        <Grid container justifyContent="center" alignItems="center">
          <Grid item>
            <input
              id={"search-input"}
              value={term}
              type="text"
              placeholder="Search Images Here"
              onChange={(e) => dispatch(setSearchTerm(e.target.value))}
              onKeyDown={onEnterKeyDown}
              className=""
            />
          </Grid>
          <Grid item>
            <button
              type="button"
              onClick={handleResetSearch}
              disabled={term === ""}
              style={{ background: "none " }}
            >
              <Close style={{ color: iconColor }} />
            </button>
          </Grid>
          <Grid item>
            <button onClick={handleResetImage} style={{ background: "none " }}>
              <Refresh style={{ color: iconColor }} />
            </button>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default ImageSearch;
