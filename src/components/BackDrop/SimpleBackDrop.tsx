import React from "react";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import { Theme, useTheme } from "@mui/material";

const useStyles = makeStyles((theme: Theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 2,
  },
}));

interface SimpleBackdropProps {
  show: boolean;
}

const SimpleBackdrop: React.FC<SimpleBackdropProps> = ({ show }) => {
  const classes = useStyles();

  const theme = useTheme();
  const primary = theme.palette.primary.main;
  return (
    <Backdrop className={classes.backdrop} open={show}>
      <div style={{ color: primary }}>
        <CircularProgress color={"inherit"} size={60} thickness={4} />
      </div>
    </Backdrop>
  );
};

export default SimpleBackdrop;
