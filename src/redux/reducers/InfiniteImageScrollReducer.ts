import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ImageDetails {
  likes?: number;
  downloads?: number;
  views?: number;
  webformatURL?: string;
  user?: string;
  userImageURL?: string;
  largeImageURL?: string;
  tags?: string;
}

interface InfiniteImageScrollReducerState {
  images: Array<ImageDetails>;
  term: string;
  page: number;
  scrollHeight: number;
}

const initialState: InfiniteImageScrollReducerState = {
  images: [],
  term: "",
  page: 1,
  scrollHeight: 0,
};

const InfiniteImageScrollReducerSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setImages: (state, action: PayloadAction<[ImageDetails]>) => {
      state.images = [...state.images, ...action.payload];
    },
    setImagesEmpty: (state) => {
      state.images = [];
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.term = action.payload;
    },
    clearSearchTerm: (state) => {
      state.term = "";
    },
    incrementPage: (state) => {
      state.page = state.page + 1;
    },
    decrementPage: (state) => {
      state.page = state.page - 1;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    resetState: () => initialState,
  },
});

export const {
  setImages,
  setImagesEmpty,
  setSearchTerm,
  clearSearchTerm,
  incrementPage,
  decrementPage,
  setPage,
  resetState,
} = InfiniteImageScrollReducerSlice.actions;

export default InfiniteImageScrollReducerSlice.reducer;
