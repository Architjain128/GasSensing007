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
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import PlaylistAddOutlinedIcon from '@material-ui/icons/PlaylistAddOutlined';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';

import { Line } from 'react-chartjs-2';

const state = {
    labels: ["9-11", "10-11", "11-11",
             "12-11", "13-11"],
    datasets: [
      {
        label: 'Gas Readings',
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: [65, 59, 80, 81, 56]
      }
    ]
  }

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
  const [home, setHome] = React.useState(false);
  const [alert, setAlert] = React.useState(false);
  const [data, setData] = React.useState(false);
  const [graph, setGraph] = React.useState(true);  

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const homezz = () =>{
    setAlert(false);
    setData(false);
    setGraph(false);
    setHome(true)
    window.location.href='/home'
  }

  const alertzz = () =>{
    setAlert(true);
    setData(false);
    setGraph(false);
    setHome(false);
    window.location.href='/alert'
  }
  
  const datazz = () =>{
    setAlert(false);
    setData(true);
    setGraph(false);
    setHome(false)
    window.location.href='/data'
  }

  const graphzz = () =>{
    setAlert(false);
    setData(false);
    setGraph(true);
    setHome(false);
    window.location.href='/graph'
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
            Graph Page
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
            <ListItem button key={"Graph"} onClick={graphzz}>
              <ListItemIcon> <ShowChartIcon/></ListItemIcon>
              <ListItemText primary={"Graph"} />
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
        <Line
            data={state}
            options={{
            title:{
                display:true,
                text:'Gas sensed',
                fontSize:20
            },
            legend:{
                display:true,
                position:'right'
            }
            }}
        />
      {/* STATES ARE CREATED FOR EACH OF THESE THINGS */}
      {/* <main className={classes.content}>
        <div className={classes.toolbar} />
        {home === true ? <h1>Home Page</h1> : null}
        {alert === true ? <h1>Alert Page</h1> : null}
        {graph === true ? <h1>Graph Page</h1> : null}
        {data === true ? <h1>Data Page</h1> : null}
      </main> */}
      {/* CONTENT OF THE ALERT PAGE COMES HERE */}
    </div>
  );
}
