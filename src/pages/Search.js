import React, { Component } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Container, 
  Grid, 
  InputAdornment,
  Fade
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';
import AlbumCard from '../components/AlbumCard';
import pepe from '../images/pepe-music.gif';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      isDisabled: true,
      searchItem: '',
      isLoading: false,
      albumsList: [],
      searchMessage: '',
      notSearch: true
    };
  }

  onSearchChange = ({ target }) => {
    const { value } = target;
    this.setState({
      searchItem: value,
    }, () => this.validateSearch());
  };

  validateSearch = () => {
    const { searchItem } = this.state;
    const minLength = 2;
    this.setState({
      isDisabled: searchItem.length < minLength,
    });
  };

  onSearchClick = async () => {
    const { searchItem } = this.state;
    this.setState({ isLoading: true, notSearch: false });
    const response = await searchAlbumsAPI(searchItem);
    this.setState({
      isLoading: false,
      albumsList: response,
      searchMessage: `Resultado de álbuns de: ${searchItem}`,
      searchItem: '', 
    });
  };

  render() {
    const { isDisabled, isLoading, albumsList, searchMessage, notSearch, searchItem } = this.state;
    const mainGreen = '#1DB954';

    if (isLoading) return <Loading />;

    return (
      <Box sx={{ bgcolor: '#121212', minHeight: '100vh', pb: 8 }}>
        <Header />
        
        <Container maxWidth="lg" sx={{ mt: 0, pt: 2 }}>
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'stretch', // Estica para ambos terem a mesma altura real
              justifyContent: 'center',
              gap: 2,
              mb: 5, 
              bgcolor: 'rgba(255,255,255,0.03)',
              p: 1.5,
              borderRadius: 2,
              border: '1px solid rgba(255,255,255,0.05)'
            }}
          >
            <TextField
              fullWidth
              variant="standard" // Mudamos para standard para remover o espaço do label do 'filled'
              placeholder="Nome do Artista ou Banda"
              data-testid="search-artist-input"
              onChange={ this.onSearchChange }
              value={ searchItem }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" sx={{ mt: '0 !important' }}>
                    <SearchIcon sx={{ color: mainGreen, ml: 2 }} />
                  </InputAdornment>
                ),
                disableUnderline: true, // Remove a linha do variant standard
                sx: { 
                  color: '#fff', 
                  bgcolor: 'rgba(255,255,255,0.08)', 
                  borderRadius: 2,
                  height: '48px',
                  display: 'flex',
                  alignItems: 'center', // Centraliza a lupa verticalmente
                  '& input': {
                    padding: '0 12px !important', // Centraliza o texto verticalmente
                    height: '100%',
                  }
                }
              }}
            />
            <Button
              variant="contained"
              data-testid="search-artist-button"
              disabled={ isDisabled }
              onClick={ this.onSearchClick }
              sx={{ 
                px: 6, 
                height: '48px',
                minWidth: { sm: '180px' },
                bgcolor: mainGreen, 
                color: '#000', 
                fontWeight: '900',
                borderRadius: 2,
                '&:hover': { bgcolor: '#1ed760' },
                '&:disabled': { bgcolor: '#333', color: '#666' }
              }}
            >
              PROCURAR
            </Button>
          </Box>

          <Box>
            {notSearch ? (
              <Fade in timeout={1000}>
                <Box sx={{ textAlign: 'center', mt: 6 }}>
                  <Box 
                    component="img"
                    src={pepe} 
                    sx={{ 
                      width: 200, 
                      borderRadius: '50%', 
                      border: `4px solid ${mainGreen}`,
                    }} 
                  />
                  <Typography variant="h5" sx={{ color: '#fff', mt: 3, fontWeight: 700 }}>
                    Sua música, sua jornada.
                  </Typography>
                </Box>
              </Fade>
            ) : (
              <Box>
                <Typography variant="h6" sx={{ color: '#aaa', mb: 3, fontWeight: 500 }}>
                  { albumsList.length === 0 ? 'Nenhum álbum encontrado' : searchMessage }
                </Typography>

                <Grid container spacing={3}>
                  {albumsList.map((album) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={ album.collectionId }>
                      <AlbumCard
                        artistId={ album.artistId }
                        artistName={ album.artistName }
                        artworkUrl100={ album.artworkUrl100 }
                        collectionId={ album.collectionId }
                        collectionName={ album.collectionName }
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
          </Box>
        </Container>
      </Box>
    );
  }
}

export default Search;