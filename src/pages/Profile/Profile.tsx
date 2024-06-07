import React from "react";
import { Typography, Avatar, Grid, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/Store";

const Profile: React.FC = () => {
  const mode = useSelector((state: RootState) => state.ThemeReducer.mode);
  return (
    <>
      <div
        className={`content ${
          mode === "dark" ? "content-dark" : "content-light"
        } `}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            {/* <Paper className={""} elevation={3}> */}
            <Grid container direction="column" alignItems="start" spacing={2}>
              <Grid item>
                <Avatar
                  alt="Profile Picture"
                  src="https://via.placeholder.com/150"
                  className={""}
                />
              </Grid>
              <Grid item>
                <Typography variant="h5">John Doe</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">johndoe@example.com</Typography>
              </Grid>
              <Grid item>
                <Button variant="contained" color="primary" className={""}>
                  Edit Profile
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" color="primary" className={""}>
                  Log Out
                </Button>
              </Grid>
            </Grid>
            {/* </Paper> */}
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Profile;
