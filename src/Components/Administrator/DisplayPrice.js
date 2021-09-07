import { useEffect, useState } from "react"
import React from 'react'
import { getData,postData } from "../FetchAllServices"
import MaterialTable from "material-table"
import { makeStyles,TextField,Button,Grid } from "@material-ui/core"
import Swal from 'sweetalert2'
import { isEmpty} from '../checks';
import { ToastContainer, toast } from 'react-toastify';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded"
import AddPrice from './AddPrice'

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

export default function DisplayPrice(props){
    const classes = useStyles()
    const [getAllPrice , setAllPrice] = useState([])
    const [open, setOpen] = useState(false);
    const [getMinPrice , setMinPrice] = useState('')
    const [getMaxPrice , setMaxPrice] = useState('')
    const [getPriceId , setPriceId] = useState('')

    const fetchAllPrice=async()=>{
        var list =await getData('price/fetchAllPrice')
        setAllPrice(list.data)
    }

    useEffect(function(){
        fetchAllPrice()
    },[])

    const handleClickOpen = (data) => {
        setMinPrice(data.minprice)
        setMaxPrice(data.maxprice)
        setPriceId(data.priceid)
       
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };


    const handleSubmit = async()=>{
        var err = false ;
        if(isEmpty(getMinPrice))
        {
          err = true ;
          toastMessage("Please Enter The Min Price ")
        }
        if(isEmpty(getMaxPrice))
        {
          err = true ;
          toastMessage("Please Enter The Max Name")
        }
        if(!err)
        {
            var body={
                "priceid" : getPriceId,
                "minprice" : getMinPrice,
                "maxprice" : getMaxPrice
                }
            
                var result = await postData('price/updateprice',body)
            if(result)
            {
                {handleClose()}
                Swal.fire ({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Price Updated Successfully',
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
        }
        fetchAllPrice()
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

      
    const shapeDialog=()=>{
        return(
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title"><h1 style={{textAlign:"center",letterSpacing:2,fontFamily:"cursive"}}>
          <span><img src={'/glasscart.png'} width={50} ></img></span><span> Edit Price</span> </h1></DialogTitle>
        <DialogContent>
        <div>
        <div className={classes.root}>
        <div className={classes.subdiv}>
        
        <Grid container spacing={1}>
              <Grid item xs={6}>
            <TextField label='Min Price' value={getMinPrice} onChange={(event)=>setMinPrice(event.target.value)}  variant='outlined' fullWidth  />
            </Grid>
            <Grid item xs={6}>
            <TextField label='Max Price' value={getMaxPrice} onChange={(event)=>setMaxPrice(event.target.value)}  variant='outlined' fullWidth  />
            </Grid>
            
      <Grid item xs={12}>
        <Button onClick={()=>handleSubmit()} variant="contained" fullWidth color="primary">Edit Price</Button>
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
        )
    }

    const handleDelete= async(data)=>{
        var body=
        {"priceid":data.priceid}
        
        Swal.fire({
          title: 'Are you sure?',
          text: 'You will not be able to recover this record!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'No, keep it'
        }).then(async(result) => {
         
          if (result.isConfirmed) {
            var deleteShapeStatus = await postData('price/deltePrice',body)
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
        fetchAllPrice()
        })
       
      }


    function SimpleAction() {
        return (
          <MaterialTable
            title={<div>
              <Button variant="contained" color="primary" startIcon={<AddCircleRoundedIcon fontSize="large" variant="filled"  />} onClick={()=>props.setComponent(<AddPrice/>)}>Add Prices</Button>
            </div>}
            columns={[
              { title: 'Price ID', field: 'priceid' },
              { title: 'Min Price', field: 'minprice' },
              { title: 'Max Price', field: 'maxprice' },
             
            ]}
            data={getAllPrice}        
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