import React, { useEffect, useState } from 'react'
import MaterialTable from 'material-table'
import { getData, ServerURL,postData, postDataAndImage } from '../FetchAllServices'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { TextField,Grid,Button,makeStyles,InputLabel,MenuItem,FormControl,Select,Avatar } from '@material-ui/core'
import Swal from 'sweetalert2'
import { isAlphabet, isEmail, isEmpty, isMobile } from '../checks';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddStoreCity from './addStoreCity';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
const useStyles = makeStyles((theme) => ({
    root:{
        display:'flex' ,
        justifyContent:'center',
        alignContent:'center',
        margin:20,
        padding:20
    },
    subdiv:{
        padding:20,
        width:'90%',
        height:'auto',
        backgroundColor:'#dcdde1',
        borderRadius:5
    },
    droot:{
      display:'flex' ,
      justifyContent:'center',
      alignContent:'center',
      // margin:20,
      // padding:20
  },
  dsubdiv:{
      padding:15,
      width:'90%',
      height:'auto',
      backgroundColor:'#dcdde1',
      borderRadius:5
  },
    input: {
      display: 'none',
    },
}))

export default function DisplayAllStore(props)
{
    const classes = useStyles()
    const [getAllStores , setAllStores] = useState([])
    const [open, setOpen] = useState(false);
    const [getState,setState] = useState("")
    const [getListState,setListState] = useState([])
    const [getCity , setCity] = useState("") 
    const [getStoreName , setStoreName] = useState("")
    const [getAddressOne , setAddressOne ] = useState("")
    const [getAddressTwo , setAddressTwo ] = useState("")
    const [getLandmark , setLandmark] = useState("")
    const [getLattitutde , setLattittude] = useState("")
    const [getLongitude , setLongitude] = useState("")
    const [getMobileNumber , setMobileNumber] = useState("")
    const [getEmaiLAddress , setEmailAddress] = useState("")
    const [getPicture , setPicture] = useState({fileName:'', bytes:""})
    const [getOldPicture , setOldPicture] = useState({fileName:'', bytes:""})
    const [getStoreId ,setStoreId] = useState("")
    const [getBtnStatus ,setBtnStatus] = useState(false)

  const fetchAllState = async()=>{
    var list =await getData('stores/fetchallstates')
    
    setListState(list.data)
  }

  useEffect(function(){
    fetchAllState()
  },[])

  const fillState=()=>{
    return getListState.map((item)=>{
      return  <MenuItem value={item.stateName}>{item.stateName}</MenuItem>
    })
  }
  const toastMessage=(message)=>{
    toast.info(`${message}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      progress:0,
      draggable: true,
      });
  }

  const handleSavePicture=async()=>{
    setOpen(false)
   
    var formdata = new FormData() ;
    formdata.append("storeId" , getStoreId)
    formdata.append("picture",getPicture.bytes)
    var config = {headers:{"content-type":"multipart/form-data"}}
    var result = await postDataAndImage('stores/updatetPictureStore',formdata,config)
    if(result)
    {
      Swal.fire({
        position: 'top-center',
        icon: 'success',
        title: 'Picture Updated Successfully',
        showConfirmButton: false,
        timer: 2000
      })
    }else
    {
      Swal.fire({
        position: 'top-center',
        icon: 'error',
        title: 'Your work has not been saved',
        showConfirmButton: false,
        timer: 1500
      }) 
    }
    fetchAllStores()
    setBtnStatus(false)
  }

  const handleCamcelPicture=()=>{
   
    setPicture({fileName:getOldPicture , bytes:''})
    setBtnStatus(false)
  }

  const handlePicture=(event)=>{
  setOldPicture(getPicture.fileName)
    setPicture({fileName:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
    
    setBtnStatus(true)
  }

  const handleSubmit=async()=>{
    var err = false;
    if(isEmpty(getState))
    {
      err = true ;
      toastMessage("Please Select The State")
    }

    if(isEmpty(getCity))
    {
      err = true ;
      toastMessage("Please Enter The City Name")
    }else{
      if(!isAlphabet(getCity))
      {
        
        err =true ;
        toastMessage("Please Enter A Valid Ciy Name")
      }
    }

    if(isEmpty(getStoreName))
    {
      err = true ;
      toastMessage("Please Enter The Store Name")
    }

    if(isEmpty(getAddressOne))
    {
      err = true ;
      toastMessage("Please Enter The Address One")
    }

    if(isEmpty(getMobileNumber))
    {
      err = true ;
      toastMessage("Please Enter Contact Number")
    }else
    {
      if(!isMobile(getMobileNumber))
      {
        err = true ;
        toastMessage("Please Enter The Correct Mobile Number")
      }
    }

    if(isEmpty(getEmaiLAddress))
    {
      err=true ;
      toastMessage("Please Enter Email Address")
    }else
    {
      if(!isEmail(getEmaiLAddress))
      {
        err=true ;
        toastMessage("Please Enter Correct Email Adress")
      }
    }

    if(isEmpty(getPicture.fileName))
    {
      err = true ;
      toastMessage("Please Upload The Picture")
    }

    
    if(!err){
      
    var body={
    "storeId":getStoreId,
    "state" : getState,
    "city" : getCity,
    "storename" : getStoreName,
    "addressone" : getAddressOne,
    "addresstwo" : getAddressTwo,
    "landmark" : getLandmark,
    "longitude" : getLongitude,
    "lattitude" : getLattitutde,
    "emailaddress" : getEmaiLAddress,
    "mobilenum" : getMobileNumber,
    "picture" : getPicture.bytes
    }

    var result = await postData('stores/updateStore',body)
    if(result)
    {
      {handleClose()}
      Swal.fire({
        position: 'top-center',
        icon: 'success',
        title: 'Store Updated Successfully',
        showConfirmButton: false,
        timer: 2000
      })
    }else
    {
      {handleClose()}
      Swal.fire ({
        position: 'top-center',
        icon: 'error',
        title: 'Store Does Not Updated',
        showConfirmButton: false,
        timer: 1500
      }) 
    }
  }
  {fetchAllStores()}
  // {window.location.reload()}
}

  const handleDeleteStore= async(data)=>{
    var body=
    {"storeId":data.storeId}
    
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this record!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then(async(result) => {
     
      if (result.isConfirmed) {
        var deleteStoreStatus = await postData('stores/deleteStore',body)
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
    fetchAllStores()
    })
   
  }



    const handleClickOpen = (data) => {
      setStoreId(data.storeId)
      setState(data.storeState)
      setCity(data.storeCity)
      setEmailAddress(data.email)
      setStoreName(data.storeName)
      setAddressOne(data.addressOne)
      setAddressTwo(data.addressTwo)
      setLandmark(data.landmark)
      setLattittude(data.lat)
      setLongitude(data.lng)
      setMobileNumber(data.contactNumber)
      setPicture({ fileName: `${ServerURL}/images/${data.picture}`, bytes: '' });
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    
    const storeDialog=()=>{
      return (
        <div>
          <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title"><h1 style={{textAlign:"center",letterSpacing:2,fontFamily:"cursive"}}>
          <span><img src={'/glasscart.png'} width={50} ></img></span><span> Edit Store</span> </h1> </DialogTitle>
            <DialogContent>
           
            <div className={classes.droot}>
        <div className={classes.dsubdiv}>
         <Grid container spacing={1}>
            <Grid item xs={6}>
        <FormControl fullWidth variant="outlined" >
        <InputLabel  id="stateId">Select State</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          //value={age}
          value={getState}
          onChange={(event)=>setState(event.target.value)}
          label="Select State"
        >
          {fillState()}
          
        </Select>
      </FormControl> 
      </Grid>
      <Grid item xs={6} >
        <TextField  value={getCity} fullWidth variant="outlined" label="City"
        onChange={(event)=>setCity(event.target.value)}
        />
      </Grid>
      <Grid item xs={12} >
        <TextField  value={getStoreName} fullWidth variant="outlined" label="Store Name"
        onChange={(event)=>setStoreName(event.target.value)}
        />
      </Grid>
      <Grid item xs={12} >
        <TextField  value={getAddressOne} fullWidth variant="outlined" label="Address One"
        onChange={(event)=>setAddressOne(event.target.value)}
        />
      </Grid>
      <Grid item xs={12} >
        <TextField value={getAddressTwo} fullWidth variant="outlined" label="Address Two"
        onChange={(event)=>setAddressTwo(event.target.value)}
        />
      </Grid>
      
      <Grid item xs={12} >
        <TextField  value={getLandmark} fullWidth variant="outlined" label="Landmark"
        onChange={(event)=>setLandmark(event.target.value)}
        />
      </Grid>
      <Grid item xs={6} >
        <TextField  value={getLattitutde}  fullWidth variant="outlined" label="Lattitude"
        onChange={(event)=>setLattittude(event.target.value)}
        />
      </Grid>
      <Grid item xs={6} >
        <TextField  value={getLongitude} fullWidth variant="outlined" label="Longitude"
        onChange={(event)=>setLongitude(event.target.value)}
        />
      </Grid>
      <Grid item xs={6} >
        <TextField value={getMobileNumber} fullWidth variant="outlined" label="Contact Number"
        onChange={(event)=>setMobileNumber(event.target.value)}
        />
      </Grid>
      <Grid item xs={6} >
        <TextField value={getEmaiLAddress} fullWidth variant="outlined" label="Email Address"
        onChange={(event)=>setEmailAddress(event.target.value)}
        />
      </Grid>
      <Grid item xs={6} style={{display:"flex",justifyContent:"center",alignItems:"center"}} >
      <input 
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        
        onChange={(event)=> handlePicture(event)}
      />
      <label htmlFor="contained-button-file">
        {!getBtnStatus?<>
        <Button  variant="contained" color="primary" component="span">
          Edit Image
        </Button>
        </>:<></>}
        

      </label>
      {getBtnStatus?<div style={{display:'flex' , justifyContent:'space-evenly'}}>
        <Button component="span" onClick={()=>handleSavePicture()}>
          Save
        </Button>
        <Button  component="span" onClick={()=>handleCamcelPicture()}>
          Cancel
        </Button>
        </div>:<></>}
      </Grid>
      <Grid item xs={6} style={{display:"flex",justifyContent:"center",alignItems:"center"}} >
      <Avatar src={getPicture.fileName} alt="Remy Sharp" variant="rounded" style={{width:80,height:80}} className={classes.large} />
      </Grid>

      <Grid item sm={12}>
      <Button onClick={()=>handleSubmit()} fullWidth variant="contained" color="primary">Edit Store</Button>
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
      );
    }

    const fetchAllStores=async()=>{
        var list =await getData('stores/fetchAllStores')
        setAllStores(list.data)
    }
    useEffect(function(){
        fetchAllStores()
    },[])

    function SimpleAction() {
        return (
          <MaterialTable
            title= {<div>
              <Button variant="contained" color="primary" startIcon={<AddCircleRoundedIcon fontSize="large" variant="filled"  />} onClick={()=>props.setComponent(<AddStoreCity/>)}>Add Stores</Button>
            </div>}
            columns={[
              { title: 'Store Id', field: 'storeId' },
              { title: 'Store Name',
              render: rowData => <div><b>{rowData.storeName}</b><br/>{rowData.addressOne}, {rowData.addressTwo}</div>
            }, { title: 'City/ State', 
            render: rowData=> <div>{rowData.storeCity} <br/> {rowData.storeState}</div>
            }, { title: 'Contact/ Email', 
            render: rowData=> <div> {rowData.contactNumber}<br/>{rowData.email} </div>
            }, { title: 'Location', 
            render: rowData=> <div> {rowData.lat}  {rowData.lng} </div>
            }, { title: 'Picture', 
            render: rowData=><img width={80} height={60} src={`${ServerURL}/images/${rowData.picture}`} />
            }
            ]}
            data={getAllStores}        
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit Shop',
                onClick: (event, rowData) =>handleClickOpen(rowData)
              },
              {
                icon: 'delete',
                tooltip: 'Delete Shop',
                onClick: (event, rowData) =>handleDeleteStore(rowData)
              }
            ]}
          />
        )
      }
      
    return (
        <div className={classes.root}>
            <div className={classes.subdiv}>
        <div>
            {SimpleAction()}
            {storeDialog()}
        </div>
        </div>
        </div>
    )
}