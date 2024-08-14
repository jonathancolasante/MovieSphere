import React from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import ProgressBar from './components/ProgressBar';
import { useTranslation } from 'react-i18next';


const Membership = () => {

  const { t } = useTranslation();

  return(
    <div style={{ paddingTop: '15vh' }}>
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 5 }}> 
      <ProgressBar currentStep={1} />
      <Card variant="outlined" sx={{ maxWidth: 445, mt: 3, fontFamily: 'Montserrat, sans-serif'}}>
        <Typography variant="h4" gutterBottom style={{fontFamily: 'Montserrat, sans-serif', color: 'black', textAlign: "center", marginTop: "10px"}}>
          {t('membership')}
        </Typography>
        <CardContent>
          <Typography variant="h5" style={{fontFamily: 'Montserrat, sans-serif', textAlign: "center", marginBottom: "10px", color: "black"}}>
            {t('purchase')}
          </Typography>
          <Typography variant="body2" gutterBottom style={{fontFamily: 'Montserrat, sans-serif', textAlign: "center", color: "black"}}>
           {t('membership_text')}
          </Typography>
        </CardContent>
        <Button variant="contained" color="primary" sx={{ mt: 3, marginTop: "-5px", marginBottom: "10px", marginLeft: "170px"}}>
          <Link to="/personal-info" style={{ color: 'inherit', textDecoration: 'none' }}>{t('sign_up')}</Link>
        </Button>
      </Card>
    </Box>
    </div>
  );
};

export default Membership;
