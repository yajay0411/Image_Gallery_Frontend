import { useState, useEffect, useCallback } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import ImageCard from "./ImageCard";
import css from "./inifiniteImageScroll.module.css";
import ImageSearch from "./ImageSearch";
import { AppDispatch, RootState } from "../../redux/Store";
import { useDispatch, useSelector } from "react-redux";
import {
  incrementPage,
  setImages,
  setImagesEmpty,
} from "../../redux/reducers/InfiniteImageScrollReducer";
import useDebounce from "../../customHooks/SearchBarDebouce";
import SimpleBackdrop from "../../components/BackDrop/SimpleBackDrop";
import { ArrowUpward } from "@material-ui/icons";
import axios from "axios";

function InfinteImageScroll() {
  const images = useSelector(
    (state: RootState) => state.InfiniteImageScrollReducer.images
  );
  const term = useSelector(
    (state: RootState) => state.InfiniteImageScrollReducer.term
  );
  const page = useSelector(
    (state: RootState) => state.InfiniteImageScrollReducer.page
  );

  const debouncedSearchTerm = useDebounce(term, 1000); // default 500ms debounce delay

  const dispatch: AppDispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [fetchedData, setFetchedData] = useState([]);
  const [fetchError, setFetchError] = useState("");

  const fetchImages = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `https://pixabay.com/api/?key=32036881-8203cb8c17899aa009b2a6b68&q=${debouncedSearchTerm}&per_page=30&page=${page}&safesearch=true`
      );
      if (data?.hits?.length === 0) {
        setFetchError(`No image for ${debouncedSearchTerm}`);
      }
      if (data?.hits?.length > 0) {
        setFetchedData(data.hits);
      }
    } catch (error) {
      setFetchError(error);
    } finally {
      setIsLoading(false);
    }
  }, [debouncedSearchTerm, page]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  useEffect(() => {
    if (fetchedData.length === 0) {
      dispatch(setImagesEmpty());
    }
    if (fetchedData) {
      dispatch(setImages(fetchedData));
    }
  }, [fetchedData, dispatch]);

  const handleScroll = useCallback(() => {
    if (!isLoading) {
      if (
        window.innerHeight + window.document.documentElement.scrollTop + 1 >=
        window.document.documentElement.scrollHeight
      ) {
        // setTimeout(() => {
        dispatch(incrementPage());
        // }, 1000);
      }
    }
  }, [dispatch, isLoading]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="content">
      <SimpleBackdrop show={isLoading} />
      <ImageSearch />
      <div className="start">
        {!isLoading && images.length === 0 && fetchError !== "" ? (
          <h1>No Images of {term} found!</h1>
        ) : (
          <>{term ? <h1>Images of : {term}</h1> : <h1>Images</h1>}</>
        )}
      </div>
      {images.length > 0 && (
        <div className={css["inifite-image-container"]}>
          <ResponsiveMasonry
            columnsCountBreakPoints={{
              300: 1,
              350: 2,
              750: 3,
              900: 4,
              1200: 5,
              1500: 6,
            }}
          >
            <Masonry gutter="10px">
              {images.map((image, index) => (
                <ImageCard key={index + 1} image={image} />
              ))}
            </Masonry>
          </ResponsiveMasonry>
        </div>
      )}
      <div className="top-scroll-btn">
        <button onClick={handleScrollTop}>
          <ArrowUpward />
        </button>
      </div>
    </div>
  );
}

export default InfinteImageScroll;
