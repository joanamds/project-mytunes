import React, { Component } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Divider, 
  Fade 
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Loading from '../components/Loading';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      favoritesList: [],
    };
  }

  async componentDidMount() {
    await this.getFavoritesSaved();
  }

  removeFavorite = async (event) => {
    // Note: Mantemos o isLoading para o efeito de Skeleton que você pediu
    this.setState({ isLoading: true });
    
    const { favoritesList } = this.state;
    const { target } = event;
    const { name } = target;
    
    const findTrack = favoritesList.find((track) => track.trackName === name);
    await removeSong(findTrack);
    
    const updateList = favoritesList.filter((music) => music.trackName !== name);
    
    this.setState({
      isLoading: false,
      favoritesList: updateList,
    });
  };

  getFavoritesSaved = async () => {
    const favorites = await getFavoriteSongs();
    this.setState({
      favoritesList: favorites,
      isLoading: false,
    });
  };

  isChecked = (trackId) => {
    const { favoritesList } = this.state;
    return favoritesList.some((music) => music.trackId === trackId);
  };

  render() {
    const { isLoading, favoritesList } = this.state;
    const mainGreen = '#1DB954';

    if (isLoading) return <Loading />;

    return (
      <Box sx={{ bgcolor: '#121212', minHeight: '100vh', pb: 8 }}>
        <Header />
        
        <Container maxWidth="md" sx={{ mt: 6 }} data-testid="page-favorites">
          {/* Cabeçalho da Página */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
            <Box 
              sx={{ 
                bgcolor: 'linear-gradient(135deg, #450af5 0%, #c4efd9 100%)', 
                width: 60, 
                height: 60, 
                borderRadius: 2, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                boxShadow: '0 8px 16px rgba(0,0,0,0.4)'
              }}
            >
              <FavoriteIcon sx={{ color: '#fff', fontSize: 30 }} />
            </Box>
            <Box>
              <Typography variant="h4" sx={{ color: '#fff', fontWeight: 900 }}>
                Músicas Curtidas
              </Typography>
              <Typography variant="body2" sx={{ color: '#aaa', fontWeight: 500 }}>
                {favoritesList.length} músicas
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ bgcolor: 'rgba(255,255,255,0.1)', mb: 4 }} />

          {/* Lista de Favoritas */}
          <Box className="content-favorites">
            {favoritesList.length === 0 ? (
              <Typography sx={{ color: '#aaa', textAlign: 'center', mt: 10 }}>
                Você ainda não curtiu nenhuma música. Comece a explorar!
              </Typography>
            ) : (
              favoritesList.map((track, index) => (
                <Fade in timeout={500 + (index * 100)} key={ track.trackId }>
                  <Box>
                    <MusicCard
                      previewUrl={ track.previewUrl }
                      trackName={ track.trackName }
                      trackId={ track.trackId }
                      isFavorite={ this.isChecked(track.trackId) }
                      onFavoriteChange={ this.removeFavorite }
                    />
                  </Box>
                </Fade>
              ))
            )}
          </Box>
        </Container>
      </Box>
    );
  }
}

export default Favorites;