import React, { useState, useEffect } from "react";
import Grid from '@mui/material/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Footer from "./Footer";
import Header from "./Header";
// import { styled } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import { Button } from "@material-ui/core";
import { fontStyle } from "@mui/system";
import { Divider } from "@material-ui/core";
import IconButton from '@mui/material/IconButton';

import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


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

export default function UserInterface(props) {

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleClickShowPassword2 = () => {
        setValues2({
            ...values2,
            showPassword2: !values2.showPassword2,
        });
    };

    const handleMouseDownPassword2 = (event) => {
        event.preventDefault();
    };

    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });
    const [values2, setValues2] = React.useState({
        amount2: '',
        password2: '',
        weight2: '',
        weightRange2: '',
        showPassword2: false,
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleChange2 = (prop) => (event) => {
        setValues2({ ...values2, [prop]: event.target.value });
    };
    const classes = useStyles();
    return (
        <div>
            <Header history={props.history} />


            <Box sx={{ flexGrow: 1 }}>
                <Grid cotainer spacing={2} >
                    <Item style={{ display: 'flex', margin: 30 }}>
                        <Grid item xs={8}>
                            <img src='pic1.jpg' width='100%' height='100%' style={{ borderRadius: 10 }} />
                        </Grid>
                        <Grid item xs={4} style={{ border: '1px solid grey', marginLeft: 10, marginRight: 10, borderRadius: 5 }} >


                            <Grid cotainer spacing={2} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 20 }} >
                                <Grid item xs={6} style={{ lineHeight: 0.5, }}>

                                    <h1>Sign Up</h1>
                                    <p style={{ color: 'grey', fontWeight: 'bold' }}>Please enter your details.</p>

                                </Grid>
                                <Grid item xs={6}  style={{ display: 'flex', justifyContent:'flex-end', }} >

                                    <svg class="MuiSvgIcon-root jss5" focusable="false" viewBox="0 0 24 24" aria-hidden="true" variant="filled" aria-label="menu" style={{ fontSize: 60, border: '2px solid black', color: 'black', borderRadius: '50%' }}><path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path></svg>

                                </Grid>
                                

                            </Grid>

                          
                            <Grid cotainer spacing={2} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',marginLeft:20 ,marginRight:20 }} >
                                <Grid item xs={6}>

                                    <TextField
                                        style={{ marginTop: 0 }}
                                        id="input-with-icon-textfield"
                                        label="Your first name"
                                        // fullWidth
                                        variant="outlined"

                                    />
                                </Grid>
                                <Grid item xs={6}>

                                    <TextField
                                        style={{ marginTop: 0 }}
                                        id="input-with-icon-textfield"
                                        label="Your last name"
                                        // fullWidth
                                        variant="outlined"

                                    />
                                </Grid>
                            </Grid>

                            <Grid cotainer spacing={1} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',marginLeft:20,marginRight:20}} >
                                <Grid item xs={12}>

                                    <TextField
                                        style={{ marginTop: 15 }}
                                        id="input-with-icon-textfield"
                                        label="Your Email-id"
                                        fullWidth
                                        variant="outlined"

                                    />
                                </Grid></Grid>

                            <Grid cotainer spacing={2} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',marginLeft:20,marginTop:20}} >
                                <Grid item xs={6}>

                                    <FormControl  sx={{ m: 0, width: '23ch',fontSize:'1rem' }}  variant="outlined">
                                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                        <OutlinedInput 
                                            id="outlined-adornment-password"
                                            type={values.showPassword ? 'text' : 'password'}
                                            value={values.password}
                                            onChange={handleChange('password')}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                    >
                                                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            label="Password"
                                        />
                                    </FormControl>
                                </Grid>

                                <Grid item xs={6} >

                                    <FormControl  sx={{ m: 0, width: '23ch',fontSize:'1rem' }}  variant="outlined" >
                                        <InputLabel  htmlFor="outlined-adornment-password2">Confirm Password</InputLabel>
                                        <OutlinedInput 
                                            id="outlined-adornment-password2"
                                            type={values2.showPassword2 ? 'text' : 'password'}
                                            value={values2.password2}
                                            onChange={handleChange2('password2')}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword2}
                                                        onMouseDown={handleMouseDownPassword2}
                                                        edge="end"
                                                    >
                                                        {values2.showPassword2 ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            label="Confirm Password"
                                        />
                                    </FormControl>

                                </Grid>
                            </Grid>
                            <div style={{ marginLeft: 20,marginRight:20 }}>
                                <p style={{fontSize:12}}>   Use 8 or more characters with a mix of letters & numbers</p>
                                <h2 style={{ lineHeight: 0.5, }}>Verify</h2>
                                <p style={{ lineHeight: 0.5,fontSize:12 }}>We have sent 4 digit OTP on</p></div>
                            <Grid cotainer spacing={1} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: 20,marginRight:20 }} >
                                <Grid item xs={12}>
                                    <TextField
                                        style={{ marginTop: 3 }}
                                        id="input-with-icon-textfield"
                                        label="Enter Your OTP"
                                        fullWidth
                                        variant="outlined"

                                    /></Grid></Grid>
                            <Grid cotainer spacing={1} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 20 }} >
                                <Grid item xs={12}>
                                    <Button variant="contained" fullWidth style={{ color: '#fff', background: '#50526e' }}>
                                        Verify
                                    </Button>
                                </Grid></Grid>
                            <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 0.5 }}>
                                By continuing you agree to our &nbsp; <span style={{ color: 'red' }}> Terms of Service</span>  </p>

                            <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 0.5 }}>
                                and &nbsp; <span style={{ color: 'red' }}> Privacy & Legal Policy. </span> </p>


                        </Grid>

                    </Item>
                </Grid>
            </Box>
            <Footer />
        </div>
    )
}