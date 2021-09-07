import React, { useEffect, useState } from 'react'
import MaterialTable from 'material-table'
import { getData, ServerURL,postData, postDataAndImage } from '../FetchAllServices'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import { TextField,Grid,Button,makeStyles,InputLabel,MenuItem,FormControl,Select,Avatar } from '@material-ui/core'
import Swal from 'sweetalert2'
import { isAlphabet, isEmail, isEmpty, isMobile } from '../checks';
import ReactQuill from 'react-quill'; 
import 'react-quill/dist/quill.snow.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Product from './Product'
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

  export default function DisplayProduct(props) {
    DisplayProduct.modules = {
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
    DisplayProduct.formats = [
      'header', 'font', 'size',
      'bold', 'italic', 'underline', 'strike', 'blockquote',
      'list', 'bullet', 'indent',
      'link', 'image', 'video'
    ]
  
  
    const classes = useStyles();
    const [getAllProducts , setAllProducts] = useState([])
    const [open, setOpen] = useState(false);
    const [getListCategory , setListCategory] = useState([])
    const [getListFrameType , setListFrameType] = useState([]);
    const [getAllMaterial , setAllMaterial] =useState([]);
    const [getAllShapes , setAllShapes] = useState([]);
    const [getPicture, setPicture] = useState({ fileName: "", bytes: "" });
    const [getProductName , setProductName] = useState("");
    const [getCategooryId , setCategoryId] = useState("");
    const [getType , setType] = useState("");
    const [getFrameid , setFrameid] = useState("");
    const [getMaterialId,setMateriaId] = useState("");
    const [getShapesId, setShapeId] = useState("");
    const [getDescription ,setDescription] = useState("");
    const [getBtnStatus , setBtnStatus] = useState(false);
    const [getOldPicture , setOldPicture] = useState({fileName:'', bytes:""})
    const [getProductId , setProductId] = useState("");
    const [status , setStatus] = useState("");
    const [adStatus , setAdStatus] = useState("");

    const fetchAllCategory=async()=>{
        var list = await getData("category/fetchallcategory");
        setListCategory(list.data) ;
    }

    const fetchAllFrame =async()=>{
        var list = await getData("frametype/fetchAllframetype")
        setListFrameType(list.data)
    }
    const fetchAllMaterial =async()=>{
        var list = await getData("material/fetchAllMaterial")
        setAllMaterial(list.data)
    }
    const fetchAllShapes =async()=>{
        var list = await getData("shape/fetchAllShape")
        setAllShapes(list.data)
    }

    const handlePicture = (event) => {
      setOldPicture(getPicture.fileName)
        setPicture({
          fileName: URL.createObjectURL(event.target.files[0]),
          bytes: event.target.files[0],
        });
        setBtnStatus(true)
      };

      const handelSavePicture=async(event)=>
      {
        setOpen(false)
        var formdata = new FormData() ;
        formdata.append("productid" , getProductId)
        formdata.append("picture",getPicture.bytes)
        var config = {headers:{"content-type":"multipart/form-data"}}
        var result = await postDataAndImage('product/updateproductpicture',formdata,config)
    if(result)
    {
        {handleClose()}
      Swal.fire({
        position: 'top-center',
        icon: 'success',
        title: 'Product Picture Updated Successfully',
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
    fetchAllProducts()
    setBtnStatus(false)
      }

      const handleCancelPicture=()=>{
        setPicture({fileName:getOldPicture , bytes:''})
          setBtnStatus(false)
      }

    const handleSubmit=async()=>{
      var err = false ;
      if(isEmpty(getProductName))
      {
          err = true;
          toastMessage("Please Enter The Product Name");
      }
      if(isEmpty(getCategooryId))
      {
          err = true;
          toastMessage("Please Select The Category");
      }
      if(isEmpty(getType))
      {
          err = true;
          toastMessage("Please Select Type");
      }
      if(isEmpty(getMaterialId))
      {
          err = true;
          toastMessage("Please Select The Material");
      }
      if(isEmpty(getShapesId))
      {
          err = true;
          toastMessage("Please Select Shape");
      }
      if(isEmpty(getFrameid))
      {
          err = true;
          toastMessage("Please Select Frame");
      }
      if(isEmpty(getPicture.fileName))
      {
          err = true;
          toastMessage("Please Select Picture");
      }
      if(isEmpty(status))
      {
          err = true;
          toastMessage("Please Enter Status");
      }
      if(isEmpty(adStatus))
      {
          err = true;
          toastMessage("Please Select AdStatus");
      }
      var body={
        "productid":getProductId,
        "productname" : getProductName,
        "categoryid" : getCategooryId,
        "type" : getType,
        "frametypeid" : getFrameid,
        "materialid" : getMaterialId,
        "shapeid" : getShapesId,
        "description" : getDescription,
        "picture" : getPicture.fileName,
        "status" : status,
        "adstatus" : adStatus
        }
    
        var result = await postData('product/updateProduct',body)
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
    {fetchAllProducts()}
  }
    

    

    useEffect(function () {
        fetchAllCategory();
        fetchAllFrame();
        fetchAllMaterial();
        fetchAllShapes();
      }, []);

    const fillCategory =()=>{
        return getListCategory.map((item) => {
            return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>;
          });
    }
    const fillFrameType =()=>{
        return getListFrameType.map((item) => {
            return <MenuItem value={item.frameid}>{item.frametypename}</MenuItem>;
          });
    }
    const fillAllMaterial =()=>{
        return getAllMaterial.map((item) => {
            return <MenuItem value={item.matarialid}>{item.materialname}</MenuItem>;
          });
    }
    const fillAllShapes =()=>{
        return getAllShapes.map((item) => {
            return <MenuItem value={item.shapeid}>{item.shapename}</MenuItem>;
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


    const handleClickOpen = (data) => {
      setProductId(data.productid)
      setProductName(data.productname)
      setCategoryId(data.categoryid)
      setType(data.type)
      setFrameid(data.frameid)
      setMateriaId(data.materialid)
      setShapeId(data.shapeid)
      setDescription(data.description)
      setPicture({fileName: `${ServerURL}/images/${data.picture}`, bytes: ''})
      setStatus(data.status)
      setAdStatus(data.adstatus)
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
      setBtnStatus(false)
    };


    const productDialog=()=>{
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
            <span> Edit Product</span>{" "}
          </h1>
          <Grid container spacing={1}>
          <Grid item xs={6}>
          <TextField
              fullWidth
              variant="outlined"
              label="Product Name"
              value={getProductName}
              onChange={(event)=>setProductName(event.target.value)}
            />
            
          </Grid>
          <Grid item xs={6}>
          <FormControl fullWidth variant="outlined">
              <InputLabel id="stateId">Select Category</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                label="Select Category"
                value={getCategooryId}
                onChange={(event)=>setCategoryId(event.target.value)}
              >
               {fillCategory()}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
          <FormControl fullWidth variant="outlined">
              <InputLabel id="stateId">Select Type</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                label="Select Type"
                value={getType}
                onChange={(event)=>setType(event.target.value)}
              >
                  <MenuItem value='Men'>MEN</MenuItem>
                  <MenuItem value='Women'>WOMEN</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
          <FormControl fullWidth variant="outlined">
              <InputLabel id="stateId">Select Frame</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                label="Select Frame"
                value={getFrameid}
                onChange={(event)=>setFrameid(event.target.value)}
              >
                  {fillFrameType()}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
          <FormControl fullWidth variant="outlined">
              <InputLabel id="stateId">Select Material</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                label="Select Material"
                value={getMaterialId}
                onChange={(event)=>setMateriaId(event.target.value)}
              >
                  {fillAllMaterial()}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
          <FormControl fullWidth variant="outlined">
              <InputLabel id="stateId">Select Shape</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                label="Select Shape"
                value={getShapesId}
                onChange={(event)=>setShapeId(event.target.value)}
              >
                  {fillAllShapes()}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
          <TextField
              fullWidth
              variant="outlined"
              label="Status "
              value={status}
              onChange={(event)=>setStatus(event.target.value)}
            />
            
          </Grid>
          <Grid item xs={6}>
          <FormControl fullWidth variant="outlined">
              <InputLabel id="stateId">Ad Status</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                label="Ad Status"
                value={adStatus}
                onChange={(event)=>setAdStatus(event.target.value)}
              >
                  <MenuItem value='Active'>ACTIVE</MenuItem>
                  <MenuItem value='Deactivate'>DEACTIVATE</MenuItem>
              </Select>
            </FormControl>
          </Grid>
         
          <Grid item xs={12}>
          <ReactQuill
            value={getDescription} 
            modules={DisplayProduct.modules}
            formats={DisplayProduct.formats}
            onChange={(txt)=>setDescription(txt)} />
            
            
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
              Submit Product
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



    const handleDeleteProduct= async(data)=>{
      var body=
      {"productid":data.productid}
      
      Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this record!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it'
      }).then(async(result) => {
       
        if (result.isConfirmed) {
          var deleteStoreStatus = await postData('product/deleteProduct',body)
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
      fetchAllProducts()
      })
    }

    const fetchAllProducts=async()=>{
        var list =await getData('product/fetchAllProduct')
        setAllProducts(list.data)
    }
    useEffect(function(){
        fetchAllProducts()
    },[])
    
    function SimpleAction() {
        return (
          <MaterialTable
            title={<div>
              <Button variant="contained" color="primary" startIcon={<AddCircleRoundedIcon fontSize="large" variant="filled"  />} onClick={()=>props.setComponent(<Product/>)}>Add Products</Button>
            </div>}
            columns={[
              { title: 'Product Id', field: 'productid' },
              { title: 'Product Name', field: 'productname' },
              { title: 'Category Name', field: 'categoryname' },
              {title:'Type' , field:'type'},
              {title:'Frame type' , field:'frametypename'},
              {title:'Material' , field:'materialname'},
              {title:'Shape' , field:'shapename'},
              {title:'Status' , field:'status'},
              {title:'AD Status' , field:'adstatus'},
             
              { title: 'Picture', 
            render: rowData=><img width={80} height={60} src={`${ServerURL}/images/${rowData.picture}`} />
            }
            ]}
            data={getAllProducts}        
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
              {productDialog()}
          </div>
          </div>
      )
  }