import React, { useEffect, useState } from "react";
import { Grid, Button, Box, Select, FormControl, InputLabel } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import apiRouter from "../utils/apiRouter";
import toaster from "../utils/toaster";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import MultipleSelectChip from "../Components/multipleSelectField";
import routerConstants from "../utils/routerConstants";

const TitleStyles = {
  backgroundColor: "#fff",
  color: "#000",
  fontWeight: "800",
  display: "flex",

  fontSize: "2rem",
  marginTop: "3rem",
  marginBottom: "3rem",
};

function AddOrders() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const axios = useAxiosPrivate();
  const [sideDishes, setSideDishes] = useState([]);
  const [desserts, setDesserts] = useState([]);
  const [mainDishes, setMainDishes] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  // submit function
  const handleSubmit = async (values, onSubmitProps) => {
    try {
      setIsLoading(true);
      // concat mainDishes, sideDishes and desserts
      const fullBulk = mainDishes.concat(sideDishes, desserts).map(item => item?._id);
      // modified payload
      const payload = {
        items: fullBulk,
        totalAmount: totalPrice
      }
      const config = {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("userInfo")).accessToken}`,
        },
      };
      const result = await axios.post(apiRouter.ORDER, payload, config);
      if (result?.status === 200) {
        setMainDishes([]);
        setSideDishes([]);
        setDesserts([]);
        toaster("success", result.data.message);
        navigate(routerConstants.ORDER);
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        toaster("error", error.response.data.message);
      }
    }finally {
      setIsLoading(false);
    }
  };

  // get all items API call
  const getAllItems = async () => {
    try {
      setIsLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("userInfo")).accessToken
            }`,
        },
      };
      const result = await axios.get(apiRouter.ITEM, config);
      setItems(result?.data?.data);
    } catch (error) {
      if (error?.response?.data?.message) {
        toaster("error", error.response.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  // handle change function
  const handleChange = (event) => {
    setMainDishes([event.target.value]);
  };

  useEffect(() => {
    getAllItems();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // check if mainDishes, sideDishes or desserts are not empty
    if (mainDishes?.length > 0 || sideDishes?.length > 0 || desserts?.length > 0) {
      // concat mainDishes, sideDishes and desserts
      const fullBulk = mainDishes.concat(sideDishes, desserts);
      // call totalPriceCalculation
      totalPriceCalculation(fullBulk);
    }
  }, [mainDishes, sideDishes, desserts]);

  // total price calculation function
  const totalPriceCalculation = (array) => {
    // reduce array to get total price
    const totalPrice = array?.reduce((acc, item) => acc + item?.price, 0);
    // set total price
    setTotalPrice(totalPrice);
  }

  return (
    <>
      <Navbar />
      <Grid container justifyContent="center" sx={{ paddingTop: "70px" }}>
        <Grid container item lg={1} md={1.5} sm={1.8} xs={1}>
          <Sidebar />
        </Grid>
        <Grid container item direction="column" alignItems="center">
          <Grid item style={TitleStyles}>
            Order Details
          </Grid>
          <Grid item>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth required>
                <Box sx={{ minWidth: 400 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Main Dishes</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={mainDishes[0]?.name}
                      onChange={handleChange}
                    >
                      {items.filter((item) => item.type === "mainDishes").map((item) => (
                        <MenuItem key={item?._id} value={item}>{item?.name} - Rs.{item?.price}</MenuItem>
                      ))
                      }
                    </Select>
                  </FormControl>
                </Box>
              </FormControl>
            </Box>
          </Grid>
          <Grid item>
            <MultipleSelectChip filedName="Side dishes" names={items.filter((item) => item.type === "sideDishes")} setSideDishes={setSideDishes} sideDishes={sideDishes} />
          </Grid>
          <Grid item>
            <MultipleSelectChip filedName="Desserts" names={items.filter((item) => item.type === "desserts")} setSideDishes={setDesserts} sideDishes={desserts} />
          </Grid>
          <Grid container item direction="row" justifyContent="space-between" sx={{ marginTop: "1rem", width: { xs: "90%", md: "30%"} }} >
            <Grid item style={TitleStyles}>
              Total Price
            </Grid>
            <Grid item style={TitleStyles}>
              -
            </Grid>
            <Grid item style={TitleStyles}>
              Rs. {totalPrice} 
            </Grid>
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
              disabled={sideDishes.length === 0 || mainDishes.length === 0 || isLoading}
              onClick={() => handleSubmit()}
              size="large"
            >
              Place Order
            </Button>
          </Grid>
        </Grid>
      </Grid >
    </>
  );
}

export default AddOrders;
