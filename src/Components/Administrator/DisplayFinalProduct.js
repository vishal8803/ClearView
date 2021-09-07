import React, { useEffect, useState } from 'react'
import MaterialTable from 'material-table'
import { getData, ServerURL,postData, postDataAndImage } from '../FetchAllServices'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import { TextField,Grid,Button,makeStyles,InputLabel,MenuItem,FormControl,Select,Avatar } from '@material-ui/core'
import Swal from 'sweetalert2'
import ReactQuill from 'react-quill'; 
import 'react-quill/dist/quill.snow.css';
import { isAlphabet, isEmail, isEmpty, isMobile } from '../checks';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddFinalProduct from './AddFinalProduct'
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';

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
      width: 1200,
      height: "auto",
      backgroundColor: "#dcdde1",
      borderRadius: 5,
    },
    input: {
      display: "none",
    },
  }));

  export default function DisplayFinalProduct(props) {
    DisplayFinalProduct.modules = {
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
    DisplayFinalProduct.formats = [
      'header', 'font', 'size',
      'bold', 'italic', 'underline', 'strike', 'blockquote',
      'list', 'bullet', 'indent',
      'link', 'image', 'video'
    ]
  
      const classes = useStyles();
      const [getAllFinalProducts , setAllFinalProducts] = useState([]);
      const [open, setOpen] = useState(false);
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
      const [getBtnStatus , setBtnStatus] = useState(false);
      const [getOldPicture , setOldPicture] = useState({fileName:'', bytes:""})
      const [getFinalProductId , setFinalProductId] = useState("");

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
    const fecthAllFinalProducts=async()=>{
        var list =await getData('finalproduct/fetchAllFinalProducts')
        setAllFinalProducts(list.data)
    }

   

    useEffect(function () {
        fetchAllProoduct();
        fetchAllColor();
        fecthAllFinalProducts();
      }, []);

    const handlePicture = (event) => {
        setOldPicture(getPicture.fileName)
        setPicture({
          fileName: URL.createObjectURL(event.target.files[0]),
          bytes: event.target.files[0],
        });
        setBtnStatus(true)
    };

    const handleCancelPicture=()=>{
        setPicture({fileName:getOldPicture , bytes:''})
          setBtnStatus(false)
      }

      const handelSavePicture=async(event)=>
      {
        setOpen(false)
        var formdata = new FormData() ;
        formdata.append("finalproductid" , getFinalProductId)
        formdata.append("picture",getPicture.bytes)
        var config = {headers:{"content-type":"multipart/form-data"}}
        var result = await postDataAndImage('finalproduct/updatefinalproductpicture',formdata,config)
    if(result)
    {
        {handleClose()}
      Swal.fire({
        position: 'top-center',
        icon: 'success',
        title: 'Final Product Picture Updated Successfully',
        showConfirmButton: false,
        timer: 2000
      })
    }else
    {
        {handleClose()}
      Swal.fire({
        position: 'top-center',
        icon: 'error',
        title: 'Your work has not been saved',
        showConfirmButton: false,
        timer: 1500
      }) 
    }
    fecthAllFinalProducts()
    setBtnStatus(false)
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


      const handleClickOpen = (data) => {
        setFinalProductId(data.finalproductid)
        setProductId(data.productid)
        setColorid(data.colorid)
        setSize(data.size)
        setPrice(data.price)
        setOfferType(data.offertype)
        setOfferPrice(data.offerprice)
        setDescription(data.description)
        setStock(data.stock)
        setPicture({fileName: `${ServerURL}/images/${data.picture}`, bytes: ''})
        setOpen(true);
      };

      const handleSubmit=async()=>{
        var err = false ;
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
            toastMessage("Please Select Size");
        }
        if(isEmpty(getPrice))
        {
            err = true;
            toastMessage("Please Enter The Price");
        }
        if(isEmpty(getOfferPrice))
        {
            err = true;
            toastMessage("Please Select Enter Offer Price");
        }
        if(isEmpty(getOfferType))
        {
            err = true;
            toastMessage("Please Select Offer Type");
        }
        if(isEmpty(getDescription))
        {
            err = true;
            toastMessage("Please Enter the Description");
        }
        if(isEmpty(getStock))
        {
            err = true;
            toastMessage("Please Enter the Stock");
        }
        if(isEmpty(getPicture.fileName))
        {
            err = true;
            toastMessage("Please Select Picture");
        }
        var body={
          "finalproductid":getFinalProductId,
          "productid":getProductId,
          "colorid" : getColorid,
          "size" : getSize,
          "price" : getPrice,
          "offertype" : getOfferType,
          "offerprice" : getOfferPrice,
          "description" : getDescription,
          "stock" : getStock,
          "picture" : getPicture.fileName,
          }
      
          var result = await postData('finalproduct/updateFinalProduct',body)
      if(result)
      {
          {handleClose()}
          Swal.fire({
              position: 'top-center',
              icon: 'success',
              title: 'Product Updated Successfully',
              showConfirmButton: false,
              timer: 2000
          })
      }else
      {
          {handleClose()}
          Swal.fire({
              position: 'top-center',
              icon: 'error',
              title: 'Your work has not been saved',
              showConfirmButton: false,
              timer: 1500
          }) 
      }
      {fecthAllFinalProducts()}
    }
    
      const handleClose = () => {
        setOpen(false);
        setBtnStatus(false)
      };

      const finalProductDialog=()=>{
          return(
              <div>
                   <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
       
        <DialogContent>
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
            <span> Edit Final Product</span>{" "}
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
            modules={DisplayFinalProduct.modules}
            formats={DisplayFinalProduct.formats}
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
            {!getBtnStatus?<>
              <Button variant="contained" color="primary" component="span">
                Edit Picture
              </Button>
              </>:<></>}
            </label>
            {getBtnStatus?<div style={{display:'flex' , justifyContent:'space-evenly'}}>
            <Button component="span" onClick={()=>handelSavePicture()}>
              Save
            </Button>
            <Button  component="span" onClick={()=>handleCancelPicture()}>
              Cancel
            </Button>
        </div>:<></>}
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
              Edit Final Product
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
              </div>
          )
      }


      

      const handleDeleteProduct=(data)=>{
        var body={"finalproductid": data.finalproductid}
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this record!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
          }).then(async(result) => {
           
            if (result.isConfirmed) {
              var deleteStoreStatus = await postData('finalproduct/deleteFinalProduct',body)
              if(deleteStoreStatus){
              Swal.fire(
                'Deleted!',
                'Your Record has been deleted.',
                'success'
              )
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
          fecthAllFinalProducts()
          })
      }


    function SimpleAction() {
        return (
          <MaterialTable
            title={<div>
              <Button variant="contained" color="primary" startIcon={<AddCircleRoundedIcon fontSize="large" variant="filled"  />} onClick={()=>props.setComponent(<AddFinalProduct/>)}>Add Final Products</Button>
            </div>}
            columns={[
              { title: 'Product Id', field: 'finalproductid' },
              { title: 'Product Name', field: 'productname' },
              { title: 'Color Name', field: 'colorname' },
              { title: 'Size', field: 'size' },
              { title: 'Price', field: 'price' },
              { title: 'Offer Type', field: 'offertype' },
              { title: 'Offer Price', field: 'offerprice' },
              
              { title: 'Stock', field: 'stock' },
              { title: 'Picture', 
            render: rowData=><img width={80} height={60} src={`${ServerURL}/images/${rowData.picture}`} />
            }
              
            ]}
            data={getAllFinalProducts}        
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit Product',
                onClick: (event, rowData) => handleClickOpen(rowData)
              },{
                icon: 'delete',
                tooltip: 'Delete Product',
                onClick: (event, rowData) => handleDeleteProduct(rowData)
              }
            ]}
          />
        )
      }
      return(
        <div className={classes.root}>
        <div className={classes.subdiv}>
              {SimpleAction()}
              {/* {productDialog()} */}
              {finalProductDialog()}
          </div>
          </div>
      )
  }