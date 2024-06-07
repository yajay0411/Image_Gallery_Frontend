import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import BaseReducer from "./reducers/BaseReducer";
import ThemeReducer from "./reducers/ThemeReducer";
import AuthReducer from "./reducers/AuthReducer";
import InfiniteImageScrollReducer from "./reducers/InfiniteImageScrollReducer";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  BaseReducer,
  AuthReducer,
  ThemeReducer,
  InfiniteImageScrollReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

const resetPersistedState = async () => {
  try {
    await persistor.purge();
    console.log("Persisted state has been reset.");
  } catch (error) {
    console.error("Error resetting persisted state:", error);
  }
};

export { store, persistor, resetPersistedState };
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
