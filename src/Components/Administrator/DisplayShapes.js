import { useEffect, useState } from "react"
import React from 'react'
import { getData,ServerURL,postData,postDataAndImage } from "../FetchAllServices"
import MaterialTable from "material-table"
import { makeStyles,TextField,Button,Grid,Avatar,Select,FormControl,InputLabel,MenuItem  } from "@material-ui/core"
import Swal from 'sweetalert2'
import { isAlphabet, isEmpty} from '../checks';
import { ToastContainer, toast } from 'react-toastify';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded"
import AddShapes from './AddShapes'
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
        width:900,
        height:'auto',
        backgroundColor:'#dcdde1',
        borderRadius:5
    },
    input: {
      display: 'none',
    }
}))

export default function DisplayShapes(props){
    const classes = useStyles()
    const [getAllShape , setAllShape] = useState([])
    const [open, setOpen] = useState(false);
    const [getShape , setShape] = useState('')
    const [getStatus , setStatus] = useState('')
    const [getIcon , setIcon] = useState({fileName:"" , bytes:""})
    const [getShapeId , setShapeId] = useState('')
    const [getBtnStatus , setBtnStatus] = useState(false);
    const [getOldPicture , setOldPicture] = useState({fileName:'', bytes:""})

    const fetchAllShape=async()=>{
        var list =await getData('shape/fetchAllShape')
        setAllShape(list.data)
    }

    useEffect(function(){
        fetchAllShape()
    },[])

    const handleClickOpen = (data) => {
        setShape(data.shapename)
        setStatus(data.status)
        setShapeId(data.shapeid)
        setIcon({fileName:`${ServerURL}/images/${data.adpicture}` , bytes:''})
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const handlePicture=(event)=>
    {
        setOldPicture(getIcon.fileName)
        setIcon({fileName:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
        setBtnStatus(true)
    }

    const handleSubmit = async()=>{
        var err = false ;
        if(isEmpty(getShape))
        {
          err = true ;
          toastMessage("Please Enter The Category Name")
        }else{
          if(!isAlphabet(getShape))
          {
            
            err =true ;
            toastMessage("Please Enter A Valid Category Name")
          }
        }
        if(isEmpty(getStatus))
        {
            err = true ;
            toastMessage('Please Select the Status')
        }
        if(isEmpty(getIcon.fileName))
        {
            err = true ;
            toastMessage("Please Upload the Icon")
        }
        if(!err)
        {
            var body={
                "shapeid":getShapeId,
                "shapename" : getShape,
                "status" : getStatus
                }
            
                var result = await postData('shape/updateshape',body)
            if(result)
            {
                {handleClose()}
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Shape Updated Successfully',
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
            {fetchAllShape()}
        }
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

      const handleCamcelPicture=()=>{
        setIcon({fileName:getOldPicture , bytes:''})
          setBtnStatus(false)
      }

    const handleSavePicture=async()=>{
        setOpen(false)
        var formdata = new FormData() ;
        formdata.append("shapeid" , getShapeId)
        formdata.append("adpicture",getIcon.bytes)
        var config = {headers:{"content-type":"multipart/form-data"}}
        var result = await postDataAndImage('shape/updateShapePicture',formdata,config)
    if(result)
    {
      Swal.fire({
        position: 'top-center',
        icon: 'success',
        title: 'Icon Updated Successfully',
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
    fetchAllShape()
    setBtnStatus(false)
      }


    const shapeDialog=()=>{
        return(
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title"><h1 style={{textAlign:"center",letterSpacing:2,fontFamily:"cursive"}}>
          <span><img src={'/glasscart.png'} width={50} ></img></span><span> Edit Shapes</span> </h1></DialogTitle>
        <DialogContent>
        <div>
        <div className={classes.root}>
        <div className={classes.subdiv}>
        
          <Grid container spacing={1}>
              <Grid item xs={6}>
            <TextField label='Shape Name' value={getShape} onChange={(event)=>setShape(event.target.value)}  variant='outlined' fullWidth  />
            </Grid>
            <Grid item xs={6}>
            <FormControl variant="outlined" fullWidth className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Status</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
        //   value={age}
        value={getStatus}
          onChange={(event)=>setStatus(event.target.value)}
          label="Status"
        >
          <MenuItem value={'Activate'}>Activate</MenuItem>
          <MenuItem value={'Deactivate'}>Deactivate</MenuItem>
        </Select>
      </FormControl>
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
          Edit Picture
        </Button>
        </>:<></>}
      </label>
      {getBtnStatus?<div style={{display:'flex' , justifyContent:'space-evenly'}}>
        <Button component="span" onClick={()=>handleSavePicture()} >
          Save
        </Button>
        <Button  component="span" onClick={()=>handleCamcelPicture()}>
          Cancel
        </Button>
        </div>:<></>}
      </Grid>
      <Grid item xs={6} style={{display:"flex",justifyContent:"center",alignItems:"center"}} >
      <Avatar src={getIcon.fileName} alt="Remy Sharp" variant="rounded" style={{width:80,height:80}} className={classes.large} />
      </Grid>
      <Grid item xs={12}>
        <Button onClick={()=>handleSubmit()} variant="contained" fullWidth color="primary">Edit Shape</Button>
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
          </Button>
        </DialogActions>
      </Dialog>
        )
    }

    const handleDelete= async(data)=>{
        var body=
        {"shapeid":data.shapeid}
        
        Swal.fire({
          title: 'Are you sure?',
          text: 'You will not be able to recover this record!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'No, keep it'
        }).then(async(result) => {
         
          if (result.isConfirmed) {
            var deleteShapeStatus = await postData('shape/deleteShape',body)
            if(deleteShapeStatus){
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
        fetchAllShape()
        })
       
      }


    function SimpleAction() {
        return (
          <MaterialTable
            title={<div>
              <Button variant="contained" color="primary" startIcon={<AddCircleRoundedIcon fontSize="large" variant="filled"  />} onClick={()=>props.setComponent(<AddShapes/>)}>Add Shapes</Button>
            </div>}
            columns={[
              { title: 'Shape ID', field: 'shapeid' },
              { title: 'Shape Name', field: 'shapename' },
              { title: 'Status', field: 'status' },
              { title: 'AD Picture', 
            render: rowData=><img width={80} height={60} src={`${ServerURL}/images/${rowData.adpicture}`} />
            }
            ]}
            data={getAllShape}        
            actions={[
                {
                  icon: 'edit',
                  tooltip: 'Edit',
                  onClick: (event, rowData) => handleClickOpen(rowData)
                },
              {
                icon: 'delete',
                tooltip: 'Delete',
                onClick: (event, rowData) =>  handleDelete(rowData)
              }
            ]}
          />
        )
      }


    return(
        <div>
            <div className={classes.root}>
        <div className={classes.subdiv}>
            {SimpleAction()}
            {shapeDialog()}
            </div>
            </div>
        </div>
    )
}