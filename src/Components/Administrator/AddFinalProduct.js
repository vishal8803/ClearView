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
import { getData, postData, postDataAndImage } from "../FetchAllServices";
import Swal from "sweetalert2";
import { isAlphabet, isEmail, isEmpty, isMobile } from "../checks";
import ReactQuill from 'react-quill'; 
import 'react-quill/dist/quill.snow.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      width: 800,
      height: "auto",
      backgroundColor: "#dcdde1",
      borderRadius: 5,
    },
    input: {
      display: "none",
    },
  }));

  export default function AddFinalProduct(props) {
    AddFinalProduct.modules = {
      toolbar: [
        [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
        [{size: []}],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, 
         {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image', 'video'],
        ['clean']
      ],
      clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
      }
    }
    /* 
     * Quill editor formats
     * See https://quilljs.com/docs/formats/
     */
    AddFinalProduct.formats = [
      'header', 'font', 'size',
      'bold', 'italic', 'underline', 'strike', 'blockquote',
      'list', 'bullet', 'indent',
      'link', 'image', 'video'
    ]
  
      const classes = useStyles();
      const [getAllProduct , setAllProduct]=useState([]);
      const [getAllColor , setAllColor] =useState([]);
      const [getProductId , setProductId] = useState("");
      const [getColorid , setColorid] = useState("");
      const [getSize , setSize] = useState("");
      const [getPrice , setPrice] = useState("");
      const [getOfferType , setOfferType] = useState("");
      const [getOfferPrice , setOfferPrice] = useState("");
      const [getDescription , setDescription] = useState("");
      const [getStock , setStock] = useState("");
      const [getPicture , setPicture] = useState({fileName:"" , bytes:""});

      const fetchAllProoduct=async()=>{
        var list = await getData("product/fetchAllProduct");
        setAllProduct(list.data) ;
    }
      const fetchAllColor=async()=>{
        var list = await getData("color/fetchallColor");
        setAllColor(list.data) ;
    }

    const fillProduct =()=>{
        return getAllProduct.map((item) => {
            return <MenuItem value={item.productid}>{item.productname}</MenuItem>;
          });
    }
    const fillColor =()=>{
        return getAllColor.map((item) => {
            return <MenuItem value={item.colorid}>{item.colorname}</MenuItem>;
          });
    }

    useEffect(function () {
        fetchAllProoduct();
        fetchAllColor();
      }, []);

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

    const handleSubmit= async()=>{
      var body={productid : getProductId , colorid : getColorid , size : getSize}
      var st =await postData('finalproduct/checkDuplicateProducts',body);
      // alert(st)
        var err = false;
        if(isEmpty(getProductId))
        {
            err = true;
            toastMessage("Please Select The Product");
        }
        if(isEmpty(getColorid))
        {
            err = true;
            toastMessage("Please Select The Color");
        }
        if(isEmpty(getSize))
        {
            err = true;
            toastMessage("Please Select The Size");
        }
        if(isEmpty(getPrice))
        {
            err = true;
            toastMessage("Please Enter The Price");
        }
        
        if(isEmpty(getOfferType))
        {
            err = true;
            toastMessage("Please Select The Offer Type");
        }
        
        if(isEmpty(getOfferPrice))
        {
            err = true;
            toastMessage("Please Enter The Offer Price");
        }

        if(isEmpty(getDescription))
        {
            err = true ;
            toastMessage("Please Enter The Description")
        }

        if(isEmpty(getStock))
        {
            err = true;
            toastMessage("Please Enter The Stock");
        }
        if(isEmpty(getPicture.fileName))
        {
            err = true;
            toastMessage("Please Upload The Picture");
        }
        
        if(!err)
        {
          if(st==false){
            var formdata = new FormData();
            formdata.append("productid",getProductId)
            formdata.append("colorid",getColorid)
            formdata.append("size",getSize)
            formdata.append("price",getPrice)
            formdata.append("offertype",getOfferType)
            formdata.append("offerprice",getOfferPrice)
            formdata.append("description",getDescription)
            formdata.append("stock",getStock)
            formdata.append("picture",getPicture.bytes)
            var config = { headers: { "content-type": "multipart/form-data" } };
            var result = await postDataAndImage("finalproduct/insertFinalProduct",formdata,config);

            if(result)
            {
                Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: "Final Product Added Successfully",
                    showConfirmButton: false,
                    timer: 2000,
                  });
                  setProductId("")
                  setColorid("")
                  setSize("")
                  setPrice("")
                  setOfferType("")
                  setOfferPrice("")
                  setDescription("")
                  setStock("")
                  setPicture({fileName:"",bytes:""})
            }else
            {
                Swal.fire({
                    position: "top-center",
                    icon: "error",
                    title: "Your work has not been saved",
                    showConfirmButton: false,
                    timer: 1500,
                  });
            }
        
        }else
        {
          Swal.fire({
            position: "top-center",
            icon: "error",
            title: "Record Already Exist",
            showConfirmButton: false,
            timer: 1500,
          });
          setProductId("")
          setColorid("")
          setSize("")
          setPrice("")
          setOfferType("")
          setOfferPrice("")
          setDescription("")
          setStock("")
          setPicture({fileName:"",bytes:""})
        }
      }
    }


    return(
        <div className={classes.root}>
        <div className={classes.subdiv}>
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
            <span> Add Final Product</span>{" "}
          </h1>
          <Grid container spacing={1}>
          <Grid item xs={6}>
          <FormControl fullWidth variant="outlined">
              <InputLabel id="stateId">Select Product</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                label="Select Product"
                onChange={(event)=>setProductId(event.target.value)}
                value={getProductId}
              >
              {fillProduct()}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
          <FormControl fullWidth variant="outlined">
              <InputLabel id="stateId">Select Color</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                label="Select Color"
                onChange={(event)=>setColorid(event.target.value)}
                value={getColorid}
              >
              {fillColor()}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
          <FormControl fullWidth variant="outlined">
              <InputLabel id="stateId">Size</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                label="Size"
                onChange={(event)=>setSize(event.target.value)}
                value={getSize}
              >
              <MenuItem value="Small">Small</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Large">Large</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
          <TextField
              fullWidth
              variant="outlined"
              label="Price"
              value={getPrice}
              onChange={(event)=>setPrice(event.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
          <FormControl fullWidth variant="outlined">
              <InputLabel id="stateId">Offer Type</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                label="Offer Type"
                value={getOfferType}
                onChange={(event)=>setOfferType(event.target.value)}
              >
              <MenuItem value="Festival">Festival</MenuItem>
              <MenuItem value="Sale">Sale</MenuItem>
              <MenuItem value="None">None</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
          <TextField
              fullWidth
              variant="outlined"
              label="Offer Price"
              value={getOfferPrice}
              onChange={(event)=>setOfferPrice(event.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
          <ReactQuill
            value={getDescription} 
            modules={AddFinalProduct.modules}
            formats={AddFinalProduct.formats}
            onChange={(txt)=>setDescription(txt)} />
          </Grid>
          <Grid item xs={12}>
          <TextField
              fullWidth
              variant="outlined"
              label="Stock"
              value={getStock}
              onChange={(event)=>setStock(event.target.value)}
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
                Upload Picture
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
              Submit Final Product
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
    )
  }