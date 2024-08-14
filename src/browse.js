import React from 'react';
import { Container, Card, CardMedia, Typography, Grid, Drawer, List, ListItem, ListItemText, Checkbox} from '@mui/material';
import rawMoviesData from './data/moviesData';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import "./BrowsePage.css"


const drawerWidth = 240;

const Browse = () => {
  const [filters, setFilters] = React.useState({
    expertPicks: false,
    newReleases: false,
    rating: {0: false, 1: false, 2: false, 3: false, 4: false, 5: false},
    genre: {Action: false, Adventure: false, Comedy: false, Drama: false, Horror: false, test: false}  // Add more genres here
  });


  const moviesData = rawMoviesData.map(movie => ({
    ...movie,
    image: process.env.PUBLIC_URL + movie.image,
  }));

  const handleFilterChange = (event) => {
    if(['expertPicks', 'newReleases'].includes(event.target.name)){
      setFilters({ ...filters, [event.target.name]: event.target.checked });
    }
    else{
      setFilters({ ...filters, [event.target.name]: {...filters[event.target.name], [event.target.value]: event.target.checked}});
    }
  };

  const filteredMovies = moviesData.filter(movie => {
    const ratings = Object.keys(filters.rating).filter(key => filters.rating[key]);
    const genres = Object.keys(filters.genre).filter(key => filters.genre[key]);
    return (
      (filters.newReleases ? movie.new : true) &&
      (filters.expertPicks ? movie.expert : true) &&
      (ratings.length > 0 ? ratings.includes(String(movie.rating)) : true) &&
      (genres.length > 0 ? genres.includes(movie.genre) : true)
    );
  });

  const theme = useTheme();
  const isScreenSizeSmOrLarger = useMediaQuery(theme.breakpoints.up('sm'));

  const { t } = useTranslation();

  return (
    <div className="browsepage">
      <div style={{ display: 'flex', paddingTop: '7vh'}}>
      <Drawer
        variant="permanent"
        PaperProps={{
          style: {
            marginTop: '4.2rem',
            width: drawerWidth,
            backgroundColor: '#DFD9CF'

          },
        }}
      >
        <List>
          <ListItem>
            <Checkbox
              checked={filters.expertPicks}
              onChange={handleFilterChange}
              name="expertPicks"
            />
            <ListItemText primary={t('expert_picks')} style={{fontFamily: 'Montserrat, sans-serif'}} />
          </ListItem>
          <ListItem>
            <Checkbox
              checked={filters.newReleases}
              onChange={handleFilterChange}
              name="newReleases"
            />
            <ListItemText primary={t("new_releases")} style={{fontFamily: 'Montserrat, sans-serif'}} />
          </ListItem>
          <Typography variant='h6' style={{fontFamily: 'Montserrat, sans-serif', marginLeft: "10px"}}>{t('rating')}</Typography>
          {Object.keys(filters.rating).map((rating) => (
            <ListItem key={rating}>
              <Checkbox
                checked={filters.rating[rating]}
                onChange={handleFilterChange}
                name="rating"
                value={rating}
              />
              <ListItemText primary={rating + "/5"} style={{fontFamily: 'Montserrat, sans-serif'}}/>
            </ListItem>
          ))}
          <Typography variant='h6' style={{fontFamily: 'Montserrat, sans-serif', marginLeft: "10px"}}>Genre</Typography>
          {Object.keys(filters.genre).map((genre) => (
            <ListItem key={genre}>
              <Checkbox
                checked={filters.genre[genre]}
                onChange={handleFilterChange}
                name="genre"
                value={genre}
              />
              <ListItemText primary={t(genre)} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Container style={{ 
        marginLeft: isScreenSizeSmOrLarger ? drawerWidth : 0, 
        width: isScreenSizeSmOrLarger ? `calc(100% - ${drawerWidth}px)` : '100%',
        height: 'calc(100vh - 4.2rem)', // calculate height, substract the navbar height and some padding
        overflowY: 'auto', // make it scrollable
        paddingBottom: '2rem', // add some padding at the bottom
        marginTop: '-4.2rem', // add some padding at the top
        paddingTop: '4rem', // add some padding at the top
      }}>
        <Grid container spacing={3}>
          {filteredMovies.map((movie) => (
            <Grid item xs={12} sm={6} md={4} key={movie.id}>
              <Card 
              sx={{ width: '90%', height: 390 }}
              >
                <Link to={`/movie/${movie.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                    <CardMedia
                        component="img"
                        height="100%"
                        image={movie.image}
                        alt={movie.title}
                        sx={{ objectFit: 'fill' }}
                    />
                </Link>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
    </div>
  );
};

export default Browse;
