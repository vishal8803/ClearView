import React, { useState, useEffect } from "react";
import {
  TextField,
  Grid,
  Button,
  makeStyles,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Avatar,
} from "@material-ui/core";
import { getData, postDataAndImage } from "../FetchAllServices";
import Swal from "sweetalert2";
import { isAlphabet, isEmail, isEmpty, isMobile } from "../checks";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DisplayAllStore from "./displayAllStore";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    // margin: 20,
    // padding: 20,
  },
  subdiv: {
    padding: 20,
    width: 800,
    height: "auto",
    backgroundColor: "#dcdde1",
    borderRadius: 5,
  },
  input: {
    display: "none",
  },
}));

export default function AddStoreCity(props) {
  const [getListState, setListState] = useState([]);
  const [getState, setState] = useState("");
  const [getCity, setCity] = useState("");
  const [getStoreName, setStoreName] = useState("");
  const [getAddressOne, setAddressOne] = useState("");
  const [getAddressTwo, setAddressTwo] = useState("");
  const [getLandmark, setLandmark] = useState("");
  const [getLattitutde, setLattittude] = useState("");
  const [getLongitude, setLongitude] = useState("");
  const [getMobileNumber, setMobileNumber] = useState("");
  const [getEmaiLAddress, setEmailAddress] = useState("");
  const [getPicture, setPicture] = useState({ fileName: "", bytes: "" });

  const fetchAllState = async () => {
    var list = await getData("stores/fetchallstates");

    setListState(list.data);
  };

  useEffect(function () {
    fetchAllState();
  }, []);

  const fillState = () => {
    return getListState.map((item) => {
      return <MenuItem value={item.stateName}>{item.stateName}</MenuItem>;
    });
  };

  const handlePicture = (event) => {
    setPicture({
      fileName: URL.createObjectURL(event.target.files[0]),
      bytes: event.target.files[0],
    });
  };

  const toastMessage = (message) => {
    toast.info(`${message}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      progress: 0,
      draggable: true,
    });
  };

  // const getLatLong=(address)=>{
  //   Geocode.setApiKey("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
  //   Geocode.setLanguage("en");
  //   Geocode.fromAddress(`${address}`).then(
  //     (response) => {
  //       const { lat, lng } = response.results[0].geometry.location;
  //       console.log(lat, lng);
  //       alert(lat," ",lng)
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  // }

  const getLatLong = (address) => {
    // var geocoder = new google.maps.Geocoder();
  };

  const handleSubmit = async () => {
    // getLatLong("Singhal Bhawan Jayendraganj Lashkar")
    var err = false;
    if (isEmpty(getState)) {
      err = true;
      toastMessage("Please Select The State");
    }

    if (isEmpty(getCity)) {
      err = true;
      toastMessage("Please Enter The City Name");
    } else {
      if (!isAlphabet(getCity)) {
        err = true;
        toastMessage("Please Enter A Valid Ciy Name");
      }
    }

    if (isEmpty(getStoreName)) {
      err = true;
      toastMessage("Please Enter The Store Name");
    }

    if (isEmpty(getAddressOne)) {
      err = true;
      toastMessage("Please Enter The Address One");
    }

    if (isEmpty(getMobileNumber)) {
      err = true;
      toastMessage("Please Enter Contact Number");
    } else {
      if (!isMobile(getMobileNumber)) {
        err = true;
        toastMessage("Please Enter The Correct Mobile Number");
      }
    }

    if (isEmpty(getEmaiLAddress)) {
      err = true;
      toastMessage("Please Enter Email Address");
    } else {
      if (!isEmail(getEmaiLAddress)) {
        err = true;
        toastMessage("Please Enter Correct Email Adress");
      }
    }

    if (isEmpty(getPicture.fileName)) {
      err = true;
      toastMessage("Please Upload The Picture");
    }

    if (!err) {
      var formdata = new FormData();
      formdata.append("state", getState);
      formdata.append("city", getCity);
      formdata.append("storename", getStoreName);
      formdata.append("addressone", getAddressOne);
      formdata.append("addresstwo", getAddressTwo);
      formdata.append("landmark", getLandmark);
      formdata.append("longitude", getLongitude);
      formdata.append("lattitude", getLattitutde);
      formdata.append("emailaddress", getEmaiLAddress);
      formdata.append("mobilenum", getMobileNumber);
      formdata.append("picture", getPicture.bytes);
      var config = { headers: { "content-type": "multipart/form-data" } };
      var result = await postDataAndImage(
        "stores/insertstore",
        formdata,
        config
      );
      if (result) {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Record Added Successfully",
          showConfirmButton: false,
          timer: 2000,
        });
        // setListState='';
        setState("");
        setStoreName("");
        setCity("");
        setEmailAddress("");
        setLandmark("");
        setLattittude("");
        setLongitude("");
        setMobileNumber("");
        setPicture({ fileName: "", bytes: "" });
        setAddressOne("");
        setAddressTwo("");
      } else {
        Swal.fire({
          position: "top-center",
          icon: "error",
          title: "Your work has not been saved",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.subdiv}>
      {/* <Button variant="contained" color="primary" startIcon={<ArrowBackIcon fontSize="large" variant="filled"  onClick={()=>props.setComponent(<DisplayAllStore/>)}/>} >Display Stores</Button> */}
        <h1
          style={{
            textAlign: "center",
            letterSpacing: 2,
            fontFamily: "cursive",
          }}
        >
          <span>
            <img src={"/glasscart.png"} width={100}></img>
          </span>
          <span> Add Store</span>{" "}
        </h1>

        <Grid container spacing={1}>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="stateId">Select State</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                //value={age}
                value={getState}
                onChange={(event) => setState(event.target.value)}
                label="Select State"
              >
                {fillState()}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              variant="outlined"
              label="City"
              value={getCity}
              onChange={(event) => setCity(event.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="Store Name"
              value={getStoreName}
              onChange={(event) => setStoreName(event.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="Address One"
              value={getAddressOne}
              onChange={(event) => setAddressOne(event.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="Address Two"
              value={getAddressTwo}
              onChange={(event) => setAddressTwo(event.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="Landmark"
              value={getLandmark}
              onChange={(event) => setLandmark(event.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              variant="outlined"
              label="Lattitude"
              value={getLattitutde}
              onChange={(event) => setLattittude(event.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              variant="outlined"
              label="Longitude"
              value={getLongitude}
              onChange={(event) => setLongitude(event.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              variant="outlined"
              label="Contact Number"
              value={getMobileNumber}
              onChange={(event) => setMobileNumber(event.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              variant="outlined"
              label="Email Address"
              value={getEmaiLAddress}
              onChange={(event) => setEmailAddress(event.target.value)}
            />
          </Grid>
          <Grid
            item
            xs={6}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <input
              accept="image/*"
              className={classes.input}
              id="contained-button-file"
              multiple
              type="file"
              onChange={(event) => handlePicture(event)}
            />
            <label htmlFor="contained-button-file">
              <Button variant="contained" color="primary" component="span">
                Upload
              </Button>
            </label>
          </Grid>
          <Grid
            item
            xs={6}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Avatar
              src={getPicture.fileName}
              alt="Remy Sharp"
              variant="rounded"
              style={{ width: 80, height: 80 }}
              className={classes.large}
            />
          </Grid>

          <Grid item sm={12}>
            <Button
              onClick={() => handleSubmit()}
              fullWidth
              variant="contained"
              color="primary"
            >
              Submit Store
            </Button>
          </Grid>
        </Grid>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        {/*   */}
      </div>
    </div>
  );
}
