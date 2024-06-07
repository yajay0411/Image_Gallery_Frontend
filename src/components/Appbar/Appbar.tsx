import { AppBar, Grid, IconButton, Toolbar } from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import { useTheme } from "@mui/material";
import ToggleButton from "../ToggleButton/ToggleButton";
import { AppDispatch } from "../../redux/Store";
import { useDispatch } from "react-redux";
import { showMenu } from "../../redux/reducers/BaseReducer";
import { makeStyles } from "@material-ui/core/styles";
// import ResetReduxButton from "../ResetReduxButton/ResetReduxButton";

const useStyles = makeStyles(() => ({
  appBar: {
    backdropFilter: "blur(10px)", // Blur effect
    WebkitBackdropFilter: "blur(10px)", // For Safari support
  },
}));

const Appbar: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const iconColor = theme.customKey.icon.main;
  const dispatch: AppDispatch = useDispatch();

  return (
    <>
      <AppBar position="fixed" color="transparent" className={classes.appBar}>
        <div>
          <Toolbar>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={() => {
                    dispatch(showMenu());
                  }}
                >
                  <Menu style={{ color: iconColor }} />
                </IconButton>
              </Grid>
              <Grid item>
                <ToggleButton parent={"appBar"} />
              </Grid>
              {/* <Grid item>
                <ResetReduxButton />
              </Grid> */}
            </Grid>
          </Toolbar>
        </div>
      </AppBar>
    </>
  );
};

export default Appbar;
