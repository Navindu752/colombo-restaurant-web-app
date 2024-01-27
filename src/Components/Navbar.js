import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Button, Grid, IconButton, Stack, styled } from "@mui/material";
import {
  useNavigate
} from "react-router-dom";
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import apiRouter from "../utils/apiRouter";
import routerConstants from "../utils/routerConstants";

const RootSm = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));

function ClippedDrawer() {
  const navigate = useNavigate();
  const location = window.location.pathname.slice(1);
  const [state, setState] = React.useState(false);
  const axios = useAxiosPrivate();
  const id = JSON.parse(localStorage.getItem("userInfo"))._id;
  
  // logout function
  const logout = async () => {
    try {
      const res = await axios.put(apiRouter.SIGN_OUT, { id: id });
      if (res.status === 200) {
        localStorage.clear();
        navigate(routerConstants.SIGN_IN);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // drawer function
  const toggleDrawer = (e) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState(e);
  };

  const drawer = () => (
    <Drawer
      open={false}
      variant="permanent"
      sx={{
        width: 80,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 80,
          boxSizing: "border-box",
          background: "#0066B2",
          display: "flex",
          alignItems: "center",
        },
      }}
    >
      <Toolbar />
      <Box>
        <List sx={{ background: "#0066B2" }}>
          {location === "orders" ? (
            <ListItem sx={{ width: 70, background: "#fff" }} disablePadding>
              <ListItemButton
                sx={{ display: "flex", flexDirection: "column" }}
                onClick={() => navigate(routerConstants.ORDER)}
              >
                <ListItemIcon sx={{ justifyContent: "center" }}>
                  <AssignmentRoundedIcon
                    sx={{ fontSize: 30, color: "#000" }}
                  />
                </ListItemIcon>
                <ListItemText>
                  <Typography sx={{ color: "#000", fontSize: "0.7rem" }}>
                    Orders
                  </Typography>
                </ListItemText>
              </ListItemButton>
            </ListItem>
          ) : (
            <ListItem sx={{ width: 70 }} disablePadding>
              <ListItemButton
                sx={{ display: "flex", flexDirection: "column" }}
                onClick={() => navigate(routerConstants.ORDER)}
              >
                <ListItemIcon sx={{ justifyContent: "center" }}>
                  <AssignmentRoundedIcon
                    sx={{ fontSize: 30, color: "white" }}
                  />
                </ListItemIcon>
                <ListItemText>
                  <Typography sx={{ color: "#fff", fontSize: "0.7rem" }}>
                    Orders
                  </Typography>
                </ListItemText>
              </ListItemButton>
            </ListItem>
          )}

          <Divider sx={{ background: "white" }} />

          {location === "reports" ? (
            <ListItem sx={{ width: 70, background: "#fff" }} disablePadding>
              <ListItemButton
                sx={{ display: "flex", flexDirection: "column" }}
                onClick={() => navigate(routerConstants.REPORTS)}
              >
                <ListItemIcon sx={{ justifyContent: "center" }}>
                  <WorkRoundedIcon sx={{ fontSize: 30, color: "#000" }} />
                </ListItemIcon>
                <ListItemText sx={{ justifyContent: "center" }}>
                  <Typography
                    sx={{
                      color: "#000",
                      fontSize: "0.7rem",
                      textAlign: "center",
                    }}
                  >
                    Reports
                  </Typography>
                </ListItemText>
              </ListItemButton>
            </ListItem>
          ) : (
            <ListItem sx={{ width: 70 }} disablePadding>
              <ListItemButton
                sx={{ display: "flex", flexDirection: "column" }}
                onClick={() => navigate("/reports")}
              >
                <ListItemIcon sx={{ justifyContent: "center" }}>
                  <WorkRoundedIcon sx={{ fontSize: 30, color: "white" }} />
                </ListItemIcon>
                <ListItemText sx={{ justifyContent: "center" }}>
                  <Typography
                    sx={{
                      color: "#fff",
                      fontSize: "0.7rem",
                      textAlign: "center",
                    }}
                  >
                    Reports
                  </Typography>
                </ListItemText>
              </ListItemButton>
            </ListItem>
          )}

          <Divider sx={{ background: "white" }} />
        </List>
      </Box>
    </Drawer >
  );

  const list = () => (
    <Box
      sx={{ width: "top" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      {drawer()}
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background: "#0066B2",
        }}
      >
        <Toolbar>
          <RootSm>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              style={{ marginRight: "15px" }}
            >{state ? <ArrowBackIcon onClick={toggleDrawer(false)} /> : <MenuIcon onClick={toggleDrawer(true)} />
              }
              <Drawer open={state} onClose={toggleDrawer(false)}>
                {list()}
              </Drawer>
            </IconButton>
          </RootSm>
          <Typography
            variant="h4"
            noWrap
            component="div"
            fontWeight="800"
            sx={{
              flexGrow: 1,
            }}
          >
            <Typography variant="h6">Colombo Restaurant</Typography>
          </Typography>
          <Grid>
            <Stack direction="row" spacing={2} height="2rem">
              <Button
                color="inherit"
                onClick={logout}
                sx={{
                  ":hover": {
                    bgcolor: "white", // theme.palette.primary.main
                    color: "black",
                  },
                  textTransform: "none",
                }}
              >
                Logout
              </Button>
            </Stack>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default ClippedDrawer;
