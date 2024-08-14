import React from 'react';
import { Container, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Help = () => {
  const { t } = useTranslation();

  return (
    <div style={{paddingTop: "10vh"}}>
      <Typography variant="h5" align="center" style={{fontSize: "30px", color: 'white', fontFamily: 'Montserrat, sans-serif', fontWeight: '500'}}>FAQ</Typography>
      <Container maxWidth="sm">
        <Typography variant="h4" gutterBottom align="center" style={{fontFamily: 'Montserrat, sans-serif', fontWeight: '500'}}>
          {t('help_center')}
        </Typography>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography style={{fontFamily: 'Montserrat, sans-serif', fontWeight: '700'}}>{t('Is it a one time fee?')}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography style={{fontFamily: 'Montserrat, sans-serif'}}>
              {t('Yes! Pay once and have acces forever.')}
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography style={{fontFamily: 'Montserrat, sans-serif', fontWeight: '700'}}>{t('Is there a free trial?')}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography style={{fontFamily: 'Montserrat, sans-serif'}}>
              {t('No there is no free trial unfortunately.')}
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Typography style={{fontFamily: 'Montserrat, sans-serif', fontWeight: '700'}}>{t('How many movies are there?')}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography style={{fontFamily: 'Montserrat, sans-serif'}}>
              {t('Our database as over 10,000+ movies.')}
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Container>
    </div>
  );

};

export default Help;
