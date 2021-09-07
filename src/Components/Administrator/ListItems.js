import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddStoreCity from './addStoreCity';
import DisplayAllStore from './displayAllStore';
import DisplayCategory from './DisplayCategory'
import DisplayShapes from './DisplayShapes'
import DisplayColor from './DisplayColor'
import DisplayMaterial from './DisplayMaterial'
import DisplayFrametype from './DisplayFrametype'
import DisplayPrice from './DisplayPrice'
import CategoryIcon from '@material-ui/icons/Category';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import StoreIcon from '@material-ui/icons/Store';
import DisplayProduct from './DisplayProduct';
import DisplayFinalProduct from './DisplayFinalProduct';
import ProductPicture from './ProductPicture';
import DisplayProductPicture from './DisplayProductPicture';
import DisplayHomePagePicture from './DisplayHomePagePicture';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function ListItems (props)
{
  const classes = useStyles();
  const handleClick=(e)=>{
      props.setComponent(e) ;
  }
    return(
        <div>
  <div>
  <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Stores</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
      
      
     
      <ListItem button onClick={()=>handleClick(<DisplayAllStore setComponent={handleClick}/>)} >
        <ListItemIcon>
          <StoreIcon />
        </ListItemIcon>
        <ListItemText primary="Stores" />
      </ListItem>

    </Typography>
        </AccordionDetails>
      </Accordion>


      
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Attributes</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>


    <ListItem button>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Category" onClick={()=>handleClick(<DisplayCategory setComponent={handleClick}/>)}/>
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        < CategoryIcon />
      </ListItemIcon>
      <ListItemText primary="Shapes"  onClick={()=>handleClick(<DisplayShapes setComponent={handleClick}/>)}/>
    </ListItem>


    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Material"onClick={()=>handleClick(<DisplayMaterial setComponent={handleClick}/>)} />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ColorLensIcon />
      </ListItemIcon>
      <ListItemText primary="Color" onClick={()=>handleClick(<DisplayColor setComponent={handleClick}/>)} />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Frame Type" onClick={()=>handleClick(<DisplayFrametype setComponent={handleClick}/>)}/>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AttachMoneyIcon />
      </ListItemIcon>
      <ListItemText primary="Price" onClick={()=>handleClick(<DisplayPrice setComponent={handleClick}/>)} />
    </ListItem>
    </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Product</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
      
      
     
      <ListItem button onClick={()=>handleClick(<DisplayProduct setComponent={handleClick}/>)} >
        <ListItemIcon>
          <StoreIcon />
        </ListItemIcon>
        <ListItemText primary="Products" />
      </ListItem>
      <ListItem button onClick={()=>handleClick(<DisplayFinalProduct setComponent={handleClick}/>)} >
        <ListItemIcon>
          <StoreIcon />
        </ListItemIcon>
        <ListItemText primary="Final Product" />
      </ListItem>
      <ListItem button onClick={()=>handleClick(<DisplayProductPicture setComponent={handleClick}/>)} >
        <ListItemIcon>
          <StoreIcon />
        </ListItemIcon>
        <ListItemText primary="Product Pictures" />
      </ListItem>
      <ListItem button onClick={()=>handleClick(<DisplayHomePagePicture setComponent={handleClick}/>)} >
        <ListItemIcon>
          <StoreIcon />
        </ListItemIcon>
        <ListItemText primary="Home Pictures" />
      </ListItem>


    </Typography>
        </AccordionDetails>
      </Accordion>

  </div>
  </div>
);
}