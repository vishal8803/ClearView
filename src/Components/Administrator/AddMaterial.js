import React,{useState} from  'react'
import { TextField,Grid,Button,makeStyles,Avatar,Select,FormControl,InputLabel,MenuItem } from '@material-ui/core'
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
export default function AddMaterial(){
    const classes = useStyles()
    const [getMaterial , setMaterial] = useState('')
    const [getStatus , setStatus] = useState('')
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
        if(isEmpty(getMaterial))
        {
          err = true ;
          toastMessage("Please Enter The Material Name")
        }else{
          if(!isAlphabet(getMaterial))
          {
            
            err =true ;
            toastMessage("Please Enter A Valid Material Name")
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
            var formdata = new FormData() ;
            formdata.append("materialname" , getMaterial)
            formdata.append("adpicture",getIcon.bytes)
            formdata.append("status",getStatus)
            var config = {headers:{"content-type":"multipart/form-data"}}
            var result = await postDataAndImage('material/insertMaterial',formdata,config)
            if(result)
            {
                Swal.fire ({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Material Added Successfully',
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
          <span><img src={'/glasscart.png'} width={50} ></img></span><span> Add Material</span> </h1>
          <Grid container spacing={1}>
              <Grid item xs={6}>
            <TextField label='Material Name' onChange={(event)=>setMaterial(event.target.value)}  variant='outlined' fullWidth  />
            </Grid>
            <Grid item xs={6}>
            <FormControl variant="outlined" fullWidth className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Status</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
        //   value={age}
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
        
        <Button  variant="contained" color="primary" component="span">
          Upload Icon
        </Button>
      </label>
      </Grid>
      <Grid item xs={6} style={{display:"flex",justifyContent:"center",alignItems:"center"}} >
      <Avatar src={getIcon.fileName} alt="Remy Sharp" variant="rounded" style={{width:80,height:80}} className={classes.large} />
      </Grid>
      <Grid item xs={12}>
        <Button onClick={()=>handleSubmit()} variant="contained" fullWidth color="primary">Add Material</Button>
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