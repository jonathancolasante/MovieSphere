import React from 'react';
import { useTranslation } from 'react-i18next';

const Circle = ({ color, text }) => (
  <div style={{ 
    width: '70px', 
    height: '70px', 
    borderRadius: '50%', 
    backgroundColor: color, 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
    margin: '1rem',
    boxShadow: '0px 3px 6px #00000029'
  }}>
    <span style={{ fontSize: '10px', color: 'white' }}>{text}</span>
  </div>
);

const Arrow = () => (
  <div style={{ 
    width: '0', 
    height: '0', 
    borderTop: '10px solid transparent',
    borderBottom: '10px solid transparent',
    borderLeft: '20px solid grey', 
    alignSelf: 'center', 
    marginRight: '1rem', 
    marginLeft: '1rem'
  }} />
);

const ProgressBar = ({ currentStep }) => {
  const [isLargeScreen, setIsLargeScreen] = React.useState(window.innerWidth > 1700);
  
  React.useEffect(() => {
    const handleResize = () => setIsLargeScreen(window.innerWidth > 1700);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { t } = useTranslation();

  return (
    <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        maxWidth: '400px', 
        margin: 'auto',
        position: 'relative',
        top: isLargeScreen ? '-90px' : '0px' ,
        marginBottom: isLargeScreen ? '-20px' : '0px'
    }}>
      <Circle color={currentStep >= 1 ? 'green' : 'grey'} text={t('membership')} />
      <Arrow />
      <Circle color={currentStep >= 2 ? 'green' : 'grey'} text="Info" />
      <Arrow />
      <Circle color={currentStep >= 3 ? 'green' : 'grey'} text={t('payment')} />
    </div>
  );
};

export default ProgressBar;
