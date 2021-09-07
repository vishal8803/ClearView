import React,{useState} from  'react'
import { TextField,Grid,Button,makeStyles } from '@material-ui/core'
import { postData } from '../FetchAllServices';
import Swal from 'sweetalert2'
import {  isDigit, isEmpty} from '../checks';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        width:600,
        height:'auto',
        backgroundColor:'#dcdde1',
        borderRadius:5
    },
    input: {
      display: 'none',
    }
}))
export default function AddPrice(){
    const classes = useStyles()
    const [getMinPrice , setMinPrice] = useState('')
    const [getMaxPrice , setMaxPrice] = useState('')

    
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
                "minprice" : getMinPrice,
                "maxprice" : getMaxPrice
                }
            
                var result = await postData('price/insertPrice',body)
            if(result)
            {
                Swal.fire ({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Price Added Successfully',
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
        }
    }

    return (
        <div>
        <div className={classes.root}>
        <div className={classes.subdiv}>
        <h1 style={{textAlign:"center",letterSpacing:2,fontFamily:"cursive"}}>
          <span><img src={'/glasscart.png'} width={50} ></img></span><span> Add Price</span> </h1>
          <Grid container spacing={1}>
              <Grid item xs={6}>
            <TextField label='Min Price' onChange={(event)=>setMinPrice(event.target.value)}  variant='outlined' fullWidth  />
            </Grid>
            <Grid item xs={6}>
            <TextField label='Max Price' onChange={(event)=>setMaxPrice(event.target.value)}  variant='outlined' fullWidth  />
            </Grid>
            
      <Grid item xs={12}>
        <Button onClick={()=>handleSubmit()} variant="contained" fullWidth color="primary">Add Price</Button>
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
    );
}