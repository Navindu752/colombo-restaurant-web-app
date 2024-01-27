import React, { useState } from "react";
import {
  Grid,
  Button,
  TextField,
  CircularProgress,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { useNavigate } from "react-router-dom";
import "../styles/styles.css";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import apiRouter from "../utils/apiRouter";
import toaster from "../utils/toaster";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import routerConstants from "../utils/routerConstants";

// Yup validation
let CreateItemSchema = Yup.object().shape({
  name: Yup.string().required("Item name is required"),
  type: Yup.string().required("Item type is required"),
  price: Yup.number()
    .required("Price is required")
    .integer("Price must be an integer")
    .min(0, "Price must be greater than or equal to 0")
});

const TitleStyles = {
  backgroundColor: "#fff",
  color: "#000",
  fontWeight: "800",
  display: "flex",

  fontSize: "2rem",
  marginTop: "3rem",
  marginBottom: "3rem",
};

const fieldStyles = {
  width: { xs: 298, sm: 398 },
  marginBottom: "10px",
};

const formStyles = {
  display: "flex",
  flexDirection: "column",
};

// CustomizedSelectForFormik component
const CustomizedSelectForFormik = ({ children, form, field }) => {
  const { name, value } = field;
  const { setFieldValue } = form;

  return (
    <Select
      label="industry"
      name={name}
      value={value}
      onChange={e => {
        setFieldValue(name, e.target.value);
      }}
    >
      {children}
    </Select>
  );
};

function AddItems() {
  const [isSubmissionLoading, setSubmissionLoading] = useState(false);
  const axios = useAxiosPrivate();

  const navigate = useNavigate();
  const initialValues = {
    name: "",
    type: "",
    price: "",
  };

  // submit function
  const handleSubmit = async (e, onSubmitProps) => {
    try {
      setSubmissionLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("userInfo")).accessToken
            }`,
        },
      };
      const result = await axios.post(apiRouter.ITEM, e, config);
      if (result?.status === 200) {
        onSubmitProps.setSubmitting(false);
        onSubmitProps.resetForm();
        toaster("success", result.data.message);
        navigate(routerConstants.ORDER);
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        toaster("error", error.response.data.message);
      }
    } finally {
      setSubmissionLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <Grid container justifyContent="center" sx={{ paddingTop: "70px", marginBottom: "2rem" }}>
        <Grid container item lg={1} md={1.5} sm={1.8} xs={1}>
          <Sidebar />
        </Grid>
        <Grid container item direction="column" alignItems="center">
          <Grid item style={TitleStyles}>
            Add items
          </Grid>
          <Grid container item direction="column" alignItems="center">
            <Formik
              initialValues={initialValues}
              onSubmit={handleSubmit}
              validationSchema={CreateItemSchema}
            >
              {({ errors, isValid, touched, dirty }) => (
                <Form style={formStyles}>
                  <Grid item>
                    <Field
                      sx={fieldStyles}
                      name="name"
                      label={"Name"}
                      as={TextField}
                      variant="outlined"
                      required
                      size="small"
                      margin="dense"
                      error={Boolean(errors.name) && Boolean(touched.name)}
                      helperText={Boolean(touched.name) && errors.name}
                    ></Field>
                  </Grid>
                  <Grid item>
                    <Box sx={{ minWidth: 120 }}>
                      <FormControl fullWidth required>
                        <InputLabel
                          id="demo-simple-select-label"
                          // sx={fieldStyles}
                          name="type"
                        >
                          Category
                        </InputLabel>
                        <Field
                          component={CustomizedSelectForFormik}
                          name="type"
                          as={Select}

                          error={
                            Boolean(errors.type) && Boolean(touched.type)
                          }
                          helperText={Boolean(touched.type) && errors.type}
                        >

                          <MenuItem value="mainDishes">Main dishes</MenuItem>
                          <MenuItem value="sideDishes">Side dishes</MenuItem>
                          <MenuItem value="desserts">Desserts</MenuItem>
                        </Field>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item>
                    <Field
                      sx={fieldStyles}
                      name="price"
                      label={"Price"}
                      as={TextField}
                      variant="outlined"
                      required
                      size="small"
                      margin="dense"
                      type="number"
                      error={
                        Boolean(errors.price) &&
                        Boolean(touched.price)
                      }
                      helperText={
                        Boolean(touched.price) && errors.price
                      }
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
                      }}
                      color="primary"
                      fullWidth
                      variant="contained"
                      disabled={!dirty || !isValid || isSubmissionLoading}
                      type="submit"
                      size="large"
                    >
                      {isSubmissionLoading ?
                        <CircularProgress size={20} />
                        :
                        'Submit'
                      }

                    </Button>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default AddItems;
