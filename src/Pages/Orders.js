import {
  Box,
  Button,
  Chip,
  Grid,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import CheckIcon from "@mui/icons-material/Check";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import ListAltRoundedIcon from '@mui/icons-material/ListAltRounded';
import apiRouter from "../utils/apiRouter";
import toaster from "../utils/toaster";
import { getDateFormate } from "../utils/commonFunctions";
import routerConstants from "../utils/routerConstants";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const SubTitleHeaders = {
  fontWeight: "700",
  fontSize: "1.2rem",
  marginRight: "1rem",
  display: "flex",
  alignItems: "center",
  overflow: "hidden",
};


const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState(null);
  const [callback, setCallback] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [count, setCount] = useState(10);
  const axios = useAxiosPrivate();

  // pagination handler function
  const handlePageChange = (event, value) => {
    setPageNumber(value);
  };

  useEffect(() => {
    getAllOrders();
    // eslint-disable-next-line
  }, [pageNumber]);

  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("userInfo")).accessToken}`,
    },
  };

  // get all orders API call
  const getAllOrders = async () => {
    try {
      setCallback(false)
      const { data } = await axios.get(`${apiRouter.ORDER}?page_number=${pageNumber}`, config);
      setOrders(data.data);
    } catch (error) {
      if (error?.response?.data?.message) {
        toaster("error", error.response.data.message);
      }
    }
    finally {
      setCallback(true);
    }
  };

  // get total page count
  const getTotalPageCount = async () => {
    try {
      setCallback(false)
      const { data } = await axios.get(`${apiRouter.ORDER}/pageCount`, config)
      setCount(data)
    } catch (error) {
      if (error?.response?.data?.message) {
        toaster("error", error.response.data.message);
      }
    } finally {
      setCallback(true)
    }
  };

  useEffect(() => {
    getTotalPageCount();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Navbar />
      <Grid container lg={12}>
        <Grid container item lg={1} md={1.5} sm={1.8} xs={1}>
          <Sidebar />
        </Grid>

        <Grid
          container
          item
          marginTop={10}
          marginBottom={5}
          lg={10.5}
          md={9.8}
          sm={10}
          xs={10}
        >
          <Grid
            container
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            justifyContent={{
              lg: "flex-end",
              md: "flex-end",
              sm: "flex-end",
              xs: "center",
            }}
            marginBottom={{
              lg: "1rem",
              md: "1rem",
              sm: "1rem",
              xs: "1rem",
            }}
            marginTop={{
              lg: "-1rem",
              md: "-0.5rem",
              sm: "-0.5rem",
              xs: "-0.5rem",
            }}
          >
            <Button
              color="secondary"
              onClick={() => navigate(routerConstants.ADD_ITEM)}
              variant="contained" sx={{
                borderRadius: "8px",
                textTransform: "none",
                marginLeft: {
                  lg: "1rem",
                  md: "1rem",
                  sm: "1rem",
                  xs: "0.5rem",
                },
                marginRight: {
                  lg: "0rem",
                  md: "0rem",
                  sm: "0rem",
                  xs: "0.5rem",
                },
                marginTop: {
                  lg: "1rem",
                  md: "1rem",
                  sm: "1rem",
                  xs: "1rem",
                },
                marginBottom: {
                  lg: "1rem",
                  md: "1rem",
                  sm: "1rem",
                  xs: "1rem",
                },
              }}>
              Add Items
            </Button>
            <Button
              color="primary"
              variant="contained"
              sx={{
                borderRadius: "8px",
                textTransform: "none",
                marginLeft: {
                  lg: "1rem",
                  md: "1rem",
                  sm: "1rem",
                  xs: "0.5rem",
                },
                marginRight: {
                  lg: "0rem",
                  md: "0rem",
                  sm: "0rem",
                  xs: "0.5rem",
                },
                marginTop: {
                  lg: "1rem",
                  md: "1rem",
                  sm: "1rem",
                  xs: "1rem",
                },
                marginBottom: {
                  lg: "1rem",
                  md: "1rem",
                  sm: "1rem",
                  xs: "1rem",
                },
              }}
              onClick={() => navigate(routerConstants.ADD_ORDER)}
            >
              Add a Order
            </Button>
          </Grid>

          <Grid
            lg={12}
            md={12}
            sm={12}
            xs={12}
            container item >

            {orders && callback ? (
              orders.length > 0 ? (
                orders.map((project) => {
                  return (
                    <Grid container
                      key={project.name}
                      lg={3}
                      md={4}
                      sm={6}
                      xs={12}
                    >

                      <Box sx={{
                        cursor: "pointer",
                        width: "98%",
                        height: "96%"
                      }}

                        border={1}
                        borderRadius="8px"
                        padding={2}>
                        <Grid container >
                          <Grid item container
                            alignItems="center"
                            justifyContent="center"
                          >
                            <Grid item
                              lg={12}
                              md={12}
                              sm={12}
                              xs={12}
                              sx={{ display: "flex", justifyContent: "space-between" }}
                            >
                              <Typography color="primary"
                                sx={SubTitleHeaders} alignItems="center">
                                <ListAltRoundedIcon fontSize="medium" sx={{ marginRight: "0.3rem" }} />
                                INV {project.invoiceNumber}
                              </Typography>
                              <Typography color="primary"
                                sx={SubTitleHeaders} alignItems="center">
                                {getDateFormate(project.createdAt)}
                              </Typography>
                            </Grid>
                            <Grid container height={"5rem"} sx={{ overflowY: "auto", mt: 1 }}>
                              {project.items.map((item) => {
                                return (
                                  <>
                                    <Grid item
                                      lg={6}
                                      md={6}
                                      sm={6}
                                      xs={6}
                                    >
                                      <List dense disablePadding disableGutters>
                                        <ListItem
                                          disablePadding
                                          disableGutters
                                          sx={{ display: "list-item" }}
                                        >
                                          <Typography
                                            sx={{ fontSize: "0.75rem", lineHeight: "1.3rem", height: "1rem" }}
                                            className="projectPara"
                                          >
                                            {item?.name}
                                          </Typography>
                                        </ListItem>
                                      </List>
                                    </Grid>
                                    <Grid item
                                      lg={1}
                                      md={1}
                                      sm={1}
                                      xs={1}
                                    >
                                      <List dense disablePadding disableGutters>
                                        <ListItem
                                          disablePadding
                                          disableGutters
                                          sx={{ display: "list-item" }}
                                        >
                                          <Typography
                                            sx={{ fontSize: "0.75rem", lineHeight: "1.3rem", height: "1rem" }}
                                            className="projectPara"
                                          >
                                            -
                                          </Typography>
                                        </ListItem>
                                      </List>
                                    </Grid>
                                    <Grid item
                                      lg={5}
                                      md={5}
                                      sm={5}
                                      xs={5}
                                    >
                                      <List dense disablePadding disableGutters>
                                        <ListItem
                                          disablePadding
                                          disableGutters
                                          sx={{ display: "list-item" }}
                                        >
                                          <Typography
                                            sx={{ fontSize: "0.75rem", lineHeight: "1.3rem", height: "1rem" }}
                                            className="projectPara"
                                          >
                                            Rs. {item?.price}
                                          </Typography>
                                        </ListItem>
                                      </List>
                                    </Grid>
                                  </>
                                )
                              })}
                            </Grid>

                            <Grid item
                              lg={12}
                              md={12}
                              sm={12}
                              xs={12}
                            >
                              <List dense disablePadding disableGutters>
                                <ListItem
                                  disablePadding
                                  disableGutters
                                  sx={{ display: "list-item" }}
                                >
                                  <Typography
                                    sx={{ fontSize: "0.75rem", lineHeight: "1.3rem", fontWeight: "bold", marginTop: "1rem" }}
                                    className="projectPara"
                                  >
                                    Total Bill Amount - Rs.{project.totalAmount}
                                  </Typography>
                                </ListItem>
                              </List>
                            </Grid>

                            <Grid item
                              lg={12}
                              md={12}
                              sm={12}
                              xs={12}
                            >
                              <Chip
                                sx={{
                                  fontSize: "0.7rem",
                                  marginRight: "1rem",
                                  padding: "15px 10px 15px 10px",
                                  marginTop: "20px",
                                  marginBottom: "0.5rem",
                                }}
                                size="small"
                                label="Paid"
                                color="success"
                                icon={
                                  <CheckIcon />
                                }
                              />
                            </Grid>

                          </Grid>

                        </Grid>
                      </Box>
                    </Grid>
                  );
                })
              ) : (
                <Grid
                  item
                  container
                  alignItems="center"
                  justifyContent="center"
                  style={{ height: "60vh" }}
                >
                  <Grid item>
                    <Typography variant="h4" fontWeight="900">
                      You have no orders
                    </Typography>
                  </Grid>
                </Grid>
              )
            ) : (
              <Grid
                item
                container
                alignItems="center"
                justifyContent="center"
                style={{ height: "60vh" }}
              >
                <Grid item>
                  <CircularProgress />
                </Grid>
              </Grid>
            )}
          </Grid>
          {count > 1 ?
            <Grid xs={12}
              sm={12}
              md={12}
              lg={12} container justifyContent={"center"}/*  sx={{ marginTop: { xs: 1 } }} */>
              {callback ?
                <Stack spacing={2}>
                  <Pagination
                    count={count}
                    page={pageNumber}
                    onChange={handlePageChange}
                    variant="outlined"
                    shape="rounded"
                    style={{
                      transform: "scale(0.8)",
                    }}
                  />
                </Stack> : <p>Loading...</p>}
            </Grid> : null}
        </Grid>
      </Grid >
    </>
  );
};

export default Orders;
