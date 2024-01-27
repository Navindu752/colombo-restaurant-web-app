import {
  Box,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";

import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";

import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";

import apiRouter from "../utils/apiRouter";
import toaster from "../utils/toaster";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { getCurrentDateFormatted } from "../utils/commonFunctions";

const SubTitleHeaders = {
  fontWeight: "700",
  fontSize: "1.2rem",
  marginRight: "1rem",
  display: "flex",
  alignItems: "center",
  overflow: "hidden",
};

const Reports = () => {
  const [reports, setReports] = useState(null);
  const [callback, setCallback] = useState(false);
  const axios = useAxiosPrivate();

  useEffect(() => {
    getAllReports();
    // eslint-disable-next-line
  }, []);

  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("userInfo")).accessToken}`,
    },
  };

  // get all reports API call
  const getAllReports = async () => {
    try {
      const currentDateFormattedUTC = getCurrentDateFormatted();
      const { data } = await axios.get(`${apiRouter.ORDER}/reports/${currentDateFormattedUTC}`, config);
      setReports(data.data);
    } catch (error) {
      if (error?.response?.data?.message) {
        toaster("error", error.response.data.message);
      }
    }
    finally {
      setCallback(true);
    }
  };

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
            lg={12}
            md={12}
            sm={12}
            xs={12}
            container item >

            {reports && callback ? (
              reports.length > 0 && (
                reports.map((item) => {
                  return (
                    <Grid container
                      key={item.name}
                      lg={3}
                      md={4}
                      sm={6}
                      xs={12}
                    >

                      <Box sx={{
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
                            >
                              <Typography color="primary"
                                sx={{ ...SubTitleHeaders, justifyContent: "center" }} alignItems="center">
                                {item.name}
                              </Typography>
                            </Grid>
                            <Grid item
                              lg={12}
                              md={12}
                              sm={12}
                              xs={12}
                            >
                              <Typography color="black"
                                sx={{ ...SubTitleHeaders, justifyContent: "center", marginTop: "1rem" }} alignItems="center">
                                {item.value}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Box>
                    </Grid>
                  );
                })
              )) : (
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
        </Grid>
      </Grid >
    </>
  );
};

export default Reports;
