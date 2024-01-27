import * as React from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import { Typography, Grid, } from "@mui/material";

const SimpleNavBar = () => {
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
                <Toolbar >
                    <Grid container justifyContent="center">
                        <Grid item>
                            <Typography variant="h6">Colombo Restaurant</Typography>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default SimpleNavBar
