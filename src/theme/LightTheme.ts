import { ThemeOptions } from "@mui/material";

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
export const lightThemeSettings: ThemeOptions = {
  customKey: {
    headerColor: "#caeeb9",
    icon: { main: "#000000" },
  },
  palette: {
    mode: "light",
    ...{
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
    },
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
            color: "black", // Set your desired color
          },
          "& label": {
            // Optionally, you can also change the label color
            color: "black",
          },
          "&:hover  label": {
            // Optionally, you can also change the label color
            color: "black",
          },
          "& .MuiOutlinedInput-root": {
            // Targeting the outline border color
            "& fieldset": {
              color: "black",
            },
            "&:hover fieldset": {
              color: "black",
            },
            "& .Mui-focused fieldset": {
              color: "black",
            },
            "input:-internal-autofill-selected": {
              WebkitBoxShadow: `0 0 0 100px #eff0ff  inset`,
            },
          },
        },
      },
    },
  },
};
