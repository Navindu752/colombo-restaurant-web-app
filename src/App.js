import React, { Suspense } from "react";
import "./App.css";
import SignIn from "./Pages/SignIn";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import NotFound from "./Components/NotFound";
import PermissionDenied from "./Components/PermissionDenied";
import { routes } from "./routes";
import ProtectedRoute from "./common/ProtectedRoute";
import Loader from "./utils/loader";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Orders from "./Pages/Orders";
import routerConstants from "./utils/routerConstants";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0066B2",
    },
    secondary: {
      main: "#009E60",
    },
  },
  typography: {
    fontFamily: ["Manrope", "sans-serif"].join(","),
    fontSize: 14,
  },
});

function App() {
  const id = JSON.parse(localStorage.getItem("userInfo"));
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Suspense
        fallback={
          <div>
            <Loader />
          </div>
        }
      >
        <BrowserRouter>
          <Routes>
            {id ? (
              <Route path={routerConstants.ORDER} element={<Orders />} />
            ) : (
              <Route path={routerConstants.SIGN_IN} element={<SignIn />} />
            )}
            <Route path={routerConstants.SIGN_IN} element={<SignIn />} />
            <Route path="*" element={<NotFound />} />
            <Route
              path={routerConstants.PERMISSION_DENIED}
              exact
              element={<PermissionDenied />}
            />
            {routes.map(({ element, path, name }) => (
              <Route
                key={name}
                path={path}
                element={<ProtectedRoute element={element} />}
              />
            ))}
          </Routes>
        </BrowserRouter>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
