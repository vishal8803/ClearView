import React, { useState, useEffect } from "react";
import { alpha, makeStyles } from "@material-ui/core/styles";
import Header from "./Header";
import Button from "@material-ui/core/Button";
import { getData, ServerURL } from "../FetchAllServices";
import { Grid } from "@material-ui/core";
import Footer from "./Footer";
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';

export default function Home(props) {
  const [list, setList] = useState([]);

  const fetchAllHomePagePictures = async () => {
    var result = await getData("homePagePicture/fetchAllPicture");
    setList(result.data);
  };

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 1 },
    { width: 768, itemsToShow: 2 },
    { width: 1200, itemsToShow: 2 },
  ];

  useEffect(function () {
    fetchAllHomePagePictures();
  }, []);

  const displayAllPictures = () => {
    return list.map((item) => {
      return (
        <div>
          {item.position == 1 ? (
            <div style={{ textAlign: "center", fontFamily: "ubuntu" }}>
              <img
                src={`${ServerURL}/images/${item.picture}`}
                width="100%"
                style={{position:'relative' }}
              ></img>
              <div style={{ position:'absolute' , top:'35%',left:'65%'}}>
                <p style={{fontSize:30,fontWeight:200 , color:'#404040',fontFamily:'sans-serif'}}>Stylish Eyewear That <br></br>
Is Premium, Not Expensive!</p>
              <Button
                  style={{
                    paddingLeft: 100,
                    paddingRight: 100,
                    paddingTop: 5,
                    fontSize: 17,
                    paddingBottom: 5,
                    background: "#50526e",
                    color: "#fff",
                    borderRadius: 0,
                    marginBottom:5
                  }}
                  variant="contained"
                >
                  Shop Eyeglasses
                </Button>
                <br></br>
              <Button
                  style={{
                    paddingLeft: 100,
                    paddingRight: 100,
                    paddingTop: 5,
                    fontSize: 17,
                    paddingBottom: 5,
                    background: "#50526e",
                    color: "#fff",
                    borderRadius: 0,
                    marginTop:3,
                    marginBottom:0
                  }}
                  variant="contained"
                >
                  Shop Sunglasses
                </Button>
                <div style={{margin:15,display:'flex',alignItems:'center',justifyContent:'center'}}>
                <span style={{fontSize:18,color:'#50526e',fontWeight:700,fontFamily:'sans-serif',}}>Take our style quiz </span> <img src="arrow.png"  ></img>
                </div>
              </div>
              <h1>New This Week!</h1>
              <p
                style={{
                  color: "#9a9a9a",
                  fontSize: 20,
                  letterSpacing: 1,
                  paddingLeft: 20,
                  paddingRight: 20,
                  margin: 20,
                  lineHeight: 2,
                }}
              >
                This summer, we’re bringing back the cat-eye trend with a
                colourful twist! Transform your look with these trendy tinted
                tonics in fresh colour options!
              </p>
            </div>
          ) : item.position == 4 ? (
            <div
              style={{
                paddingLeft: 100,
                paddingRight: 100,
                margin: 20,
                textAlign: "center",
                fontFamily: "ubuntu",
              }}
            >
              <img
                src={`${ServerURL}/images/${item.picture}`}
                width="100%"
              ></img>
              <div style={{ paddingLeft: 40, paddingRight: 40 }}>
                <h1 style={{ lineHeight: 1.5 }}>
                  Your satisfaction is guaranteed with <br></br>a 14 day return
                  period
                </h1>
                <Grid container spacing={1}>
                  <Grid item xs={4}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <img src="idealfit.png" width="70%"></img>
                      <h2>The Ideal Fit</h2>
                      <p
                        style={{
                          color: "#9a9a9a",
                          paddingLeft: 40,
                          paddingRight: 40,
                        }}
                      >
                        Our premium eyewear is aligned to suit your needs - be
                        it bespoke no-slip nose pads, adjustable bridges, or
                        sizes that are fine-tuned until they’re perfect for your
                        face.
                      </p>
                    </div>
                  </Grid>
                  <Grid item xs={4}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <img src="masterCrafts.png" width="70%"></img>
                      <h2>Master Craftsmanship</h2>
                      <p
                        style={{
                          color: "#9a9a9a",
                          paddingLeft: 40,
                          paddingRight: 40,
                        }}
                      >
                        Our frames are twice as durable thanks to handcrafted &
                        skin-friendly materials. We constantly innovate with
                        high-performance & eco-friendly materials, so that you
                        wear the best!
                      </p>
                    </div>
                  </Grid>
                  <Grid item xs={4}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <img src="superiorLenscape.png" width="70%"></img>
                      <h2>Superior Lenscape</h2>
                      <p
                        style={{
                          color: "#9a9a9a",
                          paddingLeft: 40,
                          paddingRight: 40,
                        }}
                      >
                        We’ve got a lens for every need. Our range encompasses
                        innovations like BLU digital, Anti-Fog, Progressive,
                        Anti-Glare & many more!
                      </p>
                    </div>
                  </Grid>
                </Grid>
              </div>
            </div>
          ) : item.position == 5 ? (
            <div
              style={{
                paddingLeft: 100,
                paddingRight: 100,
                margin: 20,
                textAlign: "center",
              }}
            >
              <h1> Store Locator</h1>
              <img
                src={`${ServerURL}/images/${item.picture}`}
                width="100%"
              ></img>
              <Grid container></Grid>
              <div
                style={{
                  display: "flex",
                  color: "#9a9a9a",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontSize: 20,
                }}
              >
                <li> A superlative buying experience</li>
                <li>
                  {" "}
                  Expert guidance of stylists to help you make the right choice
                </li>
              </div>
              <div
                style={{
                  display: "flex",
                  color: "#9a9a9a",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontSize: 20,
                }}
              >
                <li> Free eye test and prescription</li>
                <li> Fully sanitised and safe shopping</li>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: 20,
                }}
              >
                <Button
                  style={{
                    paddingLeft: 60,
                    paddingRight: 60,
                    paddingTop: 10,
                    fontSize: 20,
                    paddingBottom: 10,
                    background: "#50526e",
                    color: "#fff",
                    borderRadius: 0,
                  }}
                  variant="contained"
                >
                  Find us in stores
                </Button>
              </div>
            </div>
          ) : (
            <div style={{ paddingLeft: 100, paddingRight: 100, margin: 20 }}>
              <img
                src={`${ServerURL}/images/${item.picture}`}
                width="100%"
              ></img>
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div>
      <Header history={props.history} />
      {displayAllPictures()}
      <Footer />
    </div>
  );
}
