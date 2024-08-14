import React, { useState } from 'react';
import { TextField, Button, Container, Typography, InputAdornment, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import MarkunreadMailboxIcon from '@mui/icons-material/MarkunreadMailbox';
import ProgressBar from './components/ProgressBar';
import { useTranslation } from 'react-i18next';

const SignUpInfo = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [postal, setPostal] = useState('');
  const [emailError, setEmailError] = useState(false);
  
  const navigate = useNavigate();

  const handleLogin = () => {
    const emailValid = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);

    if (!emailValid) {
      setEmailError(true);
      return;
    } else {
      setEmailError(false);
    }

    if(emailValid && password !== '' && name !== '' && postal !== '') {
      navigate('/payment-info');
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
      <ProgressBar currentStep={2} />
      <Box sx={{ backgroundColor: 'white', p: 2, borderRadius: 2, width: '100%'}}>
        <Typography variant="h4" gutterBottom align="center" style={{fontFamily: 'Montserrat, sans-serif', fontWeight: '500'}}>
          {t('sign_up')}
        </Typography>
        <TextField
          label={t('full_name')}
          variant="outlined"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label={t('email_address')}
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AlternateEmailIcon />
              </InputAdornment>
            ),
          }}
          error={emailError}
          helperText={emailError && t('Invalid email')}
        />
        <TextField
          label={t('postal_code')}
          variant="outlined"
          fullWidth
          margin="normal"
          value={postal}
          onChange={(e) => setPostal(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MarkunreadMailboxIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label={t("password")}
          variant="outlined"
          fullWidth
          type="password"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
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
          disabled={email === '' || password === '' || name === '' || postal === ''}
        >
          {t('continue')}
        </Button>
      </Box>
    </Container>
  );
};

export default SignUpInfo;
