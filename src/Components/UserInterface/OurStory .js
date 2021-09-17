import React, { useState, useEffect } from "react";
import { Button, Grid } from "@material-ui/core";
import Footer from "./Footer";
import Header from "./Header";

export default function OurStory(props) {

    return(
        <div>
<Header history={props.history} />


<div>
    <img src='Desktop_our_story_Revised_1900x.jpg' width='100%'/>
</div>
<Grid cotainer spacing={1} style={{display:'flex',flexDirection:'row',paddingRight:100,paddingLeft:100,paddingTop:40,background: '#cfeae3'}}>
    <Grid item xs={4} style={{margin:40,color: '#927764'}}>
<h2>Fair Prices</h2>
<p>
We have eliminated the<br/>middlemen to keep our prices low,<br/>so that you don't have to pay<br/>over the top.
</p>
<div>
<img style={{marginTop:40}}src='story1.png' width='100%'/>
</div>
        </Grid>
        <Grid item xs={4} style={{margin:40,    color: '#927764'}}>
<h2>Design Philosophy</h2>
<p>
Our product team blends<br/>centuries-old craftsmanship<br/>with modern lifestyles<br/>to re-shape optical designs.
</p>
<div>
<img  style={{marginTop:40}} src='story2.png' width='100%'/>
</div>
        </Grid>
        <Grid item xs={4} style={{margin:40,color: '#927764'}}>
<h2>Finest Quality</h2>
<p>
Collection made of handcrafted<br/>Italian acetate, natural pure wood,<br/>titanium and bullhorn. So that<br/>you get the very best.
</p>
<div>
<img  style={{marginTop:40}} src='story3.png' width='100%'/>
</div>
        </Grid>

    </Grid>

<Footer/>
        </div>
    )
}