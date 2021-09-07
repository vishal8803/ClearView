import React, { useState,useEffect } from 'react';
import { Divider, Grid } from '@material-ui/core';
import { Box,Container,Link } from '@material-ui/core';

export default function Footer(){

    return(
        <div style={{paddingLeft:100 , paddingRight:100 , marginTop:40}}>
            <Divider style={{color:'black'}} />
            <p style={{fontSize:25}}>CONNECT WITH US</p>
            <img src="apple.png" width="12%" style={{paddingRight:5}}></img>
            <img src="googlePlay.png" width="12%" style={{paddingLeft:5}}></img>
            <Box style={{margin:30}}>
                <Container>
                    <Grid container spacing={5}>
                        <Grid item xs={3}>
                            <Box style={{fontSize:25}} marginBottom={2}>
                                CONTACT
                            </Box>
                            <Box style={{fontSize:20 , color:'#9a9a9a'}} >
                                <Link href='' color='inherit'>support@glasscart.com</Link>
                            </Box>
                            <Box style={{fontSize:20, color:'#9a9a9a'}}>
                                <Link href='' color='inherit'>+91-9425630144</Link>
                            </Box>
                        </Grid>
                        <Grid item xs={3}>
                            <Box style={{fontSize:25}} marginBottom={2}>
                                SHOP
                            </Box>
                            <Box style={{fontSize:20 , color:'#9a9a9a'}} >
                                <Link href='' color='inherit'>Eyeglasses</Link>
                            </Box>
                            <Box style={{fontSize:20, color:'#9a9a9a'}}>
                                <Link href='' color='inherit'>Sunglasses</Link>
                            </Box>
                            <Box style={{fontSize:20, color:'#9a9a9a'}}>
                                <Link href='' color='inherit'>Collections</Link>
                            </Box>
                        </Grid>
                        <Grid item xs={3}>
                            <Box style={{fontSize:25}} marginBottom={2}>
                                ABOUT
                            </Box>
                            <Box style={{fontSize:20 , color:'#9a9a9a'}} >
                                <Link href='' color='inherit'>Our Story</Link>
                            </Box>
                            <Box style={{fontSize:20, color:'#9a9a9a'}}>
                                <Link href='' color='inherit'>Carrers</Link>
                            </Box>
                            <Box style={{fontSize:20, color:'#9a9a9a'}}>
                                <Link href='' color='inherit'>Press</Link>
                            </Box>
                            <Box style={{fontSize:20, color:'#9a9a9a'}}>
                                <Link href='' color='inherit'>Blog</Link>
                            </Box>
                            <Box style={{fontSize:20, color:'#9a9a9a'}}>
                                <Link href='/' color='inherit'>Store Locator</Link>
                            </Box>
                        </Grid>
                        <Grid item xs={3}>
                            <Box style={{fontSize:25}} marginBottom={2}>
                                INFORMATION
                            </Box>
                            <Box style={{fontSize:20 , color:'#9a9a9a'}} >
                                <Link href='' color='inherit'>Help</Link>
                            </Box>
                            <Box style={{fontSize:20, color:'#9a9a9a'}}>
                                <Link href='' color='inherit'>Shipping Handling</Link>
                            </Box>
                            <Box style={{fontSize:20, color:'#9a9a9a'}}>
                                <Link href='' color='inherit'>Exchanges & Returns</Link>
                            </Box>
                            <Box style={{fontSize:20, color:'#9a9a9a'}}>
                                <Link href='' color='inherit'>Terms & Conditions</Link>
                            </Box>
                            <Box style={{fontSize:20, color:'#9a9a9a'}}>
                                <Link href='' color='inherit'>Privacy Policy</Link>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </div>
    )
}