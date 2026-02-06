import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Container, 
  Paper, 
  InputAdornment,
  Fade,
  CircularProgress
} from '@mui/material';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { createUser } from '../services/userAPI';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      loginItem: '',
      isLoading: false,
      isDisabled: true,
    };
  }

  onLoginChange = ({ target }) => {
    const { value } = target;
    this.setState({
      loginItem: value,
    }, () => this.validateLogin());
  };

  validateLogin = () => {
    const { loginItem } = this.state;
    const minLength = 3;
    this.setState({
      isDisabled: loginItem.length < minLength,
    });
  };

  onButtonClick = async () => {
    const { loginItem } = this.state;
    const { history } = this.props;
    
    this.setState({ isLoading: true });
    
    await createUser({ name: loginItem });
    
    this.setState({ isLoading: false });
    history.push('/search');
  };

  render() {
    const { isLoading, isDisabled, loginItem } = this.state;
    const mainGreen = '#1DB954';

    return (
      <Fade in timeout={1000}>
        <Box 
          sx={{ 
            minHeight: '100vh', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            bgcolor: '#090909',
            p: 2 
          }}
        >
          <Container maxWidth="xs">
            <Paper 
              elevation={0}
              sx={{ 
                p: { xs: 4, sm: 6 }, 
                textAlign: 'center', 
                borderRadius: 4, 
                bgcolor: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <Box sx={{ mb: 4 }}>
                <MusicNoteIcon sx={{ fontSize: 70, color: mainGreen, mb: 1 }} />
                <Typography 
                  variant="h3" 
                  sx={{ 
                    color: '#fff', 
                    fontWeight: 900, 
                    letterSpacing: -1.5,
                    fontSize: { xs: '2rem', sm: '2.5rem' } 
                  }}
                >
                  My<span style={{ color: mainGreen }}>Tunes</span>
                </Typography>
                <Typography variant="body2" sx={{ color: '#555', mt: 1, fontWeight: 500 }}>
                  Sua música, sua jornada.
                </Typography>
              </Box>

              <Box component="form">
                <TextField
                  fullWidth
                  data-testid="login-name-input"
                  placeholder="Seu nome de usuário"
                  variant="filled"
                  value={ loginItem }
                  onChange={ this.onLoginChange }
                  disabled={ isLoading }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle sx={{ color: mainGreen }} />
                      </InputAdornment>
                    ),
                    disableUnderline: true,
                    sx: { 
                      color: '#fff', 
                      borderRadius: 2,
                      bgcolor: 'rgba(255,255,255,0.05)',
                      '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' },
                      '&.Mui-focused': { bgcolor: 'rgba(255,255,255,0.1)' }
                    }
                  }}
                  sx={{ mb: 3 }}
                />

                <Button
                  fullWidth
                  data-testid="login-submit-button"
                  variant="contained"
                  disabled={ isDisabled || isLoading }
                  onClick={ this.onButtonClick }
                  sx={{ 
                    py: 2, 
                    borderRadius: 2, 
                    bgcolor: mainGreen,
                    color: '#000',
                    fontWeight: '900',
                    fontSize: '0.9rem',
                    '&:hover': { 
                      bgcolor: '#1ed760', 
                      transform: 'translateY(-2px)',
                    },
                    '&:disabled': { bgcolor: '#222', color: '#444' },
                    transition: 'all 0.3s ease'
                  }}
                >
                  {isLoading ? (
                    <CircularProgress size={24} sx={{ color: '#000' }} />
                  ) : (
                    'ENTRAR'
                  )}
                </Button>
              </Box>
            </Paper>
          </Container>
        </Box>
      </Fade>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;