import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Paper, 
  Divider 
} from '@mui/material';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      contentAlbum: [],
      isLoading: true,
      favoritesList: [],
    };
  }

  async componentDidMount() {
    await this.getAlbumSongs();
    await this.getFavoritesSaved();
  }

  getAlbumSongs = async () => {
    const { match: { params: { id } } } = this.props;
    const response = await getMusics(id);
    this.setState({
      contentAlbum: response,
      isLoading: false,
    });
  };

  getFavorite = async (event) => {
    const { contentAlbum } = this.state;
    const { target } = event;
    const { checked, name } = target;

    // Loading interno enquanto salva no storage
    this.setState({ isLoading: true });

    const findTrack = contentAlbum.find((track) => track.trackName === name);
    
    if (checked) {
      await addSong(findTrack);
    } else {
      await removeSong(findTrack);
    }
    
    await this.getFavoritesSaved();
  };

  getFavoritesSaved = async () => {
    const favorites = await getFavoriteSongs();
    this.setState({
      isLoading: false,
      favoritesList: favorites,
    });
  };

  isChecked = (trackId) => {
    const { favoritesList } = this.state;
    return favoritesList.some((music) => music.trackId === trackId);
  };

  render() {
    const { contentAlbum, isLoading } = this.state;
    const mainGreen = '#1DB954';

    if (isLoading) return <Loading />;

    // O primeiro item do array é sempre a info do álbum
    const albumInfo = contentAlbum[0];
    const trackList = contentAlbum.slice(1);

    return (
      <Box sx={{ bgcolor: '#121212', minHeight: '100vh', pb: 10 }}>
        <Header />
        
        <Container maxWidth="lg" sx={{ mt: { xs: 4, md: 8 } }}>
          <Grid container spacing={4} data-testid="page-album">
            
            {/* COLUNA DA ESQUERDA: CAPA E INFO */}
            <Grid item xs={12} md={4}>
              <Box sx={{ position: { md: 'sticky' }, top: 100, textAlign: { xs: 'center', md: 'left' } }}>
                <Paper 
                  elevation={24} 
                  sx={{ 
                    borderRadius: 2, 
                    overflow: 'hidden', 
                    mb: 3,
                    lineHeight: 0
                  }}
                >
                  <img
                    src={ albumInfo.artworkUrl100.replace('100x100bb', '500x500bb') }
                    alt={ albumInfo.artistName }
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                  />
                </Paper>
                
                <Typography 
                  variant="h4" 
                  data-testid="album-name"
                  sx={{ color: '#fff', fontWeight: 900, mb: 1 }}
                >
                  { albumInfo.collectionName }
                </Typography>
                
                <Typography 
                  variant="h6" 
                  data-testid="artist-name"
                  sx={{ color: mainGreen, fontWeight: 700, opacity: 0.9 }}
                >
                  { albumInfo.artistName }
                </Typography>
              </Box>
            </Grid>

            {/* COLUNA DA DIREITA: LISTA DE MÚSICAS */}
            <Grid item xs={12} md={8}>
              <Box sx={{ pl: { md: 4 } }}>
                <Typography 
                  variant="overline" 
                  sx={{ color: '#aaa', fontWeight: 900, letterSpacing: 2 }}
                >
                  Músicas ({trackList.length})
                </Typography>
                <Divider sx={{ bgcolor: 'rgba(255,255,255,0.1)', mb: 3, mt: 1 }} />
                
                <Box className="content-album">
                  { trackList.map((track) => (
                    <MusicCard
                      key={ track.trackId }
                      previewUrl={ track.previewUrl }
                      trackName={ track.trackName }
                      trackId={ track.trackId }
                      onFavoriteChange={ this.getFavorite }
                      isFavorite={ this.isChecked(track.trackId) }
                    />
                  ))}
                </Box>
              </Box>
            </Grid>

          </Grid>
        </Container>
      </Box>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;