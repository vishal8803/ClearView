import { useEffect, useState } from "react";
import React from "react";
import {
  getData,
  ServerURL,
  postData,
  postDataAndImage,
} from "../FetchAllServices";
import MaterialTable from "material-table";
import {
  makeStyles,
  TextField,
  Button,
  Grid,
  Avatar,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from "@material-ui/core";
import Swal from "sweetalert2";
import { isAlphabet, isEmpty } from "../checks";
import { ToastContainer, toast } from "react-toastify";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import HomePagePicture from "./HomePagePicture";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    margin: 20,
    padding: 20,
  },
  subdiv: {
    padding: 20,
    width: 900,
    height: "auto",
    backgroundColor: "#dcdde1",
    borderRadius: 5,
  },
  input: {
    display: "none",
  },
}));

export default function DisplayHomePagePicture(props) {
  const [allPicture, setAllPicture] = useState([]);
  const [positionNumber, setPositionNumber] = useState([]);
  const [status, setStatus] = useState([]);
  const [picture, setPicture] = useState({ fileName: "", bytes: "" });
  const [prevPicture, setPrevPicture] = useState({ fileName: "", bytes: "" });
  const [open, setOpen] = useState(false);
  const [pictureId, setPictureId] = useState("");
  const [btnstatus, setBtnStatus] = useState(false);
  const classes = useStyles();

  const fetchAllPicture = async () => {
    var list = await getData("homePagePicture/fetchAllPicture");
    setAllPicture(list.data);
  };

  const handleClickOpen = (data) => {
    setPositionNumber(data.position);
    setStatus(data.status);
    setPictureId(data.idhomepagepicture);
    setPicture({ fileName: `${ServerURL}/images/${data.picture}`, bytes: "" });
    setOpen(true);
  };

  const handleClose = () => {
    setBtnStatus(false);
    setOpen(false);
  };

  const handlePicture = (event) => {
    setPrevPicture(picture.fileName);
    setPicture({
      fileName: URL.createObjectURL(event.target.files[0]),
      bytes: event.target.files[0],
    });
    setBtnStatus(true);
  };

  const handleCamcelPicture = () => {
    setPicture({ fileName: prevPicture, bytes: "" });
    setBtnStatus(false);
  };

  const handleDelete = async (data) => {
    var body = { pictureid: data.idhomepagepicture };

    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this record!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then(async (result) => {
      if (result.isConfirmed) {
        var deleteShapeStatus = await postData(
          "homePagePicture/deletePicture",
          body
        );
        if (deleteShapeStatus) {
          Swal.fire("Deleted!", "Your Record has been deleted.", "success");
        } else {
          Swal.fire(
            "Error!",
            "Server Error.. Your Record has not been deleted.",
            "error"
          );
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your Record is safe :)", "error");
      }
      fetchAllPicture();
    });
  };

  const handleSavePicture = async () => {
    setOpen(false);
    var formdata = new FormData();
    formdata.append("pictureid", pictureId);
    formdata.append("picture", picture.bytes);
    var config = { headers: { "content-type": "multipart/form-data" } };
    var result = await postDataAndImage(
      "homePagePicture/updatehomepagePicture",
      formdata,
      config
    );
    if (result) {
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Picture Updated Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      Swal.fire({
        position: "top-center",
        icon: "error",
        title: "Your work has not been saved",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    fetchAllPicture();
    setBtnStatus(false);
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

  const handleSubmit = async () => {
    var err = false;
    if (isEmpty(positionNumber)) {
      err = true;
      toastMessage("Please Enter The Frame Type Name");
    }
    if (isEmpty(status)) {
      err = true;
      toastMessage("Please Select the Status");
    }
    if (isEmpty(picture.fileName)) {
      err = true;
      toastMessage("Please Upload the Icon");
    }
    if (!err) {
      var body = {
        positionNumber: positionNumber,
        status: status,
        pictureid:pictureId
      };

      var result = await postData(
        "homePagePicture/updateHomePagePictureDetails",
        body
      );
      if (result) {
        {
          handleClose();
        }
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Home Page Picture Details Updated Successfully",
          showConfirmButton: false,
          timer: 2000,
        });
      } else {
        {
          handleClose();
        }
        Swal.fire({
          position: "top-center",
          icon: "error",
          title: "Your work has not been saved",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
    {
      fetchAllPicture();
    }
  };

  useEffect(function () {
    fetchAllPicture();
  }, []);

  const shapeDialog = () => {
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          <h1
            style={{
              textAlign: "center",
              letterSpacing: 2,
              fontFamily: "cursive",
            }}
          >
            <span>
              <img src={"/glasscart.png"} width={50}></img>
            </span>
            <span> Edit Picture</span>{" "}
          </h1>
        </DialogTitle>
        <DialogContent>
          <div>
            <div className={classes.root}>
              <div className={classes.subdiv}>
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <TextField
                      label="Position Number"
                      onChange={(event) =>
                        setPositionNumber(event.target.value)
                      }
                      variant="outlined"
                      value={positionNumber}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl
                      variant="outlined"
                      fullWidth
                      className={classes.formControl}
                    >
                      <InputLabel id="demo-simple-select-outlined-label">
                        Status
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={status}
                        onChange={(event) => setStatus(event.target.value)}
                        label="Status"
                      >
                        <MenuItem value={"Activate"}>Activate</MenuItem>
                        <MenuItem value={"Deactivate"}>Deactivate</MenuItem>
                      </Select>
                    </FormControl>
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
                      {!btnstatus ? (
                        <>
                          <Button
                            variant="contained"
                            color="primary"
                            component="span"
                          >
                            Edit Picture
                          </Button>
                        </>
                      ) : (
                        <></>
                      )}
                    </label>
                    {btnstatus ? (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-evenly",
                        }}
                      >
                        <Button
                          component="span"
                          onClick={() => handleSavePicture()}
                        >
                          Save
                        </Button>
                        <Button
                          component="span"
                          onClick={() => handleCamcelPicture()}
                        >
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      <></>
                    )}
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
                      src={picture.fileName}
                      alt="Remy Sharp"
                      variant="rounded"
                      style={{ width: 80, height: 80 }}
                      className={classes.large}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      onClick={() => handleSubmit()}
                      variant="contained"
                      fullWidth
                      color="primary"
                    >
                      Edit Home Page Details
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
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
            {/* {setBtnStatus(false)} */}
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  function SimpleAction() {
    return (
      <MaterialTable
        title={
          <div>
            <Button
              variant="contained"
              color="primary"
              startIcon={
                <AddCircleRoundedIcon fontSize="large" variant="filled"   />
              } onClick={()=>props.setComponent(<HomePagePicture/>)}
            >
              Add Home Page Pictures
            </Button>
          </div>
        }
        columns={[
          { title: "Pictur ID", field: "idhomepagepicture" },
          { title: "Position Number", field: "position" },
          { title: "Status", field: "status" },
          {
            title: "Picture",
            render: (rowData) => (
              <img
                width={80}
                height={60}
                src={`${ServerURL}/images/${rowData.picture}`}
              />
            ),
          },
        ]}
        data={allPicture}
        actions={[
          {
            icon: "edit",
            tooltip: "Edit",
            onClick: (event, rowData) => handleClickOpen(rowData),
          },
          {
            icon: "delete",
            tooltip: "Delete",
            onClick: (event, rowData) => handleDelete(rowData),
          },
        ]}
      />
    );
  }

  return (
    <div>
      <div className={classes.root}>
        <div className={classes.subdiv}>
          {SimpleAction()}
          {shapeDialog()}
        </div>
      </div>
    </div>
  );
}
