import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Button, Grid } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { postData, ServerURL } from "../FetchAllServices";
import { Divider } from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import { TextField } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Delete, Edit } from "@material-ui/icons";

export default function OrderSummary(props) {
  const [refresh, setRefresh] = useState(false);
  const [addStatus, setAddStatus] = useState(false);
  const [savedAddress, setSavedAddress] = useState(false);
  const [addressList, setAddressList] = useState([]);
  const [addressOne, setAddressOne] = useState("");
  const [addressTwo, setAddressTwo] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [userstate, setUserState] = useState("");
  const [editStatus, setEditStatus] = useState(false);
  const [name, setName] = useState("");
  const [altMobileNum, setAltMobileNum] = useState("");

  var productInCart = useSelector((state) => state.cart);
  var user = useSelector((state) => state.user);
  var userVal = Object.values(user);
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

  ///////////////Right Drawer///////////////
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => {
    setState({ ...state, [anchor]: open });
  };

  const fetchAllAddress = async () => {
    var body = { mobileNum: userVal[0].mobileNum };
    var result = await postData("userAddress/fecthAllAddress", body);
    // alert(JSON.stringify(result.data))
    if (result.data != null) {
      setSavedAddress(true);
      setAddressList(result.data);
    }else
    {
      setSavedAddress(false);
      setAddressList([])
    }
  };

  useEffect(function () {
    fetchAllAddress();
  }, []);

  const handleSubmitAddress = async () => {
    var body = {
      mobileNum: userVal[0].mobileNum,
      addressone: addressOne,
      addresstwo: addressTwo,
      pincode: pincode,
      city: city,
      state: userstate,
      name: name,
      altMobileNum: altMobileNum,
    };
    var result = await postData("userAddress/insertUserAddress", body);
    if (result.data) {
      fetchAllAddress();

      setAddStatus(false);
    }
  };

  const [addressBoxStatus, setAddressBoxStatus] = useState(false);
  const [currentAddress, setCurrentAddress] = useState([]);

  const addressBox = (item) => {
    setAddressBoxStatus(true);
    setCurrentAddress(item);
    toggleDrawer("right", false);
  };

  const [addressid, setAddressid] = useState("");

  const handleEdit = (item) => {
    setAddressOne(item.addressone);
    setAddressTwo(item.addresstwo);
    setPincode(item.pincode);
    setCity(item.city);
    setUserState(item.state);
    setAddressid(item.addressid);
    setName(item.name);
    setAltMobileNum(item.altmobilenum);
    setAddStatus(true);
    setEditStatus(true);
    setCurrentAddress(item)
  };

  const showAllAddress = () => {
    return addressList.map((item) => {
      //  alert(JSON.stringify(item))
      return (
        <div style={{ width: "100%" }}>
          {/* {item.addressone} */}
          <Card style={{ width: 310, margin: 17 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.primary"
                gutterBottom
              >
                <b> {item.name}</b>
              </Typography>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.primary"
                gutterBottom
              >
                {item.addressone},
              </Typography>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.primary"
                gutterBottom
              >
                {item.addresstwo},
              </Typography>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.primary"
                gutterBottom
              >
                {item.city} - {item.pincode}, {item.state}.
              </Typography>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.primary"
                gutterBottom
              >
                +91- {item.altmobilenum}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                variant="contained"
                color="primary"
                onClick={() => addressBox(item)}
              >
                Deliver Here
              </Button>
              <Button size="small" onClick={() => handleEdit(item)}>
                Edit
              </Button>
            </CardActions>
          </Card>
        </div>
      );
    });
  };

  const handldeBack = () => {
    setAddStatus(false);
    setEditStatus(false);
  };

  const performEdit = async () => {
    var body = {
      mobileNum: userVal[0].mobileNum,
      addressone: addressOne,
      addresstwo: addressTwo,
      pincode: pincode,
      city: city,
      state: userstate,
      addressid: addressid,
      name: name,
      altMobileNum: altMobileNum,
    };

    var result = await postData("userAddress/updateAddress", body);
    if (result.data) {
      setAddStatus(false);
      setEditStatus(false);
      fetchAllAddress();
    }
  };

  const clearFields = () => {
    setAddressOne("");
    setAddressTwo("");
    setPincode("");
    setCity("");
    setUserState("");
    setAltMobileNum("");
    setName("");
    setAddStatus(true);
  };

  const deleteAddress = async()=>{
    var body = {addressid:currentAddress.addressid};
    var result = await postData('userAddress/deleteAddress',body)
    if(result.data)
    {
      setAddStatus(false);
      setEditStatus(false);
      fetchAllAddress();
    }
  }

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      // onClick={()=>toggleDrawer(anchor, false)}
      // onKeyDown={()=>toggleDrawer(anchor, false)}
      style={{ width: 350 }}
    >
      <List>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          <img src="glasskart9.png" style={{ marginLeft: 10 }}></img>
          <CloseIcon
            style={{ float: "right", marginRight: 20, cursor: "pointer" }}
            onClick={() => toggleDrawer("right", false)}
          />
        </div>
        {!addStatus ? (
          <div>
            <Grid
              container
              style={{ cursor: "pointer" }}
              onClick={() => clearFields()}
            >
              <Grid
                item
                xs={2}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <AddIcon fontSize="large" color="primary" />
              </Grid>

              <Grid xs={10} style={{ display: "flex", alignItems: "center" }}>
                Type your Address
              </Grid>
            </Grid>
            <Grid container>
              {savedAddress ? (
                <div>
                  <Grid item xs={12} style={{ fontWeight: "bold", margin: 10 }}>
                    Saved Addresses
                  </Grid>
                  {showAllAddress()}
                </div>
              ) : (
                <></>
              )}
            </Grid>
          </div>
        ) : (
          <div>
            <Grid container>
              <Grid
                item
                xs={2}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <KeyboardBackspaceIcon
                  fontSize="large"
                  color="primary"
                  style={{ cursor: "pointer" }}
                  onClick={() => handldeBack()}
                />
              </Grid>
              {editStatus ? (
                <Grid xs={10} style={{ display: "flex", alignItems: "center" }}>
                  Edit Address
                </Grid>
              ) : (
                <Grid xs={10} style={{ display: "flex", alignItems: "center" }}>
                  Add Address
                </Grid>
              )}
            </Grid>
            <Grid container>
              <Grid
                item
                xs={12}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: 15,
                }}
              >
                <TextField
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  size="small"
                  style={{ width: "100%" }}
                  id="outlined-basic"
                  label="Name*"
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                xs={12}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: 15,
                }}
              >
                <TextField
                  value={addressOne}
                  size="small"
                  style={{ width: "100%" }}
                  id="outlined-basic"
                  label="Address One*"
                  variant="outlined"
                  onChange={(event) => setAddressOne(event.target.value)}
                />
              </Grid>
              <Grid
                item
                xs={12}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: 15,
                }}
              >
                <TextField
                  value={addressTwo}
                  size="small"
                  style={{ width: "100%" }}
                  id="outlined-basic"
                  label="Address Two*"
                  variant="outlined"
                  onChange={(event) => setAddressTwo(event.target.value)}
                />
              </Grid>
              <Grid
                item
                xs={12}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: 15,
                }}
              >
                <TextField
                  value={pincode}
                  size="small"
                  style={{ width: "100%" }}
                  id="outlined-basic"
                  label="Pin Code*"
                  variant="outlined"
                  onChange={(event) => setPincode(event.target.value)}
                />
              </Grid>
              <Grid
                item
                xs={12}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: 15,
                }}
              >
                <TextField
                  value={city}
                  size="small"
                  style={{ width: "100%" }}
                  id="outlined-basic"
                  label="City*"
                  variant="outlined"
                  onChange={(event) => setCity(event.target.value)}
                />
              </Grid>
              <Grid
                item
                xs={12}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: 15,
                }}
              >
                <TextField
                  value={userstate}
                  size="small"
                  style={{ width: "100%" }}
                  id="outlined-basic"
                  label="State*"
                  variant="outlined"
                  onChange={(event) => setUserState(event.target.value)}
                />
              </Grid>
              <Grid
                item
                xs={12}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: 15,
                }}
              >
                <TextField
                  value={altMobileNum}
                  onChange={(event) => setAltMobileNum(event.target.value)}
                  size="small"
                  style={{ width: "100%" }}
                  id="outlined-basic"
                  label="Mobile Number*"
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                xs={12}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: 15,
                }}
              >
                {editStatus ? (
                  <div>
                    <Button
                      style={{ color: "#fff", background: "#50526e", margin:5, width:130 }}
                      onClick={() => performEdit()}
                      startIcon={<Edit />}
                    >
                      Edit 
                    </Button>
                    <Button
                      style={{ color: "#fff", background: "#50526e",margin:5 , width:130}}
                      onClick={() => deleteAddress()}
                      startIcon={<Delete/>}
                    >
                      Delete 
                    </Button>
                  </div>
                ) : (
                  <Button
                    style={{ color: "#fff", background: "#50526e", width: 250 }}
                    onClick={() => handleSubmitAddress()}
                  >
                    Save &#38; Proceed
                  </Button>
                )}
              </Grid>
            </Grid>
          </div>
        )}
      </List>
    </Box>
  );

  ///////////////Payement Gateway////////////////////////////
  const options = {
    key: "rzp_test_GQ6XaPC6gMPNwH",
    amount: totalPriceWithDiscount * 100, //  = INR 1
    name: "Glasskart",
    description: "Gwalior, M.P.",
    image: `/glasskart9.png`,

    handler: function (response) {
      alert(response.razorpay_payment_id);
    },
    prefill: {
      name: userVal[0].username,
      contact: userVal[0].mobileNum,
      email: userVal[0].emailid,
    },
    notes: {
      address: "some address",
    },
    theme: {
      color: "blue",
      hide_topbar: false,
    },
  };

  const openPayModal = () => {
    // alert(JSON.stringify(userVal))
    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  ////////////////////////////////////////////////////////////

  const changeAddress = () => {
    return (
      <div>
        <React.Fragment key={"right"}>
          <Drawer
            anchor={"right"}
            open={state["right"]}
            // onClose={()=>toggleDrawer("right", false)}
          >
            {list("right")}
          </Drawer>
        </React.Fragment>
      </div>
    );
  };

  //////////////////////////////////////////

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
          <Grid item xs={5}>
            <Grid container>
              <Grid
                item
                xs={12}
                style={{
                  marginTop: 27,
                  backgroundColor: "white",
                  padding: 20,
                  borderRadius: 5,
                }}
              >
                <span style={{ fontSize: 20, fontWeight: "bold" }}>
                  Select Delivery Address
                </span>
                <br></br>
                {!addressBoxStatus ? (
                  <Button
                    startIcon={<AddCircleIcon fontSize="large" />}
                    variant="outlined"
                    style={{
                      color: "#50526e",
                      padding: 20,
                      marginTop: 22,
                      width: 250,
                    }}
                    onClick={() => toggleDrawer("right", true)}
                  >
                    Add Address
                  </Button>
                ) : (
                  <div>
                    {" "}
                    <Card style={{ width: 310, margin: 17 }}>
                      <CardContent>
                        <Typography
                          sx={{ fontSize: 14 }}
                          color="text.primary"
                          gutterBottom
                        >
                          <b> {currentAddress.name}</b>
                        </Typography>
                        <Typography
                          sx={{ fontSize: 14 }}
                          color="text.primary"
                          gutterBottom
                        >
                          {currentAddress.addressone},
                        </Typography>
                        <Typography
                          sx={{ fontSize: 14 }}
                          color="text.primary"
                          gutterBottom
                        >
                          {currentAddress.addresstwo},
                        </Typography>
                        <Typography
                          sx={{ fontSize: 14 }}
                          color="text.primary"
                          gutterBottom
                        >
                          {currentAddress.city} - {currentAddress.pincode},{" "}
                          {currentAddress.state}.
                        </Typography>
                        <Typography
                          sx={{ fontSize: 14 }}
                          color="text.primary"
                          gutterBottom
                        >
                          +91- {currentAddress.altmobilenum}
                        </Typography>
                      </CardContent>
                    </Card>
                    <Button
                      variant="outlined"
                      style={{
                        color: "#50526e",
                        padding: 10,
                        marginLeft: 17,
                        width: 250,
                      }}
                      onClick={() => toggleDrawer("right", true)}
                    >
                      Change Address
                    </Button>
                  </div>
                )}
              </Grid>
              <Grid
                item
                xs={12}
                style={{
                  marginTop: 30,
                  marginBottom: 30,
                  backgroundColor: "white",
                  padding: 20,
                  borderRadius: 5,
                }}
              >
                <h1>Order Summary</h1>
                {cartItems()}
              </Grid>
            </Grid>
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
            <Button
              style={{
                color: "#fff",
                background: "#50526e",
                marginTop: 20,
                float: "right",
                width: 250,
              }}
              onClick={() => openPayModal()}
            >
              Make Payment
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  };
  return (
    <div>
      <Header history={props.history} />
      {cart()}
      {changeAddress()}
      <Footer />
    </div>
  );
}
