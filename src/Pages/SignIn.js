import React, { useState } from "react";
import {
  Grid,
  Button,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import SimpleNavBar from "../Components/SimpleNavBar"
import toaster from "../utils/toaster";
import apiRouter from "../utils/apiRouter";
import routerConstants from "../utils/routerConstants";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const TitleStyles = {
  backgroundColor: "#fff",
  color: "#000",
  fontWeight: "800",
  display: "flex",
  fontSize: "2rem",
  marginTop: "5rem",
  marginBottom: "3rem",
};

const SubTitleHeaders = {
  fontWeight: "600",
  fontSize: "1rem",
};

const fieldStyles = {
  width: { xs: 315, sm: 398 },
  marginBottom: "10px",
};

const formStyles = {
  display: "flex",
  flexDirection: "column",
};

let initialValues = {
  userName: "",
  password: "",
};

let SignInSchema = Yup.object().shape({
  userName: Yup.string().required("User name is required!"),
  password: Yup.string().matches(
    /(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$/,
    "Password must include one uppercase letter, one lowercase letter, one number, one special character and be at least 8 characters long!"
  ).required("Password is required!"),
});

function SignIn(props) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const axios = useAxiosPrivate();

  // sign in API call
  const getData = async (e) => {
    try {
      setIsLoading(true);
      const result = await axios.post(apiRouter.SIGN_IN, e);
      if (result?.status === 200) {
        localStorage.setItem("accessToken", result.data.data.accessToken);
        localStorage.setItem("userInfo", JSON.stringify(result.data.data));
        toaster("success", result.data.message);
        navigate(routerConstants.ORDER);
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        toaster("error", error.response.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Grid container justifyContent="center">
      <SimpleNavBar />
      <Grid item style={TitleStyles}>
        Sign In
      </Grid>
      <Grid
        container
        item
        direction="column"
        alignItems="center"
      >
        <Formik
          initialValues={initialValues}
          onSubmit={getData}
          validationSchema={SignInSchema}
        >
          {({ errors, isValid, touched, dirty }) => (
            <Form style={formStyles}>
              <Typography color="primary" style={SubTitleHeaders}>
                Log in to your account
              </Typography>

              <Grid item>
                <Field
                  sx={fieldStyles}
                  name="userName"
                  label="User Name"
                  as={TextField}
                  variant="outlined"
                  required
                  size="small"
                  margin="dense"
                  error={Boolean(errors.userName) && Boolean(touched.userName)}
                  helperText={Boolean(touched.userName) && errors.userName}
                ></Field>
              </Grid>

              <Grid item>
                <Field
                  sx={fieldStyles}
                  name="password"
                  label="Password"
                  as={TextField}
                  variant="outlined"
                  type="password"
                  required
                  size="small"
                  margin="dense"
                  error={Boolean(errors.password) && Boolean(touched.password)}
                  helperText={Boolean(touched.password) && errors.password}
                ></Field>
              </Grid>

              <Grid item>
                <Button
                  sx={{
                    borderRadius: "8px",
                    fontSize: "1rem",
                    fontWeight: "700",
                    height: "2.5rem",
                    marginTop: "1rem",
                    marginBottom: "1rem",
                  }}
                  color="primary"
                  fullWidth
                  variant="contained"
                  disabled={!dirty || !isValid || isLoading}
                  type="submit"
                  size="large"
                >
                  {isLoading ?
                    <CircularProgress size={20} />
                    :
                    'Sign In'
                  }

                </Button>
              </Grid>
            </Form>
          )}
        </Formik>
      </Grid>
    </Grid>
  );
}

export default SignIn;
