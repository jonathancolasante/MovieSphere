import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, Menu, MenuItem } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import logo from '../MovieSphere-2.png';
import { useTranslation } from 'react-i18next';

import TranslateIcon from '@mui/icons-material/Translate';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import HelpIcon from '@mui/icons-material/Help';

import { useNavigate } from 'react-router-dom';



const NavBar = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
  
    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const { t, i18n } = useTranslation();
    const [language, setLanguage] = React.useState(i18n.language || 'en');

    const toggleLanguage = () => {
      const newLanguage = language === 'en' ? 'fr' : 'en';
      i18n.changeLanguage(newLanguage);
      setLanguage(newLanguage);
    };

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
      const checkLoginStatus = () => {
        const userIsAuthenticated = localStorage.getItem('isLoggedIn') === 'true';
        setIsLoggedIn(userIsAuthenticated);
      };
  
      // Check the login status when the component mounts
      checkLoginStatus();
  
      // Add event listener for localStorage changes
      window.addEventListener('storage', checkLoginStatus);
  
      // Remove event listener on cleanup
      return () => {
        window.removeEventListener('storage', checkLoginStatus);
      };
    }, []);

    const navigate = useNavigate();

    const handleLogout = () => {
      setAnchorEl(null);
      logoutUser();
      setIsLoggedIn(false);
      navigate('/');
      window.location.reload();
    };

    function logoutUser() {
      localStorage.removeItem('isLoggedIn');
    }


    return (
      <AppBar position="static" style={{ background: '#1B263B'}}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="logo" style={{marginLeft: '-25px'}}>
            <img src={logo} alt="logo" style={{ height: '50px', width: '50px'}}/>
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1, fontSize: '30px', fontFamily: 'Montserrat, sans-serif'}}>
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>MovieSphere</Link>
          </Typography>
          <Button color="inherit" style={{fontSize: '20px', fontFamily: 'Montserrat, sans-serif'}}>
            <Link to="/" style={{ color: isLoggedIn ? 'inherit' : 'grey', textDecoration: 'none', pointerEvents: isLoggedIn ? "auto": "none"  }}>{t('home')}</Link>
          </Button>
          <Button color="inherit" style={{fontSize: '20px', fontFamily: 'Montserrat, sans-serif'}}>
            <Link to="/browse" style={{ color: isLoggedIn ? 'inherit' : 'grey', textDecoration: 'none', pointerEvents: isLoggedIn ? "auto": "none"  }}>{t('browse')}</Link>
          </Button>
          <Button color="inherit" style={{fontSize: '20px', fontFamily: 'Montserrat, sans-serif', marginRight: '15px' }}>
            <Link to="/news" style={{ color: isLoggedIn ? 'inherit' : 'grey', textDecoration: 'none', pointerEvents: isLoggedIn ? "auto": "none" }}>{t('news')}</Link>
          </Button>

          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            style={{padding: 0}}
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle style={{fontSize: '35'}} />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                marginTop: '10px', // Add margin top to the menu
              },
            }}
          >
            <MenuItem onClick={toggleLanguage}>
              <TranslateIcon style={{ marginRight: "8px" }}/>
              {language === 'en' ? 'Français' : 'English'}
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <HelpIcon style={{ marginRight: "8px" }}/>
              <Link to="/help" style={{ color: 'inherit', textDecoration: 'none' }}>{t('help')}</Link>
            </MenuItem>
            {!(isLoggedIn) && (
              <MenuItem onClick={handleClose}>
                <LoginIcon style={{ marginRight: "8px" }}/>
                <Link to="/login" style={{ color: 'inherit', textDecoration: 'none' }}>{t('login')}</Link>
              </MenuItem>
            )}
            {!(isLoggedIn) && (
              <MenuItem onClick={handleClose}>
                <AccountBoxIcon style={{ marginRight: "8px" }}/>
                <Link to="/membership" style={{ color: 'inherit', textDecoration: 'none' }}>{t('sign_up')}</Link>
              </MenuItem>
            )}
            {isLoggedIn && (
              <MenuItem onClick={handleLogout}>
                <LogoutIcon style={{ marginRight: "8px" }}/>
                {t('logout')}
              </MenuItem>
            )}
          </Menu>
        </Toolbar>
      </AppBar>
    );
  };
  
  export default NavBar;
  