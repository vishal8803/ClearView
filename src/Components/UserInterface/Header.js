import React, { useState, useEffect } from "react";
import { alpha, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import MoreIcon from "@material-ui/icons/MoreVert";
import Button from "@material-ui/core/Button";
import { getData, ServerURL } from "../FetchAllServices";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { Link } from "react-router-dom";
import {  useSelector } from "react-redux";
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  list: {
    width: 450,
  },
  fullList: {
    width: 'auto',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    border: "2px solid #dfe6e9",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

export default function Header(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  // var useSelector = useSelector()

  var productInCart = useSelector(state=>state.cart)
  var keys = Object.keys(productInCart)
  var products = Object.values(productInCart)
  var values = Object.values(productInCart)

  var totalPriceWithoutDiscount = values.reduce(calculatePriceWithoutDiscount,0);

  function calculatePriceWithoutDiscount(a,b){
    var actualPrice = b.data.price*b.data.value ;
    return a+actualPrice;
  }

  var totalPriceWithDiscount = values.reduce(calculatePriceWithDiscount,0);

  function calculatePriceWithDiscount(a,b){
    var actualPrice = b.data.offerprice>0?b.data.offerprice*b.data.value:b.data.price*b.data.value ;
    return a+actualPrice;
  }

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  ////////////////////////////Right Drawer///////////////////////////

  
  const [state, setState] = useState({right: false});

  const toggleDrawer = (anchor, open)  => {
    setState({ ...state, [anchor]: open });
  };

  

  const cartItems = ()=>{
    return products.map((item)=>{
      var ite = JSON.stringify(item) 
      return (
        <div>
        <div style={{display:'flex',justifyContent:'space-evenly',margin:20}}>
        <div style={{display:'flex',flexDirection:'column' , width:"50%"}}>

            <img src={`${ServerURL}/images/${item.data.picture}`} /> 
          <span style={{margin:10,fontWeight:700}}>{item.data.productname} ( <span style={{color:item.data.colorname}}>{item.data.colorname} </span> )</span>
        </div>
          <div  style={{display:'flex',justifyContent:'center' , alignItems:'center',flexDirection:'column',width:'100%'}}>
           
         <span style={{fontWeight:700}}>&#8377; {item.data.offerprice==0?item.data.price:item.data.offerprice} x {item.data.value}</span>
         <span style={{marginTop:10}}> {item.data.offerprice>0?<span style={{color:'green' ,fontWeight:'bolder'}}> You save &#8377; { (item.data.price - item.data.offerprice)*(item.data.value)}</span>:<span style={{color:'red' ,fontWeight:'bolder'}}>No Offer</span> }</span>
          </div>
        </div>
          <Divider />
          </div>
      )
    })
  }

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={()=>toggleDrawer(anchor, false)}
      onKeyDown={()=>toggleDrawer(anchor, false)}
    >
      <div style={{padding:5, fontWeight:700}}>
     Item(s): {keys.length}
      </div>

      {cartItems()}
      
      <div style={{padding:10, fontWeight:700}}>
      Payable: <span style={{float:'right'}}> &#8377; {totalPriceWithoutDiscount}</span>
      </div>

      <div style={{padding:10, fontWeight:700}}>
      Savings: <span style={{float:'right'}}> &#8377; -{totalPriceWithoutDiscount-totalPriceWithDiscount} </span>
      </div>

      <div style={{padding:10, fontWeight:700}}>
    Net: <span style={{float:'right'}}> &#8377; {totalPriceWithDiscount} </span>
      </div>
      
    </div>
  );

  const rightDrawer=()=>{
        return(<div>
          
            <React.Fragment key={'right'}>
              <Drawer anchor={'right'} open={state['right']} onClose={()=>toggleDrawer('right', false)}>
                {list('right')}
              </Drawer>
            </React.Fragment>
          
        </div>)
  }

  ///////////////////////////////////////////////////////////////////

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton onClick={()=>toggleDrawer('right',true)} aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={keys.length} color="secondary">
            <ShoppingCart   />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );



  //////////My Work////////////////////
  const [getListCategory, setListCategory] = useState([]);
  const [myanchorEl, setMyAnchorEl] = React.useState(null);
  const [getMyMenuName, setMyMenuName] = useState("");

  const handleMyMenuClick = (event) => {
    setMyAnchorEl(event.currentTarget);
    setMyMenuName(event.currentTarget.value);
  };

  const handleMyMenuClose = () => {
    setMyAnchorEl(null);
  };

  const subMenu = () => {
    if (getMyMenuName == "EYE GLASSES") {
      return (
        <MenuItem
          style={{ display: "flex", width: "100%" }}
          onMouseLeave={() => setMyAnchorEl(null)}
        >
          <div
            onClick={() =>
              props.history.push(
                { pathname: "/productlist" },
                { gender: "Men", categoryid: 1 }
              )
            }
          >
            <img src="/shopMenEye.jpg" width="800"></img>
          </div>
          <div
            onClick={() =>
              props.history.push(
                { pathname: "/productlist" },
                { gender: "Women", categoryid: 1 }
              )
            }
          >
            <img src="/shopWomenEye.jpg" width="800"></img>
          </div>
        </MenuItem>
      );
    } else if (getMyMenuName == "SUN GLASSES") {
      return (
        /*
   
   */
        <MenuItem
          style={{ display: "flex", width: "100%" }}
          onMouseLeave={() => setMyAnchorEl(null)}
        >
          <div
            onClick={() =>
              props.history.push(
                { pathname: "/productlist" },
                { gender: "Men", categoryid: 3 }
              )
            }
          >
            <img src="/shopmensun.jpg" width={"800"}></img>
          </div>
          <div
            onClick={() =>
              props.history.push(
                { pathname: "/productlist" },
                { gender: "Women", categoryid: 3 }
              )
            }
          >
            <img src="/shopwomensun.jpg" width={"800"}></img>
          </div>
        </MenuItem>
      );
    }
  };
  const fetchAllCategory = async () => {
    var list = await getData("category/fetchallcategory");
    setListCategory(list.data);
  };

  const withOutDropDown = (event) => {
    if (event.currentTarget.value == "OUR STORY") {
      props.history.push({ pathname: "/ourstory" });
    }
  };

  const fillCategory = () => {
    return getListCategory.map((item) => {
      return item.categoryname == "SUN GLASSES" ||
        item.categoryname == "EYE GLASSES" ? (
        <Button
          endIcon={<ArrowDropDownIcon />}
          onMouseEnter={(event) => handleMyMenuClick(event)}
          value={item.categoryname}
          aria-controls="simple-menu"
          aria-haspopup="true"
        >
          {item.categoryname}
        </Button>
      ) : (
        <Button
          value={item.categoryname}
          onClick={(event) => withOutDropDown(event)}
        >
          {item.categoryname}
        </Button>
      );
    });
  };

  useEffect(function () {
    fetchAllCategory();
  }, []);

  /////////////////////////////////////

  return (
    <div className={classes.grow}>
      <AppBar position="static" color="#FFF">
        <Toolbar>
          <div style={{ padding: 5 }}>
            <Link onClick={() => props.history.push({ pathname: "/home" })}>
              {" "}
              <img src="/glasskart9.png" />
            </Link>
          </div>

          {fillCategory()}

          <Menu
            id="simple-menu"
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
            {myanchorEl ? subMenu() : <></>}
          </Menu>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton onClick={()=>toggleDrawer('right',true)} aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={keys.length} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>
            
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {rightDrawer()}
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
