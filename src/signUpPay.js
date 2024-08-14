import React, { useState } from 'react';
import { TextField, Button, Container, Typography, InputAdornment, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import SecurityIcon from '@mui/icons-material/Security';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ProgressBar from './components/ProgressBar';
import { useTranslation } from 'react-i18next';

const SignUpPay = () => {
  const [credit, setCredit] = useState('');
  const [security, setSecurity] = useState('');
  const [address, setAddress] = useState('');
  const [expiry, setExpiry] = useState('');
  const [creditError, setCreditError] = useState(false);
  const [securityError, setSecurityError] = useState(false);
  
  const navigate = useNavigate();

  const handleLogin = () => {
    const creditValid = !isNaN(credit);
    const securityValid = !isNaN(security);

    if (!creditValid) {
      setCreditError(true);
      return;
    } else {
      setCreditError(false);
    }

    if (!securityValid) {
      setSecurityError(true);
      return;
    } else {
      setSecurityError(false);
    }

    if(creditValid && securityValid && address !== '' && expiry !== '') {
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/');
      window.location.reload();
    }
  };

  const [isLargeScreen, setIsLargeScreen] = React.useState(window.innerWidth > 1700);
  
  React.useEffect(() => {
    const handleResize = () => setIsLargeScreen(window.innerWidth > 1700);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { t } = useTranslation();

  return(
    <Container maxWidth="xs" style={{height: '80vh', display: 'flex', alignItems: 'center', flexDirection: 'column', marginTop: isLargeScreen ? '-5vh' : '0px'}}>
      <ProgressBar currentStep={3} />
      <Box sx={{ backgroundColor: 'white', p: 2, borderRadius: 2}}>
        <Typography variant="h4" gutterBottom align="center" style={{fontFamily: 'Montserrat, sans-serif', fontWeight: '500'}}>
          {t('sign_up')}
        </Typography>
        <TextField
          label={t('billing_address')}
          variant="outlined"
          fullWidth
          margin="normal"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <HomeIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label={t('credit_card_number')}
          variant="outlined"
          fullWidth
          margin="normal"
          value={credit}
          onChange={(e) => setCredit(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CreditCardIcon />
              </InputAdornment>
            ),
          }}
          error={creditError}
          helperText={creditError && t('Invalid credit card number')}
        />
        <TextField
          label={t('security_code')}
          variant="outlined"
          fullWidth
          margin="normal"
          value={security}
          onChange={(e) => setSecurity(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SecurityIcon />
              </InputAdornment>
            ),
          }}
          error={securityError}
          helperText={securityError && t('Invalid security code')}
        />
        <TextField
          label={t('expiry_date')}
          variant="outlined"
          fullWidth
          margin="normal"
          value={expiry}
          onChange={(e) => setExpiry(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CalendarMonthIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleLogin}
          style={{marginTop: '1rem'}}
          disabled={credit === '' || expiry === '' || security === '' || address === ''}
        >
          {t('continue')}
        </Button>
      </Box>
    </Container>
  );
};

export default SignUpPay;
