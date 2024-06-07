import "./index.css";
import React from "react";
import App from "./App.tsx";
import { store, persistor } from "./redux/Store.ts";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { IconButton } from "@mui/material";
import CloseIcon from "@material-ui/icons/Close";
import { SnackbarProvider, useSnackbar } from "notistack";
import { BrowserRouter as Router } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
    <>
      <SnackbarProvider
        maxSnack={2}
        autoHideDuration={5000}
        disableWindowBlurListener={true}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        action={(key) => <CloseButton id={key as number} />}
      >
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Router>
              <App />
            </Router>
          </PersistGate>
        </Provider>
      </SnackbarProvider>
    </>
  // </React.StrictMode>
);

//close button for snackbar
export const CloseButton = ({ id }: { id: number }) => {
  const { closeSnackbar } = useSnackbar();
  return (
    <IconButton
      aria-label="Close notification"
      color="inherit"
      onClick={() => closeSnackbar(id)}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );
};
