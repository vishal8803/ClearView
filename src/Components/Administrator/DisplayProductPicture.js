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
import { getData, postData, postDataAndImage,ServerURL } from "../FetchAllServices";
import 'react-quill/dist/quill.snow.css';
import "react-toastify/dist/ReactToastify.css";
import {DropzoneArea} from 'material-ui-dropzone'
import Swal from "sweetalert2";
import { isEmpty } from "../checks";
import { ToastContainer, toast } from "react-toastify";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import ProductPicture from "./ProductPicture";

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
    root2: {
      maxWidth: 345,
    },
    
    
    
    
  }));

  export default function DisplayProductPicture(props) 
  {
        const classes = useStyles();
        const [getAllProduct , setAllProduct]=useState([]);
        const [getAllColor , setAllColor] = useState([]);
        const [getAllSize , setAllSize] = useState([]);
        const [getProductId , setProductId] = useState("");
        const [getFinalProductId , setFinalProductId] = useState("");
        const [getSize , setSize] = useState("");
        const [getFiles , setFiles] = useState([]) ;
        const [expanded, setExpanded] = React.useState(false);

        const fetchAllProoduct=async()=>{
            var list = await getData("product/fetchAllProduct");
            setAllProduct(list.data);
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

        const fetchProductPicture = async(t)=>
        {
            setFinalProductId(t) ;
            var body ={ "finalproductid" : t }
            var list = await postData('finalproduct/fetchProductPicture',body) ;
            setFiles(list.data)
        }

        const deleteSpecificPicture=async(t)=>{
          var body ={ "productPictureid" : t }
          Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this record!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
          }).then(async(result) => {
           
            if (result.isConfirmed) {
              var deleteProductPicture = await postData('finalproduct/deleteProductPicture',body)
              if(deleteProductPicture){
              Swal.fire(
                'Deleted!',
                'Your Product Picture has been deleted.',
                'success'
              )
              fetchProductPicture()
            }else
            {
              Swal.fire(
                'Error!',
                'Server Error.. Your Record has not been deleted.',
                'error'
              )
            } 
          }else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire(
              'Cancelled',
              'Your Record is safe :)',
              'error'
            )
          }
         
          })
        }

        const handlePicture=(event,t)=>{
          // alert( t)
          var formdata = new FormData();
          formdata.append("productPictureid", t)
          formdata.append("picture" , event.target.files[0])
          Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this record!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Update it!',
            cancelButtonText: 'No, keep it'
          }).then(async(result) => {
           
            if (result.isConfirmed) {
              var config = { headers: { "content-type": "multipart/form-data" } };
              var deleteProductPicture = await postDataAndImage('finalproduct/updateProductPicture',formdata,config)
              if(deleteProductPicture){
              Swal.fire(
                'Updated!',
                'Your Product Picture has been Updated.',
                'success'
              )
              fetchProductPicture()
            }else
            {
              Swal.fire(
                'Error!',
                'Server Error.. Your Record has not been deleted.',
                'error'
              )
            } 
          }else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire(
              'Cancelled',
              'Your Record is safe :)',
              'error'
            )
          }
         
          })
        }
        

        const fillPicture =()=>{
        
          return getFiles.map((item) => {
            // alert(`${ServerURL}/images/${item.images}`)
          
              return (
              
                  
                    <Grid item xs={6}>
                    <Card className={classes.root2}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image={`${ServerURL}/images/${item.images}`}
          title={item.productPictureid}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
           Product Picture 
          </Typography>
        
        </CardContent>
      </CardActionArea>
      <CardActions>
        
      <input
          accept="image/*"
          className={classes.input}
          id={`contained-button-file${item.productPictureid}`}
          multiple
          type="file"
          // onClick={()=>alert(item.productPictureid)}
          onChange={(event) => handlePicture(event,item.productPictureid)}
        />
            <label htmlFor={`contained-button-file${item.productPictureid}`}>
              <Button variant="contained" fullWidth color="primary" component="span">
               Replace
              </Button>
            </label>
        <Button onClick={()=>deleteSpecificPicture(item.productPictureid)} variant="contained" fullWidth color="primary">
         Delete
        </Button>
      </CardActions>
    </Card>
    
    </Grid>
     
               
              )
             
            });
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
        <div>
              <Button variant="contained" color="primary" startIcon={<AddCircleRoundedIcon fontSize="large" variant="filled"  />} onClick={()=>props.setComponent(<ProductPicture/>)}>Add Product Picture</Button>
            </div>
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
            <span> Product Pictures</span>{" "}
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
                onChange={(event)=>fetchProductPicture(event.target.value)}
                value={getFinalProductId}
              >
                <MenuItem value="">Select Color</MenuItem>
              {fillColor()}
              </Select>
            </FormControl>
          </Grid>
         
            {fillPicture()}
         
          
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