import { Button, Grid, useTheme } from "@mui/material";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import {
  hideBackdrop,
  showBackdrop,
} from "../../../redux/reducers/BaseReducer";
import { Form, Formik, FormikHelpers } from "formik";
import FormikTextField from "../../../components/Form/FormikTextField";
import { Link, useNavigate } from "react-router-dom";
import css from "./Register.module.css";
import ToggleButton from "../../../components/ToggleButton/ToggleButton";
import { AuthService } from "../../../api/services/Auth.Service";
import { isLogin } from "../../../redux/reducers/AuthReducer";
import { AppDispatch } from "../../../redux/Store";

interface Register {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const INITIAL_VALUE: Register = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  };

  // The validation schema defined earlier
  const Validation_Schema = Yup.object({
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const dispatch: AppDispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = async (
    values: Register,
    actions: FormikHelpers<Register>
  ) => {
    const data = Object.assign({}, values);
    dispatch(showBackdrop());
    actions.setSubmitting(true);

    const register = await AuthService.register(data);
    if (register.status_code === 200) {
      dispatch(isLogin());
      navigate("/");
    }

    dispatch(hideBackdrop());
    actions.setSubmitting(false);
  };

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
          const { first_name, last_name, email, password } = props.values;
          return (
            <Form>
              <Grid
                container
                spacing={2}
                flexDirection={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                padding={4}
              >
                <Grid item>
                  <h2>Join Us Now !</h2>
                </Grid>
                <Grid item>
                  <FormikTextField
                    name="first_name"
                    label="First Name"
                    type="text"
                    value={first_name}
                  />
                </Grid>
                <Grid item>
                  <FormikTextField
                    name="last_name"
                    label="Last Name"
                    type="text"
                    value={last_name}
                  />
                </Grid>
                <Grid item>
                  <FormikTextField
                    name="email"
                    label="Email"
                    type="email"
                    value={email}
                  />
                </Grid>
                <Grid item>
                  <FormikTextField
                    name="password"
                    label="Password"
                    type="password"
                    value={password}
                  />
                </Grid>
                <Grid item>
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
                    <p>Already have a account</p>
                    <Link to="/auth/login">Go to Login In page</Link>
                  </div>
                </Grid>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default Register;
