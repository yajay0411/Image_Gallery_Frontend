import { PaletteMode } from "@mui/material";
import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    customKey: {
      headerColor: string;
      icon: {
        main: string;
      };
    };
  }
  interface ThemeOptions {
    customKey?: {
      headerColor?: string;
      icon?: {
        main?: string;
      };
    };
  }
}

// mui theme settings
export const themeSettings = (mode: PaletteMode) =>
  createTheme({
    customKey: {
      headerColor: mode === "light" ? "#caeeb9" : "#caeeb9",
      icon: { main: mode === "light" ? "#000000" : "#ffffff" },
    },
    palette: {
      mode,
      ...(mode === "light"
        ? {
            // palette values for light mode
            primary: { main: "#caeeb9" },
            secondary: { main: "#cca3ff" },
            background: {
              default: "#eff0ff",
              paper: "#f3f6f4",
            },
            text: {
              primary: "#2e2e2e",
              secondary: "#555555",
            },
          }
        : {
            // palette values for dark mode
            primary: { main: "#caeeb9" },
            secondary: { main: "#cca3ff" },
            background: {
              default: "#25282F",
              paper: "#e5d0ff",
            },
            text: {
              primary: "#eeeeee",
              secondary: "#555555",
            },
          }),
    },
    typography: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            "& input": {
              // Targeting the input element specifically
              color: mode === "light" ? "black" : "white", // Set your desired color
            },
            "& label": {
              // Optionally, you can also change the label color
              color: mode === "light" ? "black" : "white",
            },
            "&:hover  label": {
              // Optionally, you can also change the label color
              color: mode === "light" ? "black" : "white",
            },
            "& .MuiOutlinedInput-root": {
              // Targeting the outline border color
              "& fieldset": {
                color: mode === "light" ? "black" : "white",
              },
              "&:hover fieldset": {
                color: mode === "light" ? "black" : "white",
              },
              "& .Mui-focused fieldset": {
                color: mode === "light" ? "black" : "white",
              },
              "input:-internal-autofill-selected": {
                WebkitBoxShadow: `0 0 0 100px ${
                  mode === "light" ? "#eff0ff" : "#25282F"
                } inset`,
              },
            },
          },
        },
      },
    },
  });
