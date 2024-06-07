import { Divider, Drawer, Grid, IconButton } from "@material-ui/core";
import css from "./Sidebar.module.css";
import Close from "@material-ui/icons/Close";
import { Link } from "react-router-dom";
import { AppDispatch } from "../../redux/Store";
import { useDispatch } from "react-redux";
import { hideMenu } from "../../redux/reducers/BaseReducer";
import { makeStyles } from "@material-ui/core/styles";

interface MyComponentProps {
  open: boolean;
}

const useStyles = makeStyles(() => ({
  aside: {
    background: "none",
    backdropFilter: "blur(10px)",
    overflow: "hidden",
  },
}));

const Sidebar: React.FC<MyComponentProps> = ({ open }) => {
  const dispatch: AppDispatch = useDispatch();
  const handleOnClose = () => {
    dispatch(hideMenu());
  };

  const classes = useStyles();

  return (
    <>
      <Drawer
        anchor="left"
        open={open}
        onClose={handleOnClose}
        className={css["sidebar-wrapper"]}
        classes={{ paper: classes.aside }}
      >
        <div className={css["sidebar"]}>
          <Grid
            container
            spacing={2}
            direction="column"
            justifyContent="center"
          >
            <div className={css["side-bar-header"]}>
              <Grid item>Logo</Grid>
              <Grid item>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleOnClose}
                  style={{ color: "white" }}
                >
                  <Close />
                </IconButton>
              </Grid>
            </div>
            <Divider />

            {/* Dashboard */}
            <Link to={"/"} className={css["menu-item"]} onClick={handleOnClose}>
              <div className={css["menu-item-wrapper"]}>
                <Grid item>Dashboard</Grid>
              </div>
            </Link>
            <Divider />

            {/* Profile */}
            <Link
              to={"/profile"}
              className={css["menu-item"]}
              onClick={handleOnClose}
            >
              <div className={css["menu-item-wrapper"]}>
                <Grid item>Profile</Grid>
              </div>
            </Link>
            <Divider />

            {/* Profile */}
            <Link
              to={"/infinite-image"}
              className={css["menu-item"]}
              onClick={handleOnClose}
            >
              <div className={css["menu-item-wrapper"]}>
                <Grid item>IniteScrollImage</Grid>
              </div>
            </Link>
            <Divider />
          </Grid>
        </div>
      </Drawer>
    </>
  );
};

export default Sidebar;
