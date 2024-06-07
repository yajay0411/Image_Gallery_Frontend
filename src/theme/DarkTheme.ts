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
export const darkThemeSettings:ThemeOptions = {
  customKey: {
    headerColor: "#caeeb9",
    icon: { main: "#ffffff" },
  },
  palette: {
    mode: "dark",
    ...{
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
            color: "white", // Set your desired color
          },
          "& label": {
            // Optionally, you can also change the label color
            color: "white",
          },
          "&:hover  label": {
            // Optionally, you can also change the label color
            color: "white",
          },
          "& .MuiOutlinedInput-root": {
            // Targeting the outline border color
            "& fieldset": {
              color: "white",
            },
            "&:hover fieldset": {
              color: "white",
            },
            "& .Mui-focused fieldset": {
              color: "white",
            },
            "input:-internal-autofill-selected": {
              WebkitBoxShadow: `0 0 0 100px #25282F inset`,
            },
          },
        },
      },
    },
  },
};
