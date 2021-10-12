import React, { useEffect, useState } from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { Remove } from "@material-ui/icons";
// import { createTheme } from "@mui/material";
import { createTheme } from '@mui/material/styles';
import { Button } from "@material-ui/core";

const theme = createTheme({
    shadows:["none"]
})
export default function AddToCart(props) {
  const [value, setValue] = useState(props.value);
  const stock = props.stock 

  useEffect(function(){
    setValue(props.value)
  },[props.value])

  const increseValue=()=>{
      if(parseInt(value)+1<=stock){
        setValue(parseInt(value)+1)
        props.onChange(parseInt(value)+1)
      }
  }

  const decreaseValue=()=>{
    setValue(parseInt(value)-1)
    props.onChange(parseInt(value)-1)
  }
 
  return (
      <div >
      {value==0? <Button
        style={{
          backgroundColor: "#50526e",
          color: "white",
          width: "80%",
          marginTop: 20,
          padding: 20,
          borderRadius: 0,
        }}
        onClick={()=>increseValue()}
      >
        Add to Cart
      </Button>:
    <div style={{display:'flex',margin:20,marginLeft:112}}>
      <Fab size="small" color="secondary" aria-label="add" boxShadow='0' style={{backgroundColor: "#50526e",boxShadow:0}} variant="circular" onClick={()=>increseValue()}>
        <AddIcon />
      </Fab>
      <div style={{marginInline:20,fontSize:24,fontWeight:'bolder'}}>
        {value}
      </div>
      <Fab size="small" color="secondary" aria-label="add" style={{backgroundColor: "#50526e"}} variant="circular"  onClick={()=>decreaseValue()}>
        <Remove />
      </Fab>
    </div>}
    </div>
  );
}
