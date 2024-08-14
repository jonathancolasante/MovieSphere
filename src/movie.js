import React, { useState} from 'react';
import { useParams } from 'react-router-dom';
import rawMoviesData from './data/moviesData';
import rawMoviesData_fr from './data/moviesData_fr';
import { Container, Card, CardContent, Typography, Grid, CardMedia, List, ListItem, TextField, Button, Box, Link } from '@mui/material';
import ShowtimeDialog from './components/ShowtimeDialog';
import { useTranslation } from 'react-i18next';

const Movie = () => {
  const { i18n } = useTranslation();
  const moviesData = (i18n.language === 'fr' ? rawMoviesData_fr : rawMoviesData).map(movie => ({
    ...movie,
    image: process.env.PUBLIC_URL + movie.image,
  }));

  const { movieId } = useParams();
  const movie = moviesData.find(m => m.id === parseInt(movieId));

  // Local state for comments
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // Local state for dialog visibility
  const [openDialog, setOpenDialog] = useState(false);


  // Handles new comment submission
  const handleNewComment = (e) => {
    e.preventDefault();
    if(newComment.trim() !== "") {
      setComments([...comments, newComment]);
      setNewComment("");
    }
  };

  // Handle dialog open and close
  const handleClickOpen = (e) => {
    e.preventDefault();
    setOpenDialog(true);
  };
  
  const handleClose = () => {
    setOpenDialog(false);
  };

  const { t } = useTranslation();

  return (
    <div style={{ paddingTop: '3vh' }}>
    <Container>
      <Typography variant="h5" align="center" style={{fontSize: "30px", marginBottom: "30px", color: 'white', fontFamily: 'Montserrat, sans-serif', fontWeight: '500'}}>{movie.title}</Typography>
      <Grid container spacing={3}>
        {/* Image box */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              height="408"
              image={movie.image}
              alt={movie.title}
              sx={{ objectFit: 'fill' }}
            />
          </Card>
        </Grid>
        {/* Summary box */}
        <Grid item xs={12} md={6}>
          <Card style={{height: '408px', overflow: 'auto', backgroundColor: '#DFD9CF'}}>
            <CardContent>
              <Typography variant="h5" style={{fontFamily: 'Montserrat, sans-serif'}}>{t('summary')}</Typography>
              <Typography variant="body1" style={{fontFamily: 'Montserrat, sans-serif'}}>{movie.summary}</Typography>
            </CardContent>
          </Card>
        </Grid>
        {/* Details box */}
        <Grid item xs={12} md={6}>
          <Card style={{backgroundColor: '#DFD9CF'}}>
            <CardContent style={{fontFamily: 'Montserrat, sans-serif'}}>
              <Typography variant="h5" style={{fontFamily: 'Montserrat, sans-serif', marginBottom: "10px"}}>{t('details')}</Typography>
              <Typography variant="body1" style={{fontFamily: 'Montserrat, sans-serif'}}>Genre: {movie.genre}</Typography>
              <Typography variant="body1" style={{fontFamily: 'Montserrat, sans-serif'}}>{t('rating')}: {movie.rating}/5</Typography>
              <Typography variant="body1" style={{fontFamily: 'Montserrat, sans-serif'}}>Audience: {movie.audience}</Typography>
              <Typography variant="body1" style={{fontFamily: 'Montserrat, sans-serif'}}>{t('where_to_watch')}: {movie.watch}</Typography>
              <Typography variant="body1" style={{fontFamily: 'Montserrat, sans-serif'}}>
                <Link href="#" onClick={handleClickOpen}>
                  {t('view_showtime_calendar')}
                </Link>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        {/* Expert reviews box */}
        <Grid item xs={12} md={6}>
          <Card style={{backgroundColor: '#DFD9CF'}}>
            <CardContent>
              <Typography variant="h5" style={{fontFamily: 'Montserrat, sans-serif'}}>{t('expert_reviews')}</Typography>
              <List>
                {movie.expertReviews.map((review, index) => (
                  <ListItem key={index}>
                    <Typography variant="body1" style={{fontFamily: 'Montserrat, sans-serif'}}>{review}</Typography>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
        {/* Comment section */}
        <Grid item xs={12}>
          <Card style={{backgroundColor: '#DFD9CF', fontFamily: 'Montserrat, sans-serif', marginBottom:"20px"}}>
            <CardContent>
              <Typography variant="h5" style={{fontFamily: 'Montserrat, sans-serif'}}>{t('comments')}</Typography>
              <form onSubmit={handleNewComment}>
                <TextField 
                  label={t('new_comment')} 
                  value={newComment} 
                  onChange={e => setNewComment(e.target.value)} 
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
                <Box mt={2}>
                  <Button type="submit" variant="contained" color="primary">
                    {t('add_comment')}
                  </Button>
                </Box>
              </form>
              <List>
                {comments.map((comment, index) => (
                  <ListItem key={index}>
                    <Typography variant="body1">{comment}</Typography>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
    <ShowtimeDialog open={openDialog} onClose={handleClose}/>
    </div>
  );
};

export default Movie;