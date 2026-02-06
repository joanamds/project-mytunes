import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { 
  Box, 
  Typography, 
  Paper, 
  Checkbox, 
  Divider 
} from '@mui/material';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';

class MusicCard extends Component {
  render() {
    const { 
      previewUrl, 
      trackName, 
      trackId, 
      onFavoriteChange, 
      isFavorite 
    } = this.props;

    const mainGreen = '#1DB954';

    return (
      <Paper
        elevation={0}
        sx={{
          bgcolor: 'rgba(255,255,255,0.02)',
          borderRadius: 2,
          mb: 2,
          p: 2,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'space-between',
          transition: 'transform 0.2s, background-color 0.2s',
          border: '1px solid rgba(255,255,255,0.05)',
          '&:hover': {
            bgcolor: 'rgba(255,255,255,0.07)',
            transform: 'scale(1.01)',
          }
        }}
      >
        {/* Nome da Música */}
        <Box sx={{ flex: 1, mb: { xs: 2, md: 0 }, width: '100%' }}>
          <Typography 
            variant="subtitle1" 
            sx={{ 
              color: '#fff', 
              fontWeight: 600,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
          >
            { trackName }
          </Typography>
        </Box>

        {/* Player e Favorito */}
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 2,
            width: { xs: '100%', md: 'auto' },
            justifyContent: 'space-between'
          }}
        >
          <audio 
            data-testid="audio-component" 
            src={ previewUrl } 
            controls
            style={{ 
              height: '32px', 
              filter: 'invert(100%) hue-rotate(180deg) brightness(1.5)',
              opacity: 0.8
            }}
          >
            <track kind="captions" />
            Seu navegador não suporta o elemento <code>audio</code>.
          </audio>

          <Checkbox
            id={ String(trackId) }
            data-testid={ `checkbox-music-${trackId}` }
            icon={<FavoriteBorder sx={{ color: '#666' }} />}
            checkedIcon={<Favorite sx={{ color: mainGreen }} />}
            checked={ isFavorite }
            onChange={ onFavoriteChange }
            name={ trackName }
            sx={{
              padding: 1,
              '&:hover': { bgcolor: 'rgba(29, 185, 84, 0.1)' },
            }}
          />
        </Box>
      </Paper>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onFavoriteChange: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool.isRequired,
};

export default MusicCard;