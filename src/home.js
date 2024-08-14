import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@mui/styles';

const Home = () => {
    const carouselItems = [
        { id: 1, src: process.env.PUBLIC_URL + '/images/across_the_spider-verse.jpeg'},
        { id: 2, src: process.env.PUBLIC_URL + '/images/johnwick.jpeg' },
        { id: 3, src: process.env.PUBLIC_URL + '/images/mario.jpeg' },
        { id: 4, src: process.env.PUBLIC_URL + '/images/creed.jpg' },
        { id: 5, src: process.env.PUBLIC_URL + '/images/fast10.jpg' },
        { id: 6, src: process.env.PUBLIC_URL + '/images/antman.jpg'},
        { id: 7, src: process.env.PUBLIC_URL + '/images/atom.jpg' },
        { id: 8, src: process.env.PUBLIC_URL + '/images/shazam.jpeg' },
        { id: 9, src: process.env.PUBLIC_URL + '/images/joker.jpg' },
      ];
    
      const responsive = {
        superLargeDesktop: {
          breakpoint: { max: 4000, min: 3000 },
          items: 3
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };
    

      const { t } = useTranslation();
    

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



      return (
        <div>
          <div style={{ paddingTop: '20vh' }}>
            <Typography variant="h4" align="center" style={{color: 'white', fontFamily: 'Montserrat, sans-serif'}} gutterBottom>
              {t('access_info')}
            </Typography>
            <div style={{ maxWidth: '40%', margin: 'auto', padding: '20px 0', textAlign: 'center' }}>
              <Carousel 
              responsive={responsive}
              autoPlay={true}
              autoPlaySpeed={2000}
              autoPlayActionDisabled={true}
              infinite={true}
              >
                {carouselItems.map((item) => (
                  <div key={item.id} style={{ padding: '0 10px' }}>
                    <img src={item.src} alt="Movie poster" style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
                  </div>
                ))}
              </Carousel>
            </div>
    
            <Box display="flex" justifyContent="center" mt={3}>
              {isLoggedIn ? (
                <Button 
                  sx={{
                    color: 'white',
                    backgroundColor: '#354970',
                    fontFamily: 'Montserrat, sans-serif',
                    padding: '5px 10px',
                    marginRight: '15px',
                    fontSize: '20px',
                    transition: '0.3s',
                    '&:hover': {
                      backgroundColor: '#466582',
                    },
                  }}
                >
                  <Link to="/browse" style={{ color: 'inherit', textDecoration: 'none' }}>{t('browse')}</Link>
                </Button>
              ) : (
                <>
                  <Button 
                    sx={{
                      color: 'white',
                      backgroundColor: '#354970',
                      fontFamily: 'Montserrat, sans-serif',
                      padding: '5px 10px',
                      marginRight: '15px',
                      fontSize: '20px',
                      transition: '0.3s',
                      '&:hover': {
                        backgroundColor: '#466582',
                      },
                    }}
                  >
                    <Link to="/login" style={{ color: 'inherit', textDecoration: 'none' }}>{t('login')}</Link>
                  </Button>
                  <Button 
                    sx={{
                      color: 'white',
                      backgroundColor: '#354970',
                      fontFamily: 'Montserrat, sans-serif',
                      padding: '5px 10px',
                      marginRight: '15px',
                      fontSize: '20px',
                      transition: '0.3s',
                      '&:hover': {
                        backgroundColor: '#466582',
                      },
                    }}
                  >
                    <Link to="/membership" style={{ color: 'inherit', textDecoration: 'none' }}>{t('sign_up')}</Link>
                  </Button>
                </>
              )}
            </Box>
          </div>
        </div>
      );
};

export default Home;
