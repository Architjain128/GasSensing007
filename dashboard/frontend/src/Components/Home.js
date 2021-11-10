import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from "@material-ui/icons/Home";
import ShowChartIcon from '@material-ui/icons/ShowChart';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DataUsageIcon from '@material-ui/icons/DataUsage';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';
import { DataGrid, RowsProp, ColDef } from "@material-ui/data-grid";
import SubHome from './sub-home';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));


export default function Marketplace(props) {
  
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [home, setHome] = React.useState(true);
  const [alert, setAlert] = React.useState(false);
  const [data, setData] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const homezz = () =>{
    setAlert(false);
    setData(false);
    setHome(true)
    window.location.href='/home'
  }

  const alertzz = () =>{
    setAlert(true);
    setData(false);
    setHome(false);
    window.location.href='/alert'
  }
  
  const datazz = () =>{
    setAlert(false);
    setData(true);
    setHome(false)
    window.location.href='/data'
  }

  const logoutme = () => {
    window.location.href='/login'
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Home Page                 
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose} >
            <HighlightOffOutlinedIcon />
          </IconButton>
        </div>
        <Divider />
        <Divider />
        <List>
        <ListItem button key={"Home"} onClick={homezz}>
              <ListItemIcon> <HomeIcon /></ListItemIcon>
              <ListItemText primary={"Home"} />
            </ListItem>

            <ListItem button key={"Alert"} onClick={alertzz}>
              <ListItemIcon> <NotificationsIcon/></ListItemIcon>
              <ListItemText primary={"Alert"} />
            </ListItem>

            <ListItem button key={"Data"} onClick={datazz}>
              <ListItemIcon> <DataUsageIcon/></ListItemIcon>
              <ListItemText primary={"Data"} />
            </ListItem>
        </List>
        <Divider />
        <List>
            <ListItem button key={"Logout"} onClick={logoutme}>
              <ListItemIcon > <ExitToAppIcon /></ListItemIcon>
              <ListItemText primary={"Logout"} />
            </ListItem>
        </List>

      </Drawer>
      
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <SubHome/>
      </main>
    </div>
  );
}
