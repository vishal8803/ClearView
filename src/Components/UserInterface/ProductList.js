import React, { useState, useEffect } from "react";
import { alpha, makeStyles } from "@material-ui/core/styles";
import Header from "./Header";
import Button from "@material-ui/core/Button";
import { getData,postData,ServerURL } from "../FetchAllServices";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import ProductComponent from "./ProductComponent";
import Footer from "./Footer";

const useStyles = makeStyles((theme) => ({}));

const attribute = [
  { key: 1, attr: "Shape" },
  { key: 2, attr: "Frametype" },
  { key: 3, attr: "Size" },
  { key: 4, attr: "Color" },
  { key: 5, attr: "Material" },
  { key: 6, attr: "Gender" },
  { key: 7, attr: "Price" },
  { key: 8, attr: "Sorting" },
  { key: 9, attr: "Reset" },
];

export default function ProductList(props) {
  const [getList, setList] = useState([]);
  const [getFrameTypeList, setFrameTypeList] = useState([]);
  const [getColorList, setColorList] = useState([]);
  const [getMaterialList, setMaterialList] = useState([]);
  const [getPriceList, setPriceList] = useState([]);
  const [getSize, setSize] = useState([]) ;
  const [getGender , setGender] = useState([]);
  const [refresh , setRefresh] = useState(false)
  const [refresh2 , setRefresh2] = useState(false)
  const [getAllProducts, setAllProducts] = useState([]);
  const [getStyle , setStyle] = useState();

  const [myanchorEl, setMyAnchorEl] = React.useState(null);
  const [keyAttr, setKeyAttr] = useState("");

  const fetchAllShapes = async () => {
    var list = await getData("shape/fetchAllShape");
    var shapesdata={} ;
    
    list.data.map((item)=>{
      shapesdata[item.shapeid]={...item,chkStatus:false} ;
    })
    setList(shapesdata)
  };
  const fetchAllframetype = async () => {
    var list = await getData("frametype/fetchAllframetype");
    var frametypedata ={} ;

    list.data.map((item)=>{
      frametypedata[item.frameid]={...item,chkStatus:false};
    })
    setFrameTypeList(frametypedata)
  };
  const fetchAllColor = async () => {
    var list = await getData("color/fetchallColor");
    var colorData = {} 
    list.data.map((item)=>{
      colorData[item.colorid]={...item,chkStatus:false}
    })
    setColorList(colorData)
  };
  const fetchAllSize=()=>{
    var list = [{'sizeid':'s' , 'size':'Small'},{'sizeid':'m' , 'size':'Medium'},{'sizeid':'l' , 'size':'Large'}] ;
    var sizeData={}
    list.map((item)=>{
      sizeData[item.sizeid]={...item,chkStatus:false}
    })
    setSize(sizeData);
  }
  const fetchAllMaterial = async () => {
    var list = await getData("material/fetchAllMaterial");
    var materialData={}
    list.data.map((item)=>{
      materialData[item.matarialid]={...item,chkStatus:false}
    })
    setMaterialList(materialData)
  };
  const fetchAllPrice = async () => {
    var list = await getData("price/fetchAllPrice");
    var priceData={}
    list.data.map((item)=>{
      priceData[item.priceid]={...item,chkStatus:false}
    })
    setPriceList(priceData)
  };

  const fetchAllGender=()=>{
    var list = [{'genderid':'m' , 'gender':'Male'},{'genderid':'f' , 'gender':'Female'}] ;
    var genderData={}
    list.map((item)=>{
      genderData[item.genderid]={...item,chkStatus:false}
    })
    setGender(genderData)
  }

  const handleMyMenuClick = (event) => {
    setMyAnchorEl(event.currentTarget);
    setKeyAttr(event.currentTarget.value);
  };

  useEffect(function(){
    fetchAllShapes();
    fetchAllframetype();
    fetchAllColor();
    fetchAllMaterial();
    fetchAllPrice();
    fetchAllSize();
    fetchAllGender();
    fetchAllProducts();
  },[])

  const handleChange=(event,item)=>
  {
      var obj = getList
      obj[item.shapeid]['chkStatus']=event.currentTarget.checked
      setList(obj)
      setRefresh2(!refresh2)
  }

  const handleFrametypeChange=(event,item)=>{
    var obj = getFrameTypeList
    obj[item.frameid]['chkStatus'] = event.currentTarget.checked
    setFrameTypeList(obj)
    setRefresh(!refresh)
  }

  const handleSizeChange=(event,item)=>{
    var obj = getSize
    obj[item.sizeid]['chkStatus'] = event.currentTarget.checked
    setSize(obj)
    setRefresh(!refresh)
  }

  const handleMterialChange=(event,item)=>{
    var obj = getMaterialList
    obj[item.matarialid]['chkStatus'] = event.currentTarget.checked
    setMaterialList(obj)
    setRefresh(!refresh)
  }

  const handleColorChange=(event,item)=>{
    var obj = getColorList
    obj[item.colorid]['chkStatus'] =event.currentTarget.checked
    setColorList(obj)
    setRefresh(!refresh)
  }

  const handlePriceChange=(event,item)=>{
    var obj = getPriceList
    obj[item.priceid]['chkStatus'] = event.currentTarget.checked
    setPriceList(obj)
    setRefresh(!refresh)
  }

  const handleGenderChange=(event,item)=>{
    var obj = getGender
    obj[item.genderid]['chkStatus'] = event.currentTarget.checked
    setGender(obj)
    setRefresh(!refresh)
  }

  const subMenu = (key) => 
  {
   switch(key) {
     case '1':
      return Object.values(getList).map((item) => {
        return (
          <FormGroup>
            <MenuItem value={item.shapeid}>
              <FormControlLabel
                control={<Checkbox id={item.shapeid} checked={item.chkStatus} onChange={(event=>handleChange(event,item))} color="primary" />}
                label={item.shapename}
              />
            </MenuItem>
          </FormGroup>
        );
      });
    case '2':
      return Object.values(getFrameTypeList).map((item) => {
        return (
          <FormGroup>
            <MenuItem value={item.frametypeid}>
              <FormControlLabel
                control={<Checkbox id={item.frametypeid} checked={item.chkStatus}  onChange={(event=>handleFrametypeChange(event,item))} color="primary" />}
                label={item.frametypename}
              />
            </MenuItem>
          </FormGroup>
        );
      });
    case '3':

      return Object.values(getSize).map((item) => {
        return (
          <FormGroup>
            <MenuItem value={item.sizeid}>
              <FormControlLabel
                control={<Checkbox  checked={item.chkStatus} onChange={(event=>handleSizeChange(event,item))} color="primary" />}
                label={item.size}
              />
            </MenuItem>
          </FormGroup>
        );
      });
    
      //   return (
      //     <>
      //     <FormGroup>
      //   <MenuItem
      //     style={{
      //       display: "flex",
      //       flexDirection: "row",
      //       width: 150,
           
      //     }}
      //     value={"Small"}
      //   >
      //   <FormControlLabel
      //           control={<Checkbox color="primary" />}
      //           label={'Small'}
      //         />
      //   </MenuItem>
      //   </FormGroup>

      //   <FormGroup>
      //   <MenuItem
      //   style={{
      //     display: "flex",
      //     flexDirection: "row",
      //     width: 150,
         
      //   }}
      //   value={"Medium"}
      // >
      //   <FormControlLabel
      //           control={<Checkbox color="primary" />}
      //           label={'Medium'}
      //         />
      // </MenuItem>
      // </FormGroup>

      //   <FormGroup>
      // <MenuItem
      //     style={{
      //       display: "flex",
      //       flexDirection: "row",
      //       width: 150,
           
      //     }}
      //     value={"Large"}
      //   >
      //    <FormControlLabel
      //           control={<Checkbox color="primary" />}
      //           label={'Large'}
      //         />
      //   </MenuItem>
      //   </FormGroup>
      // </>
      //   );
      
      case '4':
      return Object.values(getColorList).map((item) => {
        return (
          <FormGroup>
            <MenuItem value={item.colorid}>
              <FormControlLabel
                control={<Checkbox color="primary" checked={item.chkStatus} onChange={(event)=>handleColorChange(event,item)} />}
                label={item.colorname}
              />
            </MenuItem>
          </FormGroup>
        );
      });
      case '5':
      return Object.values(getMaterialList).map((item) => {
        return (
          <FormGroup>
            <MenuItem value={item.materialid}>
              <FormControlLabel
                control={<Checkbox color="primary" checked={item.chkStatus} onChange={(event)=>handleMterialChange(event,item)} />}
                label={item.materialname}
              />
            </MenuItem>
          </FormGroup>
        );
      });
      case '6':

        return Object.values(getGender).map((item) => {
          return (
            <FormGroup>
              <MenuItem value={item.genderid}>
                <FormControlLabel
                  control={<Checkbox  checked={item.chkStatus} onChange={(event=>handleGenderChange(event,item))} color="primary" />}
                  label={item.gender}
                />
              </MenuItem>
            </FormGroup>
          );
        });

     
        // return (
        //   <>
        //   <FormGroup>
        //     <MenuItem value={"Men"}>
        //       <FormControlLabel
        //         control={<Checkbox color="primary" />}
        //         label={'Men'}
        //       />
        //     </MenuItem>
        //   </FormGroup>
        //   <FormGroup>
        //     <MenuItem value={"Women"}>
        //       <FormControlLabel
        //         control={<Checkbox color="primary" />}
        //         label={'Women'}
        //       />
        //     </MenuItem>
        //   </FormGroup>
        //   </>
        // );
     
      case '7':
      return Object.values(getPriceList).map((item) => {
        return (
          <FormGroup>
            <MenuItem value={item.priceid}>
              <FormControlLabel
                control={<Checkbox color="primary"  checked={item.chkStatus} onChange={(event)=>handlePriceChange(event,item)} />}
                label={"₹" + item.minprice + " - " + "₹" + item.maxprice}
              />
            </MenuItem>
          </FormGroup>
        );
      });
    }
  };

  const attrMenu = () => {
    return attribute.map((item) => {
      return (
        <Button
          endIcon={<ArrowDropDownIcon />}
          value={item.key}
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={(event) => handleMyMenuClick(event)}
        >
          {item.attr}
        </Button>
      );
    });
  };

  const handleMyMenuClose = () => {
    setMyAnchorEl(null);
  };

  const fetchAllProducts=async()=>{
    var body = {gender:props.location.gender,categoryid:props.location.categoryid}
    var list =await postData('product/fetchAllProductByGenderAndId',body)
    setAllProducts(list.data)
  }

 

  const displayProducts=()=>{
    return getAllProducts.map((item)=>{
      return(
        <ProductComponent product={item}/>
      )
    })
  }

  return (
    <div>
    <div>
      <Header history={props.history}/>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          marginTop: 30,
        }}
      >
        {attrMenu()}
        <Menu
          id="simple-menu1"
          anchorEl={myanchorEl}
          keepMounted
          open={Boolean(myanchorEl)}
          onClose={handleMyMenuClose}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          {subMenu(keyAttr)}
        </Menu>
      </div>
      <div style={{display:'flex' , flexDirection:'row',justifyContent:'space-evenly',flexWrap:'wrap' , marginTop:50}}>
        {displayProducts()}
      </div>
    </div>
    <Footer/>
    </div>
  );
}
