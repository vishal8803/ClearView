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
import ReactQuill from 'react-quill'; 
import 'react-quill/dist/quill.snow.css';
import Swal from "sweetalert2";
import { isAlphabet, isEmail, isEmpty, isMobile } from "../checks";
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

export default function Product(props) {
  Product.modules = {
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
  Product.formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
  ]


    const classes = useStyles();
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
        setPicture({
          fileName: URL.createObjectURL(event.target.files[0]),
          bytes: event.target.files[0],
        });
      };

    

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
        if(!err)
        {
            var formdata = new FormData();
            formdata.append("productname",getProductName)
            formdata.append("categoryid",getCategooryId)
            formdata.append("type",getType)
            formdata.append("frametypeid",getFrameid)
            formdata.append("materialid",getMaterialId)
            formdata.append("shapeid",getShapesId)
            formdata.append("description",getDescription)
            formdata.append("picture",getPicture.bytes)
            formdata.append("status" , status)
            formdata.append("adstatus",adStatus)
            var config = { headers: { "content-type": "multipart/form-data" } };
            var result = await postDataAndImage("product/insertProduct",formdata,config);

            if(result)
            {
                Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: "Product Added Successfully",
                    showConfirmButton: false,
                    timer: 2000,
                  });
                  setProductName("")
                  setCategoryId("")
                  setType("")
                  setFrameid("")
                  setMateriaId("")
                  setShapeId("")
                  setStatus("")
                  setAdStatus("")
                  setDescription("")
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
            <span> Add Product</span>{" "}
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
            modules={Product.modules}
            formats={Product.formats}
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
  );
}
