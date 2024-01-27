import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import routerConstants from "../utils/routerConstants";

const Root = styled("div")(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

function ClippedDrawer(props) {
  const navigate = useNavigate();
  const location = window.location.pathname.slice('/').split('/')[1];

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
                onClick={() => navigate(routerConstants.REPORTS)}
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
    </Drawer>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Root>
        {drawer()}
      </Root>
    </Box>
  );
}

export default ClippedDrawer;
