import { useEffect, useState } from "react"
import React from 'react'
import { getData,ServerURL,postData,postDataAndImage } from "../FetchAllServices"
import MaterialTable from "material-table"
import { makeStyles,TextField,Button,Grid,Avatar } from "@material-ui/core"
import Swal from 'sweetalert2'
import { isAlphabet, isEmpty} from '../checks';
import { ToastContainer, toast } from 'react-toastify';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import AddCategory from './AddCategory'
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded"
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

export default function DisplayCategory(props)
{
    const classes = useStyles()
    const [getCategory , setCategory] = useState('')
    const [getIcon , setIcon] = useState({fileName:"" , bytes:""})
    const [getCategoryId , setCategoryId] = useState('')
    const [getAllCategory , setAllCategory] = useState([])
    const [open, setOpen] = useState(false);
    const [ getBtnStatus,setBtnStatus ] = useState(false);
    const [getOldPicture , setOldPicture] = useState({fileName:'', bytes:""})

    const fetchAllCategory=async()=>{
        var list =await getData('category/fetchAllCategory')
        setAllCategory(list.data)
    }

    useEffect(function(){
        fetchAllCategory()
    },[])

    const handlePicture=(event)=>
    {
        setOldPicture(getIcon.fileName)
        setIcon({fileName:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
        setBtnStatus(true)
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

    const handleSubmit = async()=>{
        var err = false ;
        if(isEmpty(getCategory))
        {
          err = true ;
          toastMessage("Please Enter The Category Name")
        }else{
          if(!isAlphabet(getCategory))
          {
            
            err =true ;
            toastMessage("Please Enter A Valid Category Name")
          }
        }
        if(isEmpty(getIcon.fileName))
        {
            err = true ;
            toastMessage("Please Upload the Icon")
        }
        if(!err)
        {
            var body={
                "categoryid":getCategoryId,
                "categoryname" : getCategory,
                "icon" : getIcon.bytes
                }
            
                var result = await postData('category/updateCategory',body)
            if(result)
            {
                {handleClose()}
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Category Updated Successfully',
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
            {fetchAllCategory()}
        }
    }


    const handleClickOpen = (data) => {
        setCategoryId(data.categoryid)
        setCategory(data.categoryname)
        setIcon({ fileName: `${ServerURL}/images/${data.icon}`, bytes: '' });
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
      const handleCamcelPicture=()=>{
   
        setIcon({fileName:getOldPicture , bytes:''})
        setBtnStatus(false)
      }
      
  const handleSavePicture=async()=>{
    setOpen(false)
   
    var formdata = new FormData() ;
    formdata.append("categoryid" , getCategoryId)
    formdata.append("icon",getIcon.bytes)
    var config = {headers:{"content-type":"multipart/form-data"}}
    var result = await postDataAndImage('category/updateIconCategory',formdata,config)
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
    fetchAllCategory()
    setBtnStatus(false)
  }


    const categoryDialog=()=>{
        return(
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
       <DialogTitle id="form-dialog-title"><h1 style={{textAlign:"center",letterSpacing:2,fontFamily:"cursive"}}>
          <span><img src={'/glasscart.png'} width={50} ></img></span><span> Edit Category</span> </h1> </DialogTitle>
        <DialogContent>
        <div>
        <div className={classes.root}>
        <div className={classes.subdiv}>
       
          <Grid container spacing={1}>
              <Grid item xs={12}>
            <TextField label='Category' value={getCategory} onChange={(event)=>setCategory(event.target.value)}  variant='outlined' fullWidth />
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
          Edit Icon
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
        <Button onClick={()=>handleSubmit()} variant="contained" fullWidth color="primary">Edit Category</Button>
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
    {"categoryid":data.categoryid}
    
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this record!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then(async(result) => {
     
      if (result.isConfirmed) {
        var deleteCategoryStatus = await postData('category/deleteCategory',body)
        if(deleteCategoryStatus){
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
    fetchAllCategory()
    })
   
  }

    function SimpleAction() {
        return (
          <MaterialTable
            title={<div>
              <Button variant="contained" color="primary" startIcon={<AddCircleRoundedIcon fontSize="large" variant="filled"  />} onClick={()=>props.setComponent(<AddCategory/>)}>Add Category</Button>
            </div>}
            columns={[
              { title: 'Category ID', field: 'categoryid' },
              { title: 'Category Name', field: 'categoryname' },
              { title: 'Picture', 
            render: rowData=><img width={80} height={60} src={`${ServerURL}/images/${rowData.icon}`} />
            }
            ]}
            data={getAllCategory}        
            actions={[
                {
                  icon: 'edit',
                  tooltip: 'Edit',
                  onClick: (event, rowData) => handleClickOpen(rowData)
                },
              {
                icon: 'delete',
                tooltip: 'Delete',
                onClick: (event, rowData) => handleDelete(rowData)
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
        {categoryDialog()}
    </div>
    </div>
    </div>
    );
}