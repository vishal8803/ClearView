import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Button, Grid } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { ServerURL } from "../FetchAllServices";
import { Divider } from "@mui/material";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { Remove } from "@material-ui/icons";

export default function MyCart(props) {
  const [refresh, setRefresh] = useState(false);

  var productInCart = useSelector((state) => state.cart);
  var keys = Object.keys(productInCart);
  var products = Object.values(productInCart);
  var dispatch = useDispatch();
  var values = Object.values(productInCart);

  var totalPriceWithoutDiscount = values.reduce(
    calculatePriceWithoutDiscount,
    0
  );

  function calculatePriceWithoutDiscount(a, b) {
    var actualPrice = b.data.price * b.data.value;
    return a + actualPrice;
  }

  var totalPriceWithDiscount = values.reduce(calculatePriceWithDiscount, 0);

  function calculatePriceWithDiscount(a, b) {
    var actualPrice =
      b.data.offerprice > 0
        ? b.data.offerprice * b.data.value
        : b.data.price * b.data.value;
    return a + actualPrice;
  }

  const increseValue = (item) => {
    if (item.data.value + 1 <= item.data.stock) {
      item.data.value = item.data.value + 1;
      var value = item.data.value;
      var data = item.data;
      dispatch({
        type: "ADD_CART",
        payload: [item.data.finalproductid, { data, value }],
      });
      setRefresh(!refresh);
    }
  };

  const decreaseValue = (item) => {
    if (parseInt(item.data.value) - 1 == 0) {
      dispatch({ type: "REMOVE_CART", payload: [item.data.finalproductid] });
      setRefresh(!refresh);
    } else {
      item.data.value = item.data.value - 1;
      var value = item.data.value;
      var data = item.data;
      dispatch({
        type: "ADD_CART",
        payload: [item.data.finalproductid, { data, value }],
      });
      setRefresh(!refresh);
    }
  };

  const cartItems = () => {
    return products.map((item, index) => {
      var ite = JSON.stringify(item);
      return (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              margin: 20,
            }}
          >
            <div
              style={{ display: "flex", flexDirection: "column", width: "50%" }}
            >
              <img src={`${ServerURL}/images/${item.data.picture}`} />
              <span style={{ margin: 10, fontWeight: 700 }}>
                {item.data.productname} ({" "}
                <span style={{ color: item.data.colorname }}>
                  {item.data.colorname}{" "}
                </span>{" "}
                )
              </span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <span style={{ fontWeight: 700 }}>
                &#8377;{" "}
                {item.data.offerprice == 0
                  ? item.data.price
                  : item.data.offerprice}{" "}
                x {item.data.value}
              </span>
              <span style={{ marginTop: 10 }}>
                {" "}
                {item.data.offerprice > 0 ? (
                  <span style={{ color: "green", fontWeight: "bolder" }}>
                    {" "}
                    You save &#8377;{" "}
                    {(item.data.price - item.data.offerprice) * item.data.value}
                  </span>
                ) : (
                  <span style={{ color: "red", fontWeight: "bolder" }}>
                    No Offer
                  </span>
                )}
              </span>
              <div style={{ display: "flex", marginTop: 20, marginLeft: 6 }}>
                <Fab
                  size="small"
                  color="secondary"
                  aria-label="add"
                  boxShadow="0"
                  style={{ backgroundColor: "#50526e", boxShadow: 0 }}
                  variant="circular"
                  onClick={() => increseValue(item)}
                >
                  <AddIcon />
                </Fab>
                <div
                  style={{
                    marginInline: 20,
                    fontSize: 24,
                    fontWeight: "bolder",
                  }}
                >
                  {item.data.value}
                </div>
                <Fab
                  size="small"
                  color="secondary"
                  aria-label="add"
                  style={{ backgroundColor: "#50526e" }}
                  variant="circular"
                  onClick={() => decreaseValue(item)}
                >
                  <Remove />
                </Fab>
              </div>
            </div>
          </div>

          {index != keys.length - 1 ? <Divider /> : <></>}
        </div>
      );
    });
  };

  const cart = () => {
    return (
      <div style={{ backgroundColor: "whitesmoke" }}>
        <Grid container style={{ display: "flex", justifyContent: "center" }}>
          <Grid
            item
            xs={5}
            style={{
              margin: 27,
              backgroundColor: "white",
              padding: 20,
              borderRadius: 5,
            }}
          >
            <h1>My Cart ({keys.length})</h1>

            {cartItems()}
          </Grid>
          <Grid item xs={3} style={{ margin: 27 }}>
            <Grid
              container
              style={{ backgroundColor: "white", padding: 20, borderRadius: 5 }}
            >
              <span style={{ padding: 10, fontSize: 20, fontWeight: "bold" }}>
                Payment Details
              </span>
              <Grid item xs={12}>
                <div style={{ padding: 10, fontWeight: 700 }}>
                  Payable:{" "}
                  <span style={{ float: "right" }}>
                    {" "}
                    &#8377; {totalPriceWithoutDiscount}
                  </span>
                </div>
                <Divider />
                <div style={{ padding: 10, fontWeight: 700 }}>
                  Savings:{" "}
                  <span style={{ float: "right" }}>
                    {" "}
                    &#8377; -
                    {totalPriceWithoutDiscount - totalPriceWithDiscount}{" "}
                  </span>
                </div>
                <Divider />

                <div style={{ padding: 10, fontWeight: 700 }}>
                  Net:{" "}
                  <span style={{ float: "right" }}>
                    {" "}
                    &#8377; {totalPriceWithDiscount}{" "}
                  </span>
                </div>
              </Grid>
            </Grid>
            {keys.length>0? <Button style={{color: '#fff', background: '#50526e',marginTop:20, float:'right',width:250}} onClick={()=>props.history.push({pathname:'/ordersummary'})} >Place Order</Button>: <Button style={{color: 'grey', background: '#50526e',marginTop:20, float:'right',width:250}} onClick={()=>props.history.push({pathname:'/ordersummary'})} disabled>Place Order</Button>}
           
          </Grid>
        </Grid>
      </div>
    );
  };
  return (
    <div>
      <Header history={props.history} />
      {cart()}
      <Footer />
    </div>
  );
}
