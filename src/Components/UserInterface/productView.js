import { Button, Grid } from "@material-ui/core";
import React, { useState, useEffect, useRef } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Radio } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { postData, ServerURL } from "../FetchAllServices";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import AddToCart from "./AddToCart";
import { useDispatch,useSelector } from "react-redux";
// import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import {  ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "100%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

export default function ProductView(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [expanded2, setExpanded2] = React.useState(false);
  const [expanded3, setExpanded3] = React.useState(false);
  const [productPicture, setProductPicture] = useState([]);
  const [picSlected, setPicSelected] = useState("");
  const [selected, setSelected] = useState(props.location.state.selected);
  const [refresh, setRefresh] = useState(false)
  const item = props.location.state.item;
  const itemProps = props.location.state.itemprops;
  var bigSlider = useRef();
  var smallSlider = useRef();
  var dispatch = useDispatch();

  const cart = useSelector(state=>state.cart)

  var settings = {
    dots: false,
    arrows:false,
    infinite: true,
    speed: 700,
    slidesToShow: 4,
    slidesToScroll: 1,
    focusOnSelect: true,
  };
  var settings2 = {
    dots: false,
    arrows:false,
    infinite: true,
    speed: 700,
    slidesToShow: 2,
    slidesToScroll: 1,
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
    setExpanded2(false);
    setExpanded3(false);
  };
  const handleChange2 = (panel) => (event, isExpanded) => {
    setExpanded2(isExpanded ? panel : false);
    setExpanded(false);
    setExpanded3(false);
  };
  const handleChange3 = (panel) => (event, isExpanded) => {
    setExpanded3(isExpanded ? panel : false);
    setExpanded(false);
    setExpanded2(false);
  };

  const onPicSelecetd = (picture, index) => {
    setPicSelected(picture.productPictureid);
    bigSlider.current.slickGoTo(index);
  };

  const handlePrev=()=>{
    bigSlider.current.slickPrev();
    smallSlider.current.slickPrev();
    // setPicSelected(bigSlider.current)
    // setPicSelected(bigSlider.currentTarget.productPictureid)
  }
  const handleNext=()=>{
    bigSlider.current.slickNext();
    smallSlider.current.slickNext();
  }

  const handleChangeButton = (item) => {
    var { finalproductid, colorid, price, colorname, offerprice, picture,stock } =
      item;
    setSelected({
      finalproductid,
      colorid,
      price,
      colorname,
      offerprice,
      picture,
      stock
    });
    fetchallProductPictures();
  };

  const fetchallProductPictures = async () => {
    var body = { finalproductid: selected.finalproductid };
    var result = await postData("finalproduct/fetchProductPicture", body);
    setProductPicture(result.data);
    // setPicSelected((result.data)[0].productPictureid)
  };

  useEffect(function () {
    fetchallProductPictures();
  }, [selected.finalproductid]);

  const handleQtyChange=(value)=>{
    var data ={...itemProps,...selected,value}
    // alert(JSON.stringify(data))
    if(value==0)
    {
        dispatch({type:"REMOVE_CART",payload:[selected.finalproductid]})
    }else
    {
        dispatch({type:"ADD_CART",payload:[selected.finalproductid,{data,value}]})
    }
    setRefresh(!refresh)
  }

  const productDetails = () => {
    return (
      <div style={{ marginTop: 50, marginLeft: 50, marginRight: 50 }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" href="/">
            HOME
          </Link>
          <Link
            color="inherit"
            href="/"
            // onClick={handleClick}
          >
            GLASSKART
          </Link>
          <Typography color="textPrimary">{itemProps.productname}</Typography>
        </Breadcrumbs>
        <Grid
          container
          spacing={1}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Grid item xs={8} style={{display:'flex',alignItems:'center' , justifyContent:'center'}}>
            <ArrowBackIos onClick={()=>handlePrev()} style={{cursor:'pointer'}}/>
            <Slider {...settings2} style={{ border: null,margin:'30' }} ref={bigSlider} style={{width:'95%'}}>
              {productPicture.map((picture) => {
                return (
                  <div
                    // data-slick='{"slidesToShow": 4, "slidesToScroll": 4}'
                    style={{
                      border: null,
                      cursor: "pointer",
                    }}
                    id={picture.productPictureid}
                  >
                    <img
                      src={`${ServerURL}/images/${picture.images}`}
                      width="90%"
                    />
                  </div>
                );
              })}
            </Slider>
            <ArrowForwardIos onClick={()=>handleNext()} style={{cursor:'pointer'}}/>
          </Grid>
          <Grid item xs={4}>
            <p style={{ fontSize: 20 }}>{itemProps.productname}</p>
            <Grid container>
              <Grid
                item
                xs={6}
                style={{ display: "flex", flexDirection: "row" }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    fontSize: 20,
                  }}
                >
                  {selected.colorname}
                  <div>
                    {item.details.map((finalitem) => {
                      return (
                        <Radio
                          key={finalitem.finalproductid}
                          checked={
                            selected.finalproductid === finalitem.finalproductid
                          }
                          onChange={() => handleChangeButton(finalitem)}
                          style={{ color: finalitem.colorname }}
                          name="radio-button-demo"
                          // inputProps={{ 'aria-label': 'A' }}
                        />
                      );
                    })}
                  </div>
                </div>
              </Grid>

              <Grid
                item
                xs={6}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <div style={{ fontSize: 20 }}>
                  {selected.offerprice > 0 ? (
                    <span>
                      <s> &#8377;{selected.price}</s>&nbsp;{" "}
                      <span style={{ color: "#0984e3" }}>
                        &#8377;{selected.offerprice}
                      </span>
                    </span>
                  ) : (
                    <span>&#8377;{selected.price}</span>
                  )}
                </div>
                <span style={{ fontSize: 20 }}>including premium</span>
                <span style={{ fontSize: 20 }}>anti-glare lenses </span>
              </Grid>
            </Grid>

            <Slider
              {...settings}
              style={{
                marginTop: 20,
                marginBottom: 20,
              }}
              ref={smallSlider}
            >
              {productPicture ? (
                productPicture.map((picture, index) => {
                  return (
                    <div
                      // data-slick='{"slidesToShow": 4, "slidesToScroll": 4}'
                      style={{ border: null, cursor: "pointer" }}
                    >
                      <img
                        src={`${ServerURL}/images/${picture.images}`}
                        style={{
                          borderRadius: 5,
                          paddingTop: 10,
                          paddingBottom: 10,
                          border:
                            picture.productPictureid == picSlected
                              ? "1px solid black"
                              : "1px solid #e2e2e2",
                          background: "cover",
                          objectFit: "contain",
                          margin: "auto",
                          height: 50,
                        }}
                        onClick={() => onPicSelecetd(picture, index)}
                      />
                    </div>
                  );
                })
              ) : (
                <></>
              )}
            </Slider>
            <div style={{letterSpacing:1,fontSize:16,fontWeight:'bolder'}}>
              {selected.stock ==0 ?<span style={{color:'red'}}>Not Available</span>:selected.stock>=1 && selected.stock<=3 ? <span style={{color:'red'}}>Hurry, Only {selected.stock} left!</span>:<span style={{color:'green'}}>Available</span>}
            </div>
                <AddToCart stock={selected.stock} value={cart.hasOwnProperty(selected.finalproductid)?cart[selected.finalproductid].value:0} onChange={(value)=>handleQtyChange(value)} />
            {/* <Button
              style={{
                backgroundColor: "#50526e",
                color: "white",
                width: "80%",
                marginTop: 20,
                padding: 20,
                borderRadius: 0,
              }}
            >
              Select Lenses
            </Button> */}
            <Button
              style={{
                backgroundColor: "#FFF",
                color: "#50526e",
                width: "80%",
                marginTop: 10,
                padding: 20,
                borderRadius: 0,
                boxShadow: 0,
                border: "1px solid #50526e",
              }}
            >
              <img src="whatsapp.png" width="30" /> Let's Chat
            </Button>
          </Grid>
        </Grid>
        <FavoriteBorderIcon color="grey" fontSize="large" />
      </div>
    );
  };
  const ourLenses = () => {
    return (
      <div>
        <h1 style={{ textAlign: "center" }}> OUR LENSES</h1>
        <div style={{ paddingLeft: 100, paddingRight: 100, margin: 10 }}>
          <Accordion
            style={
              expanded
                ? {
                    border: "2px solid #404040",
                    borderRadius: 10,
                    backgroundColor: "#50526e",
                    color: "#FFF",
                  }
                : {
                    border: "2px solid #404040",
                    borderRadius: 10,
                    backgroundColor: "#FFF",
                  }
            }
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <AccordionSummary
              expandIcon={
                <ExpandMoreIcon style={expanded ? { color: "#fff" } : {}} />
              }
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography className={classes.heading}>
                <span style={{ fontSize: 20 }}> Single Vision</span>
                <p>
                  These lenses correct a single field of vision - near,
                  intermediate, or distance
                </p>
              </Typography>
            </AccordionSummary>

            {/* <AccordionDetails></AccordionDetails> */}
          </Accordion>
          {expanded ? (
            <Grid
              container
              spacing={1}
              style={{
                padding: 10,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Grid
                item
                xs={4}
                style={{
                  display: "flex",
                  alignItems: "center",
                  // justifyContent: "center",
                  lineHeight: 0.5,
                  border: "1px solid black",
                  borderRadius: 10,
                  flexDirection: "column",
                }}
              >
                <h2>Premium Anti-Glare Glasses</h2>
                <p>Anti-Glare Coating On Both Sides</p>
                <p>Lightweight & Durable</p>
                <p>6 Months Warranty</p>
                <p>Crack Resistant</p>
                {/* <p style={{marginTop:220}}>&#8377; 0</p> */}
                <hr width="20%"></hr>
                <p style={{ position: "relative", bottom: 0, top: 0 }}>
                  &#8377; 0
                </p>
              </Grid>
              <Grid
                item
                xs={4}
                style={{
                  display: "flex",
                  alignItems: "center",
                  // justifyContent: "center",
                  lineHeight: 0.5,
                  border: "1px solid black",
                  borderRadius: 10,
                  flexDirection: "column",
                  // position:'fixe'
                }}
              >
                <h2>BLU Essential Lenses</h2>
                <p>Block Harmful Blue Light From Digital Screens</p>
                <p>Crack Resistant</p>
                <p>Anti-Glare Coating On Both Sides</p>
                <p>100% UV Protection</p>
                <p>12 Months Warranty</p>
                {/* <p style={{marginTop:170}}>&#8377; 1000</p> */}
                <hr width="20%"></hr>
                <p style={{ position: "relative", bottom: 0 }}>&#8377; 1000</p>
              </Grid>
              <Grid
                item
                xs={4}
                style={{
                  display: "flex",
                  alignItems: "center",
                  // justifyContent: "center",
                  lineHeight: 0.5,
                  border: "1px solid black",
                  borderRadius: 10,
                  flexDirection: "column",
                }}
              >
                <h2>BLU Thin Lenses</h2>
                <p>Block Harmful Blue Light From Digital Screens</p>
                <p>Thinner, Ultra-Lightweight Lenses</p>
                <p>Double Side Anti-Glare</p>
                <p>Crack Resistant & Durable</p>
                <p>Dust & Water Repellent</p>
                <p>100% UV Protection</p>
                <p>Index Varies From 1.6 - 1.74</p>
                <p>12 Months Warranty</p>
                <hr width="20%"></hr>
                <p style={{ position: "relative", bottom: 0, top: 0 }}>
                  &#8377; 2000
                </p>
              </Grid>
            </Grid>
          ) : (
            <></>
          )}
        </div>
        <div style={{ paddingLeft: 100, paddingRight: 100, margin: 10 }}>
          <Accordion
            style={
              expanded2
                ? {
                    border: "2px solid #404040",
                    backgroundColor: "#50526e",
                    color: "#FFF",
                    borderRadius: 10,
                  }
                : {
                    border: "2px solid #404040",
                    borderRadius: 10,
                    backgroundColor: "#FFF",
                  }
            }
            expanded={expanded2 === "panel2"}
            onChange={handleChange2("panel2")}
          >
            <AccordionSummary
              expandIcon={
                <ExpandMoreIcon style={expanded2 ? { color: "#fff" } : {}} />
              }
              aria-controls="panel1bh-content2"
              id="panel1bh-header2"
            >
              <Typography className={classes.heading}>
                <span style={{ fontSize: 20 }}> Multifocal</span>
                <p>
                  These lenses correct near, intermediate and distant fields of
                  vision, eliminating the need to switch eyeglasses
                </p>
              </Typography>
            </AccordionSummary>
            {/* <AccordionDetails></AccordionDetails> */}
          </Accordion>
          {expanded2 ? (
            <Grid
              container
              spacing={1}
              style={{
                padding: 10,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Grid
                item
                xs={4}
                style={{
                  display: "flex",
                  alignItems: "center",
                  // justifyContent: "center",
                  lineHeight: 0.5,
                  border: "1px solid black",
                  borderRadius: 10,
                  flexDirection: "column",
                }}
              >
                <h2>Bifocal Lenses</h2>
                <p>Circular Reading Area In Lower Part</p>
                <p>Anti-Glare Lens</p>
                <p>Crack Resistant</p>
                <p>Water And Dust Repellent</p>
                <p>UV 400 Protection</p>
                {/* <p style={{marginTop:220}}>&#8377; 0</p> */}
                <hr width="20%"></hr>
                <p style={{ position: "relative", bottom: 0, top: 0 }}>
                  &#8377; 2500
                </p>
              </Grid>
              <Grid
                item
                xs={4}
                style={{
                  display: "flex",
                  alignItems: "center",
                  // justifyContent: "center",
                  lineHeight: 0.5,
                  border: "1px solid black",
                  borderRadius: 10,
                  flexDirection: "column",
                  // position:'fixe'
                }}
              >
                <h2>Normal Corridor Progressive Lenses</h2>
                <p>Near To Far Progression</p>
                <p>Crack Resistant</p>
                <p>Anti-Glare Lens</p>
                {/* <p style={{marginTop:170}}>&#8377; 1000</p> */}
                <hr width="20%"></hr>
                <p style={{ position: "relative", bottom: 0 }}>&#8377;3500</p>
              </Grid>
              <Grid
                item
                xs={4}
                style={{
                  display: "flex",
                  alignItems: "center",
                  // justifyContent: "center",
                  lineHeight: 0.5,
                  border: "1px solid black",
                  borderRadius: 10,
                  flexDirection: "column",
                }}
              >
                <h2>Wide Corridor Progressive Lenses</h2>
                <p>Near To Far Progression</p>
                <p>Anti-Glare Lens</p>
                <p>Double Side Anti-Glare</p>
                <p>Thinnest Lens As Per Your Power</p>
                <p>Crack Resistant</p>
                <p>Water And Dust Repellent</p>
                <p>UV 400 Protection</p>
                <hr width="20%"></hr>
                <p style={{ position: "relative", bottom: 0, top: 0 }}>
                  &#8377; 8000
                </p>
              </Grid>
            </Grid>
          ) : (
            <></>
          )}
        </div>
        <div style={{ paddingLeft: 100, paddingRight: 100, margin: 10 }}>
          <Accordion
            style={
              expanded3
                ? {
                    border: "2px solid #404040",
                    backgroundColor: "#50526e",
                    borderRadius: 10,
                    color: "#FFF",
                  }
                : {
                    border: "2px solid #404040",
                    borderRadius: 10,
                    backgroundColor: "#FFF",
                  }
            }
            expanded={expanded3 === "panel3"}
            onChange={handleChange3("panel3")}
          >
            <AccordionSummary
              expandIcon={
                <ExpandMoreIcon style={expanded3 ? { color: "#fff" } : {}} />
              }
              aria-controls="panel1bh-content3"
              id="panel1bh-header3"
            >
              <Typography className={classes.heading}>
                <span style={{ fontSize: 20 }}> Zero Power</span>
                <p>
                  These protect your eyes from harmful blue light emitted by
                  digital screens and keep the glare off in style
                </p>
              </Typography>
            </AccordionSummary>
            {/* <AccordionDetails></AccordionDetails> */}
          </Accordion>
          {expanded3 ? (
            <Grid
              container
              spacing={1}
              style={{
                padding: 10,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Grid
                item
                xs={6}
                style={{
                  display: "flex",
                  alignItems: "center",
                  // justifyContent: "center",
                  lineHeight: 0.5,
                  border: "1px solid black",
                  borderRadius: 10,
                  flexDirection: "column",
                }}
              >
                <h2>Zero Power BLU Anti-Fog Lenses</h2>
                <p>Anti-fog Coating On Both Sides</p>
                <p>Block Harmful Blue Light From Digital Screens</p>
                <p>Mist & Moisture Repellant</p>
                <p>Crack Resistant</p>
                <p>Zero-Power Lenses</p>
                {/* <p style={{marginTop:220}}>&#8377; 0</p> */}
                <hr width="20%"></hr>
                <p style={{ position: "relative", bottom: 0, top: 0 }}>
                  &#8377; 500
                </p>
              </Grid>
              <Grid
                item
                xs={6}
                style={{
                  display: "flex",
                  alignItems: "center",
                  // justifyContent: "center",
                  lineHeight: 0.5,
                  border: "1px solid black",
                  borderRadius: 10,
                  flexDirection: "column",
                  // position:'fixe'
                }}
              >
                <h2>Zero Power BLU Anti-Glare Lenses</h2>
                <p>Block Harmful Blue Light From Digital Screens</p>
                <p>Crack Resistant</p>
                <p>Lightweight & Durable</p>
                <p>Anti-Glare Coating On Both Sides</p>
                <p>Zero-Power Lenses</p>
                {/* <p style={{marginTop:170}}>&#8377; 1000</p> */}
                <hr width="20%"></hr>
                <p style={{ position: "relative", bottom: 0 }}>&#8377; 0</p>
              </Grid>
            </Grid>
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  };

  const keyFeatures = () => {
    return (
      <div>
        <div style={{ paddingLeft: 100, paddingRight: 100, marginTop: 40 }}>
          <img src="why.jpg" width="100%" />
        </div>
        <h1 style={{ textAlign: "center" }}> KEY FEATURES</h1>
        <div style={{ paddingLeft: 100, paddingRight: 100, marginTop: 40 }}>
          <img src="frameSize1.png" width="100%" />
        </div>
        <div style={{ paddingLeft: 100, paddingRight: 100, marginTop: 40 }}>
          <img src="frameSize2.png" width="100%" />
        </div>
      </div>
    );
  };

  return (
    <div>
      <Header history={props.history} />
      {productDetails()}
      <div style={{ paddingLeft: 100, paddingRight: 100, marginTop: 40 }}>
        <img src="info.jpg" width="100%" />
      </div>
      {ourLenses()}
      {keyFeatures()}
      <Footer />
    </div>
  );
}
