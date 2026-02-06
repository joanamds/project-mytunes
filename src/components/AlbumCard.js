import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { 
  Card, 
  CardActionArea, 
  CardContent, 
  CardMedia, 
  Typography, 
  Box 
} from '@mui/material';

class AlbumCard extends Component {
  render() {
    const { artistName, collectionId, collectionName, artworkUrl100 } = this.props;
    const mainGreen = '#1DB954';

    return (
      <Card 
        sx={{ 
          height: '100%', 
          bgcolor: 'rgba(255,255,255,0.05)', 
          borderRadius: 2,
          transition: 'all 0.3s ease',
          border: '1px solid rgba(255,255,255,0.05)',
          '&:hover': {
            bgcolor: 'rgba(255,255,255,0.1)',
            transform: 'translateY(-5px)',
            borderColor: mainGreen,
          }
        }}
      >
        <CardActionArea 
          component={ Link } 
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
          sx={{ height: '100%', p: 2 }}
        >
          {/* Capa do Álbum com upgrade de qualidade */}
          <CardMedia
            component="img"
            image={ artworkUrl100.replace('100x100bb', '300x300bb') }
            alt={ collectionName }
            sx={{ 
              borderRadius: 1, 
              aspectRatio: '1/1',
              boxShadow: '0 8px 16px rgba(0,0,0,0.4)'
            }}
          />

          <CardContent sx={{ p: 0, mt: 2 }}>
            <Typography 
              variant="body1" 
              sx={{ 
                color: '#fff', 
                fontWeight: 700, 
                lineHeight: 1.2,
                mb: 0.5,
                // Limita a 2 linhas para não quebrar o grid
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}
            >
              { collectionName }
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ color: '#aaa', fontWeight: 500 }}
            >
              { artistName }
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }
}

AlbumCard.propTypes = {
  artistName: PropTypes.string.isRequired,
  artworkUrl100: PropTypes.string.isRequired,
  collectionId: PropTypes.number.isRequired,
  collectionName: PropTypes.string.isRequired,
};

export default AlbumCard;