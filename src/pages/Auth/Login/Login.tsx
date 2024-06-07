import { Button, Grid, useTheme } from "@mui/material";
import * as Yup from "yup";
import css from "./Login.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import { enqueueSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import {
  hideBackdrop,
  showBackdrop,
} from "../../../redux/reducers/BaseReducer";
import FormikTextField from "../../../components/Form/FormikTextField";
import { Form, Formik, FormikHelpers } from "formik";
import { Box } from "@material-ui/core";
import ToggleButton from "../../../components/ToggleButton/ToggleButton";
import { AuthService } from "../../../api/services/Auth.Service";
import { enqueueSnackbar } from "notistack";
import { isLogin } from "../../../redux/reducers/AuthReducer";
import { AppDispatch } from "../../../redux/Store";

interface Login {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const INITIAL_VALUE: Login = {
    email: "",
    password: "",
  };

  const dispatch: AppDispatch = useDispatch();

  const navigate = useNavigate();

  const location = useLocation();
  // Access the state passed during redirection
  const fromPath = location.state?.from || "/"; // Default to root if no state

  // The validation schema defined earlier
  const Validation_Schema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values: Login, actions: FormikHelpers<Login>) => {
    const data = Object.assign({}, values);
    dispatch(showBackdrop());
    actions.setSubmitting(true);

    const login = await AuthService.login(data);

    console.log(login);

    if (login.status_code === 200) {
      dispatch(isLogin());
      navigate(fromPath);
    }

    if (login.status_code === 400) {
      enqueueSnackbar(login.message, { variant: "error" });
    }

    dispatch(hideBackdrop());
    actions.setSubmitting(false);
  };
  // const theme = useTheme();
  const theme = useTheme();
  const themeMode = theme.palette.mode; // Accessing the current theme mode

  return (
    <>
      <ToggleButton parent={"auth"} />
      <Formik
        initialValues={INITIAL_VALUE}
        validationSchema={Validation_Schema}
        enableReinitialize={true}
        validateOnMount={true}
        onSubmit={handleSubmit}
      >
        {(props) => {
          const { email, password } = props.values;
          return (
            <Form>
              <Box color="white">
                <Grid
                  container
                  spacing={2}
                  flexDirection={"column"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  padding={4}
                >
                  <Grid item>
                    <h2>Welcome Back !</h2>
                  </Grid>
                  <Grid item xs={12}>
                    <FormikTextField
                      name="email"
                      label="Email"
                      type="email"
                      value={email}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormikTextField
                      name="password"
                      label="Password"
                      type="password"
                      value={password}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth={true}
                    >
                      Login
                    </Button>
                  </Grid>

                  <Grid item>
                    <div
                      className={`${css["redirect-link"]} ${
                        themeMode === "light"
                          ? `${css["redirect-link-light"]}`
                          : `${css["redirect-link-dark"]}`
                      }`}
                    >
                      <p>Don't have a account,</p>
                      <Link to="/auth/register">Go to Register page</Link>
                    </div>
                  </Grid>
                </Grid>
              </Box>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default Login;
