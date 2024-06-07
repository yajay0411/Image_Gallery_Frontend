import { IconButton } from "@material-ui/core";
import { Brightness4, Brightness7 } from "@material-ui/icons";
import React from "react";
import { useDispatch } from "react-redux";
import { toggleTheme } from "../../redux/reducers/ThemeReducer";
import { useTheme } from "@mui/material";
import { AppDispatch } from "../../redux/Store";

interface MyComponentProps {
  parent: string;
}

const ToggleButton: React.FC<MyComponentProps> = ({ parent }) => {
  const dispatch: AppDispatch = useDispatch();

  const theme = useTheme();
  const themeMode = theme.palette.mode; // Accessing the current theme mode
  const iconColor = theme.customKey.icon.main;

  const appbar_css_class = parent === "appBar" ? "" : "theme-toggle-absolute";

  return (
    <div className={`${appbar_css_class}`}>
      <IconButton
        onClick={() => {
          dispatch(toggleTheme());
        }}
      >
        {themeMode === "light" ? (
          <Brightness4 style={{ color: iconColor }} />
        ) : (
          <Brightness7 style={{ color: iconColor }} />
        )}
      </IconButton>
    </div>
  );
};

export default ToggleButton;
