import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  Avatar, 
  Container, 
  Skeleton 
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import { getUser } from '../services/userAPI';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      user: '',
    };
  }

  async componentDidMount() {
    const userAPI = await getUser();
    this.setState({
      isLoading: false,
      user: userAPI.name,
    });
  }

  render() {
    const { isLoading, user } = this.state;
    const mainGreen = '#1DB954';

    return (
      <AppBar 
        position="sticky" 
        data-testid="header-component"
        sx={{ 
          bgcolor: '#000', 
          backgroundImage: 'none',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          boxShadow: 'none'
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 0 } }}>
            
            {/* Logo */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <MusicNoteIcon sx={{ color: mainGreen }} />
              <Typography
                variant="h6"
                sx={{ fontWeight: 900, color: '#fff', display: { xs: 'none', sm: 'block' } }}
              >
                My<span style={{ color: mainGreen }}>Tunes</span>
              </Typography>
            </Box>

            {/* Links de Navegação */}
            <Box sx={{ display: 'flex', gap: { xs: 0, sm: 2 } }}>
              <Button
                component={Link}
                to="/search"
                data-testid="link-to-search"
                startIcon={<SearchIcon />}
                sx={{ color: '#fff', '&:hover': { color: mainGreen } }}
              >
                Procurar
              </Button>
              <Button
                component={Link}
                to="/favorites"
                data-testid="link-to-favorites"
                startIcon={<FavoriteIcon />}
                sx={{ color: '#fff', '&:hover': { color: mainGreen } }}
              >
                Favoritas
              </Button>
            </Box>

            {/* Usuário */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              {isLoading ? (
                <Skeleton variant="circular" width={35} height={35} sx={{ bgcolor: '#333' }} />
              ) : (
                <>
                  <Typography 
                    variant="body2" 
                    data-testid="header-user-name"
                    sx={{ color: '#fff', fontWeight: 500, display: { xs: 'none', md: 'block' } }}
                  >
                    {user}
                  </Typography>
                  <Avatar 
                    sx={{ 
                      bgcolor: mainGreen, 
                      width: 35, 
                      height: 35, 
                      color: '#000',
                      fontWeight: 'bold',
                      fontSize: '0.9rem'
                    }}
                  >
                    {user.charAt(0).toUpperCase()}
                  </Avatar>
                </>
              )}
            </Box>

          </Toolbar>
        </Container>
      </AppBar>
    );
  }
}

export default Header;