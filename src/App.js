import AddStoreCity from "./Components/Administrator/addStoreCity";
import DisplayAllStore from "./Components/Administrator/displayAllStore";
import { Route } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import AddCategory from "./Components/Administrator/AddCategory";
import AddShapes from "./Components/Administrator/AddShapes";
import DisplayCategory from "./Components/Administrator/DisplayCategory";
import DisplayShapes from "./Components/Administrator/DisplayShapes";
import AddFrametype from "./Components/Administrator/AddFrametype";
import DisplayFrametype from "./Components/Administrator/DisplayFrametype";
import AddColor from "./Components/Administrator/AddColor";
import DisplayColor from "./Components/Administrator/DisplayColor";
import AddMaterial from "./Components/Administrator/AddMaterial";
import DisplayMaterial from "./Components/Administrator/DisplayMaterial";
import AddPrice from "./Components/Administrator/AddPrice";
import DisplayPrice from "./Components/Administrator/DisplayPrice";
import Dashboard from "./Components/Administrator/Dashboard";
import AdminLogin from "./Components/Administrator/AdminLogin";
import Product from "./Components/Administrator/Product";
import DisplayProduct from "./Components/Administrator/DisplayProduct";
import AddFinalProduct from "./Components/Administrator/AddFinalProduct";
import DisplayFinalProduct from "./Components/Administrator/DisplayFinalProduct";
import ProductPicture from "./Components/Administrator/ProductPicture";
import DisplayProductPicture from "./Components/Administrator/DisplayProductPicture";
import Header from "./Components/UserInterface/Header";
import ProductList from "./Components/UserInterface/ProductList";
import HomePagePicture from "./Components/Administrator/HomePagePicture";
import DisplayHomePagePicture from "./Components/Administrator/DisplayHomePagePicture";
import Home from "./Components/UserInterface/Home";
import Footer from "./Components/UserInterface/Footer";
import productView from "./Components/UserInterface/productView";
import OurStory from "./Components/UserInterface/OurStory ";
import Signup from "./Components/UserInterface/Signup";
import UserInterface from "./Components/UserInterface/UserLogin";
import MyCart from "./Components/UserInterface/MyCart";
import OrderSummary from "./Components/UserInterface/OrderSummary";
function App(props) {
  return (
    <div className="App">
      <Router>
      <Route component={AddStoreCity} path='/addstore'
        props ={props.history}
      />
      <Route component={DisplayAllStore} path='/displaystore'
      props={props.history}
      />
      <Route component={AddCategory} path='/addcategory'
      props={props.history}
      />
      <Route component={DisplayCategory} path='/displaycategory'
      props={props.history}
      />
      <Route component={AddShapes} path='/addshapes'
      props={props.history}
      />
      <Route component={DisplayShapes} path='/displayshapes'
      props={props.history}
      />
      <Route component={AddFrametype} path='/addframetype'
      props={props.history}
      />
      <Route component={DisplayFrametype} path='/displayframetype'
      props={props.history}
      />
      <Route component={AddColor} path='/addcolor'
      props={props.history}
      />
      <Route component={DisplayColor} path='/displaycolor'
      props={props.history}
      />
      <Route component={AddMaterial} path='/addmaterial'
      props={props.history}
      />
      <Route component={DisplayMaterial} path='/displaymaterial'
      props={props.history}
      />
      <Route component={AddPrice} path='/addprice'
      props={props.history}
      />
      <Route component={DisplayPrice} path='/displayprice'
      props={props.history}
      />
      <Route component={Dashboard} path='/dashboard'
      props={props.history}
      />
      <Route component={AdminLogin} path='/adminlogin'
      props={props.history}
      />
      <Route component={Product} path='/product'
      props={props.history}
      />
      <Route component={DisplayProduct} path='/displayproduct'
      props={props.history}
      />
      <Route component={AddFinalProduct} path='/addfinalproduct'
      props={props.history}
      />
      <Route component={DisplayFinalProduct} path='/displayfinalproduct'
      props={props.history}
      />
      <Route component={ProductPicture} path='/productpicture'
      props={props.history}
      />
      <Route component={DisplayProductPicture} path='/displayproductpicture'
      props={props.history}
      />
      <Route component={Header} path='/header'
      props={props.history}
      />
      <Route component={ProductList} path='/productlist'
      props={props.history}
      />
      <Route component={HomePagePicture} path='/homepagepicture'
      props={props.history}
      />
      <Route component={DisplayHomePagePicture} path='/displayhomepagepicture'
      props={props.history}
      />
      <Route component={Home} path='/home'
      props={props.history}
      />
      <Route component={Footer} path='/footer'
      props={props.history}
      />
      <Route component={productView} path='/productView'
      props={props.history}
      />
      <Route component={OurStory} path='/ourstory'
      props={props.history}
      />
      <Route component={UserInterface} path='/userlogin'
      props={props.history}
      />
      <Route component={Signup} path='/signup'
      props={props.history}
      />
      <Route component={MyCart} path='/mycart'
      props={props.history}
      />
      <Route component={OrderSummary} path='/ordersummary'
      props={props.history}
      />

        </Router>
    </div>
  );
}

export default App;
