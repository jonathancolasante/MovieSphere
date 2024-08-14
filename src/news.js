import React from 'react';
import { Container, Card, CardContent, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const News = () => {
  const { t } = useTranslation();

  const newsPieces = [
    {
      title: t('news_article_1'),
      content: t('content_1')
    },
    {
      title: t('news_article_2'),
      content: t('content_2')
    },
    {
      title: t('news_article_3'),
      content: t('content_3')
    },
    // add more news pieces as needed
  ];

  return (
    <div style={{paddingTop: "10vh"}}>
      <Typography variant="h5" align="center" style={{fontSize: "30px", color: 'white', fontFamily: 'Montserrat, sans-serif', fontWeight: '500'}}>Latest News</Typography>
      <Container maxWidth="lg">
        {newsPieces.map((newsPiece) => (
          <Card style={{marginTop: 40, backgroundColor: "#DFD9CF"}}>
            <CardContent>
              <Typography variant="h5" component="div" style={{fontFamily: 'Montserrat, sans-serif', fontWeight: '500'}}>
                {newsPiece.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" style={{fontFamily: 'Montserrat, sans-serif', color:"black"}}>
                {newsPiece.content}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Container>
    </div>
  );
};

export default News;
