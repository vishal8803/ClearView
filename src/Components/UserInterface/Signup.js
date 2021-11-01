import React, { useState, useEffect } from "react";
import Grid from '@mui/material/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Footer from "./Footer";
import Header from "./Header";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import OtpInput from 'react-otp-input';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import { Button } from "@material-ui/core";
import "./style.css"
import {postData} from "../FetchAllServices"
import { isMobile } from "../checks";
import { ToastContainer, toast } from 'react-toastify';
import { useSelector, useDispatch } from "react-redux";


const useStyles = makeStyles((theme) => ({
    root: {

        color: 'red',
        height: '20'
    }

}))



const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
}));



export default function Signup(props) {
    const classes = useStyles();
    const [otp , setOtp] = useState('')
    const [generatedOtp , setGeneratedOtp] = useState('')
    const [otpStatus , setOtpStatus] = useState(false)
    const [mobileNum, setMobileNum] = useState('')

    var dispatch = useDispatch();
    var productInCart = useSelector((state) => state.cart);
    var keys = Object.keys(productInCart);


    const toastMessage=(message)=>{
        toast.warn(`${message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          progress:0,
          draggable: true,
          });
      }
    
    const handleChange=(value)=>{
        setOtp(value)
    }

    const verifyOtp=()=>{
        if(otp==generatedOtp)
        {
            if(keys.length==0)
            props.history.push({pathname:'/home'})
            else
            props.history.push({pathname:'/mycart'})
        }else
        {
            toastMessage("Please enter the correct otp")
        }
    }

    const handleSendOtp=async()=>{

        if(isMobile(mobileNum))
        {
            var body = {mobileNum:mobileNum}
            var result =await postData('userDetails/checkMobileNumber',body);
            if(result.result)
            {
                var otp = 1000+parseInt(Math.random()*8999);
                alert(otp)
                // result =await postData('sendsms/sendotp',body);
                // if(result.result)
                // {
                // }
                setGeneratedOtp(otp);
                setOtpStatus(true);
                dispatch({type:"ADD_USER",payload:[result.data[0].mobileNum,result.data[0]]});
                setOtp('');
                
            }else
            {
                var otp = 1000+parseInt(Math.random()*8999);
                body = {mobileNum:mobileNum,otp:otp}
                
                alert(otp)
                // result =await postData('sendsms/sendotp',body);
                // if(result.result)
                // {
                // }
                setGeneratedOtp(otp)
                
                props.history.push({pathname:'/userlogin'},{otp:otp,mobileNum:mobileNum});
            }
        }else
        {
            toastMessage("Mobile Number Not Valid");
        }
        
        
    }

    return (
        <div>
            <Header history={props.history} />

            <Box sx={{ flexGrow: 1 }}>
                <Grid cotainer spacing={2} >
                    <Item style={{ display: 'flex', margin: 30 }}>
                        <Grid item xs={8}>
                            <img src='pic2.jpg' width='100%' style={{ borderRadius: 10 }} />
                        </Grid>
                        <Grid item xs={4} style={{ border: '1px solid grey', marginLeft: 10, marginRight: 10, borderRadius: 5 }} >
                            <div>
                                <div style={{ textAlign: 'center' }}>
                                    <svg class="MuiSvgIcon-root jss5" focusable="false" viewBox="0 0 24 24" aria-hidden="true" variant="filled" aria-label="menu" style={{ fontSize: 60, border: '2px solid black', color: 'black', borderRadius: '50%', textAlign: 'center', marginTop: 10 }}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"></path></svg>
                                </div>
                               
                                <div style={{ lineHeight: 1, margin: 20 }}>
                                {otpStatus?  <Button style={{float:'right',fontSize:14,color:'red'}}onClick={()=>setOtpStatus(false)} >Resend OTP</Button>:<></>}
                                  {!otpStatus?  <h1>Sign in</h1>:<h1>Enter OTP</h1>}
                                
                                  {!otpStatus?   <p style={{ color: 'grey' }}>Sign in to access your Orders, Offers and Wishlist.</p>
                                  :  <p style={{ lineHeight: 0.5,fontSize:12 }}>We have sent 4 digit OTP on +91-<b>{mobileNum}</b></p>}

                                {!otpStatus?
                                    <TextField
                                        onChange={(event)=>setMobileNum(event.target.value)}
                                        style={{ marginTop: 15 }}
                                        id="input-with-icon-textfield"
                                        label="Enter Your mobile no."
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    +91 |
                                                </InputAdornment>
                                            ),
                                        }}
                                        variant="outlined"
                                        fullWidth
                                    />:
                                     <OtpInput
                                       style={{ marginTop: 15 }}
                                        value={otp}
                                        onChange={(value)=>handleChange(value)}
                                        numInputs={4}
                                        inputStyle="inputStyle"
                                        separator={<span>-</span>}
                                    />
                                }
                                    {!otpStatus?
                                    <Button variant="contained" endIcon={<SendIcon />} fullWidth style={{color: '#fff', background: '#50526e',marginTop:20}} onClick={()=>handleSendOtp()} >
                                        Send
                                    </Button>:<Button variant="contained" fullWidth style={{color: '#fff', background: '#50526e',marginTop:20}}  onClick={()=>verifyOtp()} >
                                        Verify
                                    </Button>
                                    }
                                    <p style={{display:'flex', alignItems:'center',justifyContent:'center',paddingTop:25}}>
                                    By continuing you agree to our &nbsp; <span style={{color:'red'}}> Terms of Service</span>  </p>
                                 
                                    <p style={{display:'flex', alignItems:'center',justifyContent:'center'}}>
                                     and &nbsp; <span style={{color:'red'}}> Privacy & Legal Policy. </span> </p>
                                  
                                </div>
                            </div>
                        </Grid>
                    </Item>
                </Grid>
            </Box>


            <Footer />
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
    )
}