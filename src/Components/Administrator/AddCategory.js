import React,{useState} from  'react'
import { TextField,Grid,Button,makeStyles,Avatar } from '@material-ui/core'
import { postDataAndImage } from '../FetchAllServices';
import Swal from 'sweetalert2'
import { isAlphabet, isEmpty} from '../checks';
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
export default function AddCategory(){
    const classes = useStyles()
    const [getCategory , setCategory] = useState('')
    const [getIcon , setIcon] = useState({fileName:"" , bytes:""})

    const handlePicture=(event)=>
    {
        setIcon({fileName:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
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
            var formdata = new FormData() ;
            formdata.append("categoryname" , getCategory)
            formdata.append("icon",getIcon.bytes)
            var config = {headers:{"content-type":"multipart/form-data"}}
            var result = await postDataAndImage('category/insertCategory',formdata,config)
            if(result)
            {
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Category Added Successfully',
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
          <span><img src={'/glasscart.png'} width={50} ></img></span><span> Add Category</span> </h1>
          <Grid container spacing={1}>
              <Grid item xs={12}>
            <TextField label='Category' onChange={(event)=>setCategory(event.target.value)}  variant='outlined' fullWidth />
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
        
        <Button  variant="contained" color="primary" component="span">
          Upload Icon
        </Button>
      </label>
      </Grid>
      <Grid item xs={6} style={{display:"flex",justifyContent:"center",alignItems:"center"}} >
      <Avatar src={getIcon.fileName} alt="Remy Sharp" variant="rounded" style={{width:80,height:80}} className={classes.large} />
      </Grid>
      <Grid item xs={12}>
        <Button onClick={()=>handleSubmit()} variant="contained" fullWidth color="primary">Add Category</Button>
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