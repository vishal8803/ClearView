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
import 'react-quill/dist/quill.snow.css';
import "react-toastify/dist/ReactToastify.css";
import {DropzoneArea} from 'material-ui-dropzone'
import Swal from "sweetalert2";
import { isEmpty } from "../checks";
import { ToastContainer, toast } from "react-toastify";

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

  export default function ProductPicture() 
  {
        const classes = useStyles();
        const [getAllProduct , setAllProduct]=useState([]);
        const [getAllColor , setAllColor] = useState([]);
        const [getAllSize , setAllSize] = useState([]);
        const [getProductId , setProductId] = useState("");
        const [getFinalProductId , setFinalProductId] = useState("");
        const [getSize , setSize] = useState("");
        const [getFiles , setFiles] = useState([]);

        const fetchAllProoduct=async()=>{
            var list = await getData("product/fetchAllProduct");
            setAllProduct(list.data) ;
        }

        const fillProduct =()=>{
            return getAllProduct.map((item) => {
                return <MenuItem value={item.productid}>{item.productname}</MenuItem>;
              });
        }
        const fillColor =()=>{
            return getAllColor.map((item) => {
                return <MenuItem value={item.finalproductid}>{item.colorname}</MenuItem>;
              });
        }
        const fillSize =()=>{
            return getAllSize.map((item) => {
                return <MenuItem value={item.size}>{item.size}</MenuItem>;
              });
        }

        const fetchAllProductColor=async(size)=>
        {
          setSize(size)
            var body ={ "productid" : getProductId , "size" : size}
            var list = await postData('finalproduct/fecthAllFinalProductColor',body) ;
            setAllColor(list.data) ;
        }

        const fetchAllSize=async(t)=>
        {
          setProductId(t) ;
            var body ={ "productid" : t }
            var list = await postData('finalproduct/fecthAllFinalProductSize',body) ;
            setAllSize(list.data) ;
        }

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

        const handleMultiplePicture=(files)=>{
            setFiles(files);
        }

        const submitMultiplePicture=async()=>
        {
          var err = false ;
            if(isEmpty(getProductId))
            {
              toastMessage("Please Select The Product");
              err = true ;
            }
             if(isEmpty(getSize))
            {
              toastMessage("Please Select The Size")
              err = true ;
            }
             if(isEmpty(getFinalProductId))
            {
              toastMessage("Please Select The Color")
              err = true ;
            }
            if(!err){
            var formdata = new FormData() ;
            formdata.append("finalproductid" , getFinalProductId)
            
            getFiles.map((item,index)=>{
              formdata.append("picture"+index+1,item) ;
            })

            var config = { headers: { "content-type": "multipart/form-data" } };
            var result = await postDataAndImage("finalproduct/insertMultipleImages",formdata,config);
            if(result)
            {
              Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Final Product Picture Added Successfully",
                showConfirmButton: false,
                timer: 2000,
              });
              setProductId("")
              setSize("")
              setFinalProductId("")
              setFiles([]) ;
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
        }
      }

        const handle=(size)=>
        {
           fetchAllProductColor(size) ;
        }
        const handle1=(productId)=>
        {
            
            fetchAllSize(productId);
        }

        useEffect(function () {
            fetchAllProoduct();
          }, []);
        
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
            <span> Add Picture</span>{" "}
          </h1>
          <Grid container spacing={1}>
          <Grid item xs={4}>
          <FormControl fullWidth variant="outlined">
              <InputLabel id="stateId">Select Product</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                label="Select Product"
                onChange={(event)=>handle1(event.target.value)}
                value={getProductId}
              >
              {fillProduct()}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
          <FormControl fullWidth variant="outlined">
              <InputLabel id="stateId">Select Size</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                label="Select Size"
                onChange={(event)=>handle(event.target.value)}
                value={getSize}
              >
                <MenuItem value="">Select Size</MenuItem>
              {fillSize()}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
          <FormControl fullWidth variant="outlined">
              <InputLabel id="stateId">Select Color</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                label="Select Color"
                onChange={(event)=>setFinalProductId(event.target.value)}
                value={getFinalProductId}
              >
                <MenuItem value="">Select Color</MenuItem>
              {fillColor()}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
          <DropzoneArea 
            onChange={(files)=>handleMultiplePicture(files)}
            maxFileSize={5000000}
            filesLimit={10}
          />
          </Grid>
          <Grid item xs={12}>
          <Button variant="contained" onClick={()=>submitMultiplePicture()} color="primary" fullWidth >Upload</Button>
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
        );
  }