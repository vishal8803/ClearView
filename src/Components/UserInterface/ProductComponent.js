import React, { useState, useEffect } from "react";
import { getData,ServerURL,postData } from "../FetchAllServices";
import Radio from '@material-ui/core/Radio';

export default function ProductComponent(props) {
    const [item , setItem] = useState({...props.product,details:[]})
    const [productStyle , setProductStyle]=useState({width:400,height:300,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',margin:10,padding:10,borderRadius:20})
    const [selected , setSelceted] = useState({finalproductid:'',colorid:'',price:'',offerprice:'',picture:''});
    const [status , setStatus] = useState(false)
   
   
    const fetchFinalProducts=async()=>{
        var body = {"productid":item.productid} ;
        const result =await postData('finalproduct/fetchAllFinalProductsByProductId',body);
        
        setItem((prev)=>({...prev,details:result.data}))
        if(result.data.length>0){
          // alert("Hello")
        var {finalproductid,colorid,price,offerprice,picture}=result.data[0] ;
        setSelceted({finalproductid,colorid,price,offerprice,picture}) ;
        }
    }

    const setBorder=async(e)=>{
       setProductStyle((prev)=>({...prev,border:'1px solid black'}))
        await fetchFinalProducts();
        setStatus(true)
      }
    
      const removeBorder=(e)=>{
        setProductStyle((prev)=>({...prev,border:null}))
        setStatus(false)
      }

      const handleChange=(item)=>{
        var {finalproductid,colorname,price,offerprice,picture}=item ;
        setSelceted({finalproductid,colorname,price,offerprice,picture}) ;
      }

    return(
        <div style={productStyle} onMouseEnter={(event)=>setBorder(event)} onMouseLeave={(event)=>removeBorder(event)}>
        <img   src={`${ServerURL}/images/${selected.picture?selected.picture:item.picture}`} width={350}></img>
        {status &&
        <div>
        <div style={{textAlign:'center',marginTop:30}}>{item.productname}</div>

      
        <div>
          {item.details.map((finalitem)=>{
            return(
            <Radio
            key={finalitem.finalproductid}
           checked={selected.finalproductid===finalitem.finalproductid}
           onChange={()=>handleChange(finalitem)}
           style={{color:finalitem.colorname}}
            name="radio-button-demo"
           // inputProps={{ 'aria-label': 'A' }}
          />
          )
          
          })}
          
        </div>
              <div style={{textAlign:'center'}}>
                {selected.offerprice>0?<span><s> &#8377;{selected.price}</s>&nbsp; <span style={{color:'#0984e3'}}>&#8377;{selected.offerprice}</span></span>: <span>&#8377;{selected.price}</span>}
              
              </div>
              </div>}
      </div>
    )
}