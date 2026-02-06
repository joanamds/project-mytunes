import React, { Component } from 'react';
import { Box, Container, Skeleton, Grid } from '@mui/material';

class Loading extends Component {
  render() {
    return (
      <Box sx={{ bgcolor: '#121212', minHeight: '100vh', pt: 4 }}>
        <Container maxWidth="lg">
          {/* Esqueleto da Barra de Busca ou Header */}
          <Skeleton 
            variant="rectangular" 
            height={60} 
            sx={{ bgcolor: 'rgba(255,255,255,0.05)', borderRadius: 2, mb: 4 }} 
          />

          <Grid container spacing={3}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item}>
                <Box sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.02)', borderRadius: 2 }}>
                  {/* Esqueleto da Imagem do Álbum */}
                  <Skeleton 
                    variant="rectangular" 
                    height={200} 
                    sx={{ bgcolor: 'rgba(255,255,255,0.05)', borderRadius: 2, mb: 2 }} 
                  />
                  {/* Esqueleto do Texto */}
                  <Skeleton width="80%" sx={{ bgcolor: 'rgba(255,255,255,0.05)', mb: 1 }} />
                  <Skeleton width="40%" sx={{ bgcolor: 'rgba(255,255,255,0.05)' }} />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    );
  }
}

export default Loading;
