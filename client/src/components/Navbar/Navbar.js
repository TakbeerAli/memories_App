import React,{ useState, useEffect } from 'react'
import { Link, useHistory,useLocation } from "react-router-dom";
import decode from 'jwt-decode';
import {Container,Button, AppBar, Typography, Grow, Grid, Avatar,Toolbar } from "@material-ui/core";
import { useDispatch }  from "react-redux";
import memories from '../../images/memories.png';

import useStyles from "./style";

const Navbar = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const logout = () =>{

      dispatch({ type:'LOGOUT'});
      history.push('/');
      setUser(null);

    }

     useEffect(() => {
       const token = user?.token;
      


       if (token) {
        const decodedToken = decode(token);
  
        if (decodedToken.exp * 1000 < new Date().getTime()) logout();
      }

       setUser(JSON.parse(localStorage.getItem('profile')));
           }, [location])

    const classes = useStyles();

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
        <div className={classes.brandContainer}>
        <Typography className={classes.heading} component={Link} to="/" variant="h3" align="center">Memories</Typography>
         <img className={classes.image} src={memories} alt="memories" height="60" />
        </div>
        <Toolbar className={classes.toolbar}>
          { user ? (
              <div className={classes.profile}>
                 <Avatar className={classes.purple} alit={user.result.name} src={user.result.imageUrl}>{user.result.name}</Avatar>
                 <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                 <Button className={classes.logout} variant="contained" color="secondary" onClick={logout} >Logout</Button>
              </div>

          ): (
             <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
          )}

        </Toolbar>
      
      </AppBar>
    )
}

export default Navbar
