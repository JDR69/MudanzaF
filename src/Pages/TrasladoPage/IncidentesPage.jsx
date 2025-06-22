import React, { useState, useEffect } from 'react';
import {
  Container, Box, Typography, Grid, Card, CardContent, CardHeader, CardMedia,
  Divider, Chip, TextField, InputAdornment, CircularProgress, AppBar, Toolbar,
  IconButton, Button, Avatar, useTheme, useMediaQuery, Paper
} from '@mui/material';
import {
  Search, Refresh, Warning, ArrowUpward, DirectionsCar, LocalShipping,
  Terrain, People, LocationOn, Block, CalendarMonth, Schedule, LocalGasStation
} from '@mui/icons-material';

const IncidentesPage = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [error, setError] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    fetchNews();

    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Intentar primero con GNews API
      const apiKey = 'abbf1e26334f76af06495c1ace4690d5';
      const searchQuery = 'Bolivia (bloqueo OR diesel OR combustible OR carretera OR protesta)';
      const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(searchQuery)}&lang=es&country=bo&max=20&apikey=${apiKey}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.articles && data.articles.length > 0) {
        console.log(`Noticias encontradas: ${data.articles.length}`);
        
        const processedArticles = data.articles.map(article => ({
          title: article.title || 'Sin título',
          description: article.description || 'Sin descripción disponible',
          urlToImage: article.image,
          publishedAt: article.publishedAt,
          source: { name: article.source?.name || 'Fuente desconocida' },
          category: categorizeArticle(article.title || '', article.description || ''),
          url: article.url || '#',
          location: extractLocation(article.title || '', article.description || '')
        }));
        
        setNews(processedArticles);
      } else {
        // Intentar con NewsAPI como alternativa
        try {
          const newsApiKey = '9f73a9258df246479e8413094231391b';
          const newsUrl = `https://newsapi.org/v2/everything?q=${encodeURIComponent('Bolivia bloqueo diesel carretera')}&language=es&sortBy=publishedAt&apiKey=${newsApiKey}`;
          
          const newsResponse = await fetch(newsUrl);
          if (!newsResponse.ok) {
            throw new Error('Error con la API alternativa');
          }
          
          const newsData = await newsResponse.json();
          
          if (newsData.articles && newsData.articles.length > 0) {
            const processedNewsArticles = newsData.articles.map(article => ({
              title: article.title || 'Sin título',
              description: article.description || 'Sin descripción disponible',
              urlToImage: article.urlToImage,
              publishedAt: article.publishedAt,
              source: { name: article.source?.name || 'Fuente desconocida' },
              category: categorizeArticle(article.title || '', article.description || ''),
              url: article.url || '#',
              location: extractLocation(article.title || '', article.description || '')
            }));
            
            setNews(processedNewsArticles);
          } else {
            throw new Error('No se encontraron noticias con ambas APIs');
          }
        } catch (newsApiError) {
          console.error('Error con la API alternativa:', newsApiError);
          throw newsApiError;
        }
      }
    } catch (error) {
      console.error('Error al obtener noticias:', error);
      
      if (error.message && error.message.includes('429')) {
        setError('Límite de solicitudes API excedido. Intente más tarde.');
      } else if (error.message && error.message.includes('401')) {
        setError('Error de autenticación con la API de noticias.');
      } else {
        setError('No se pudieron cargar las noticias actualizadas.');
      }
      
      setNews([]);
    } finally {
      setLoading(false);
    }
  };

  const extractLocation = (title, description) => {
    const text = `${title} ${description}`.toLowerCase();
    const bolivianCities = [
      'la paz', 'cochabamba', 'santa cruz', 'oruro', 'potosí', 
      'sucre', 'tarija', 'beni', 'pando', 'el alto', 'sacaba',
      'quillacollo', 'montero', 'trinidad', 'yacuiba', 'riberalta',
      'warnes', 'villazón', 'yungas', 'chapare'
    ];
    
    for (const city of bolivianCities) {
      if (text.includes(city)) {
        return city.charAt(0).toUpperCase() + city.slice(1);
      }
    }
    
    // Keywords for roads and routes
    const roadKeywords = ['carretera', 'ruta', 'tramo', 'vía'];
    for (const keyword of roadKeywords) {
      const index = text.indexOf(keyword);
      if (index !== -1) {
        const segment = text.substring(index, index + 40);
        const match = segment.match(/carretera\s+([A-Za-z\s-]+)/) || 
                     segment.match(/ruta\s+([A-Za-z0-9\s-]+)/) ||
                     segment.match(/tramo\s+([A-Za-z\s-]+)/) ||
                     segment.match(/vía\s+([A-Za-z\s-]+)/);
        if (match && match[1]) {
          return `${match[0].charAt(0).toUpperCase() + match[0].slice(1)}`;
        }
      }
    }
    
    return 'Bolivia';
  };

  const categorizeArticle = (title, description) => {
    const text = `${title} ${description}`.toLowerCase();
    if (text.includes('diesel') || text.includes('diésel') || text.includes('combustible') || text.includes('gasoil') || text.includes('gasolina')) 
      return 'combustible';
    if (text.includes('bloqueo') || text.includes('bloqueada') || text.includes('corte') || text.includes('cierre') || text.includes('interrupción')) 
      return 'bloqueo';
    if (text.includes('accidente') || text.includes('colisión') || text.includes('choque') || text.includes('volcamiento')) 
      return 'accidente';
    if (text.includes('derrumbe') || text.includes('deslizamiento') || text.includes('deslave') || text.includes('inundación')) 
      return 'derrumbe';
    if (text.includes('manifestación') || text.includes('protesta') || text.includes('marcha') || text.includes('movilización')) 
      return 'manifestacion';
    return 'otros';
  };

  // Filter news based on search term and selected category
  const filteredNews = news.filter(item => {
    const matchesSearch = 
      (item.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.location && item.location.toLowerCase().includes(searchTerm.toLowerCase())));
    const matchesFilter = filter === 'all' || item.category === filter;
    return matchesSearch && matchesFilter;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredNews.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);

  // Format date to a more readable format
  const formatDate = (dateString) => {
    try {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('es-ES', options);
    } catch (e) {
      return 'Fecha no disponible';
    }
  };

  // Format time
  const formatTime = (dateString) => {
    try {
      const options = { hour: '2-digit', minute: '2-digit' };
      return new Date(dateString).toLocaleTimeString('es-ES', options);
    } catch (e) {
      return '';
    }
  };

  // Get category icon based on category name
  const getCategoryIcon = (category) => {
    switch(category) {
      case 'bloqueo':
        return <Block />;
      case 'combustible':
        return <LocalGasStation />; // Usando LocalGasStation en lugar de FuelPump
      case 'accidente':
        return <DirectionsCar />;
      case 'derrumbe':
        return <Terrain />;
      case 'manifestacion':
        return <People />;
      default:
        return <LocalShipping />;
    }
  };

  // Get category color based on category name
  const getCategoryColor = (category) => {
    switch(category) {
      case 'bloqueo':
        return 'error';
      case 'combustible':
        return 'warning';
      case 'accidente':
        return 'secondary';
      case 'derrumbe':
        return 'info';
      case 'manifestacion':
        return 'primary';
      default:
        return 'default';
    }
  };

  // Get category label
  const getCategoryLabel = (category) => {
    switch(category) {
      case 'bloqueo':
        return 'Bloqueo';
      case 'combustible':
        return 'Diesel/Combustible';
      case 'accidente':
        return 'Accidente';
      case 'derrumbe':
        return 'Derrumbe';
      case 'manifestacion':
        return 'Manifestación';
      default:
        return 'Otro';
    }
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 8 }}>
      {/* Hero Section with Background */}
      <Box sx={{ 
        position: 'relative', 
        height: '300px', 
        borderRadius: 4, 
        overflow: 'hidden', 
        mb: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(https://www.la-razon.com/wp-content/uploads/2023/06/28/WhatsApp-Image-2023-06-28-at-16.18.05.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <Box sx={{ textAlign: 'center', color: 'white', p: 3, maxWidth: '800px' }}>
          <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
            Crisis de Combustible y Bloqueos
          </Typography>
          <Typography variant="h6" sx={{ mb: 3 }}>
            La información más actualizada sobre la situación del diesel y los bloqueos de carreteras en Bolivia
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            size="large"
            onClick={fetchNews}
            startIcon={<Refresh />}
            sx={{ 
              borderRadius: 2,
              px: 4,
              py: 1.5,
              fontWeight: 'bold',
              backgroundColor: '#ff9800',
              '&:hover': { backgroundColor: '#f57c00' }
            }}
          >
            Actualizar Noticias
          </Button>
        </Box>
      </Box>

      {/* Search and Filter Bar */}
      <Paper elevation={3} sx={{ mb: 4, borderRadius: 3, overflow: 'hidden' }}>
        <AppBar position="static" color="default" elevation={0}>
          <Toolbar sx={{ py: 1 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={5}>
                <TextField
                  fullWidth
                  placeholder="Buscar noticias por ciudad, ruta o tema..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  variant="outlined"
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                    sx: { borderRadius: 2 }
                  }}
                />
              </Grid>
              <Grid item xs={12} md={7}>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Chip 
                    label="Todos" 
                    clickable
                    color={filter === 'all' ? 'primary' : 'default'} 
                    onClick={() => setFilter('all')}
                    sx={{ fontWeight: filter === 'all' ? 'bold' : 'normal' }}
                  />
                  <Chip 
                    icon={<LocalGasStation />}
                    label="Diesel/Combustible" 
                    clickable
                    color={filter === 'combustible' ? 'warning' : 'default'} 
                    onClick={() => setFilter('combustible')}
                    sx={{ fontWeight: filter === 'combustible' ? 'bold' : 'normal' }}
                  />
                  <Chip 
                    icon={<Block />}
                    label="Bloqueos" 
                    clickable
                    color={filter === 'bloqueo' ? 'error' : 'default'} 
                    onClick={() => setFilter('bloqueo')}
                    sx={{ fontWeight: filter === 'bloqueo' ? 'bold' : 'normal' }}
                  />
                  <Chip 
                    icon={<DirectionsCar />}
                    label="Accidentes" 
                    clickable
                    color={filter === 'accidente' ? 'secondary' : 'default'} 
                    onClick={() => setFilter('accidente')}
                    sx={{ fontWeight: filter === 'accidente' ? 'bold' : 'normal' }}
                  />
                  <Chip 
                    icon={<Terrain />}
                    label="Derrumbes" 
                    clickable
                    color={filter === 'derrumbe' ? 'info' : 'default'} 
                    onClick={() => setFilter('derrumbe')}
                    sx={{ fontWeight: filter === 'derrumbe' ? 'bold' : 'normal' }}
                  />
                  <Chip 
                    icon={<People />}
                    label="Manifestaciones" 
                    clickable
                    color={filter === 'manifestacion' ? 'primary' : 'default'} 
                    onClick={() => setFilter('manifestacion')}
                    sx={{ fontWeight: filter === 'manifestacion' ? 'bold' : 'normal' }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </Paper>

      {/* Error message if needed */}
      {error && (
        <Box sx={{ mb: 3, p: 3, bgcolor: 'warning.light', borderRadius: 3 }}>
          <Typography color="warning.dark">{error}</Typography>
        </Box>
      )}

      {/* Stats Section */}
      {news.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <Grid container spacing={2}>
            <Grid item xs={6} sm={4} md={2.4}>
              <Paper 
                elevation={2} 
                sx={{ 
                  p: 2, 
                  borderRadius: 3, 
                  textAlign: 'center',
                  bgcolor: 'warning.light',
                  border: '1px solid',
                  borderColor: 'warning.main'
                }}
              >
                <LocalGasStation fontSize="large" color="warning" />
                <Typography variant="h6" fontWeight="bold" color="warning.dark">
                  {news.filter(item => item.category === 'combustible').length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Crisis de Combustible
                </Typography>
              </Paper>
            </Grid>
            
            <Grid item xs={6} sm={4} md={2.4}>
              <Paper 
                elevation={2} 
                sx={{ 
                  p: 2, 
                  borderRadius: 3, 
                  textAlign: 'center',
                  bgcolor: 'error.light',
                  border: '1px solid',
                  borderColor: 'error.main'
                }}
              >
                <Block fontSize="large" color="error" />
                <Typography variant="h6" fontWeight="bold" color="error.dark">
                  {news.filter(item => item.category === 'bloqueo').length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Bloqueos Activos
                </Typography>
              </Paper>
            </Grid>
            
            <Grid item xs={6} sm={4} md={2.4}>
              <Paper 
                elevation={2} 
                sx={{ 
                  p: 2, 
                  borderRadius: 3, 
                  textAlign: 'center',
                  bgcolor: 'secondary.light',
                  border: '1px solid',
                  borderColor: 'secondary.main'
                }}
              >
                <DirectionsCar fontSize="large" color="secondary" />
                <Typography variant="h6" fontWeight="bold" color="secondary.dark">
                  {news.filter(item => item.category === 'accidente').length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Accidentes
                </Typography>
              </Paper>
            </Grid>
            
            <Grid item xs={6} sm={4} md={2.4}>
              <Paper 
                elevation={2} 
                sx={{ 
                  p: 2, 
                  borderRadius: 3, 
                  textAlign: 'center',
                  bgcolor: 'info.light',
                  border: '1px solid',
                  borderColor: 'info.main'
                }}
              >
                <Terrain fontSize="large" color="info" />
                <Typography variant="h6" fontWeight="bold" color="info.dark">
                  {news.filter(item => item.category === 'derrumbe').length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Derrumbes
                </Typography>
              </Paper>
            </Grid>
            
            <Grid item xs={6} sm={4} md={2.4}>
              <Paper 
                elevation={2} 
                sx={{ 
                  p: 2, 
                  borderRadius: 3, 
                  textAlign: 'center',
                  bgcolor: 'primary.light',
                  border: '1px solid',
                  borderColor: 'primary.main'
                }}
              >
                <People fontSize="large" color="primary" />
                <Typography variant="h6" fontWeight="bold" color="primary.dark">
                  {news.filter(item => item.category === 'manifestacion').length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Manifestaciones
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      )}

      {/* News Content */}
      {loading ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', my: 8 }}>
          <CircularProgress size={60} />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Cargando noticias...
          </Typography>
        </Box>
      ) : filteredNews.length === 0 ? (
        <Box sx={{ textAlign: 'center', my: 8, p: 4, bgcolor: 'background.paper', borderRadius: 3, border: '1px dashed', borderColor: 'divider' }}>
          <Warning fontSize="large" color="warning" sx={{ fontSize: 60, mb: 2 }} />
          <Typography variant="h5" color="text.secondary" gutterBottom>
            No se encontraron noticias
          </Typography>
          <Typography variant="body1" color="text.secondary">
            No hay noticias que coincidan con tu búsqueda. Intenta con otros términos o cambia los filtros aplicados.
          </Typography>
          <Button 
            variant="outlined" 
            startIcon={<Refresh />} 
            onClick={() => {
              setSearchTerm('');
              setFilter('all');
              fetchNews();
            }}
            sx={{ mt: 3 }}
          >
            Actualizar noticias
          </Button>
        </Box>
      ) : (
        <>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
            Mostrando {filteredNews.length} noticias {filter !== 'all' ? `sobre ${getCategoryLabel(filter).toLowerCase()}` : ''}
            {searchTerm ? ` relacionadas con "${searchTerm}"` : ''}
          </Typography>
          
          <Grid container spacing={3}>
            {currentItems.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card 
                  elevation={3} 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: 8
                    },
                    borderRadius: 3,
                    overflow: 'hidden',
                    border: '1px solid',
                    borderColor: `${getCategoryColor(item.category)}.main`
                  }}
                  component="a"
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  {/* Card Header with Category and Location */}
                  <CardHeader
                    avatar={
                      <Avatar sx={{ bgcolor: theme.palette[getCategoryColor(item.category)].main }}>
                        {getCategoryIcon(item.category)}
                      </Avatar>
                    }
                    title={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="subtitle2" color={getCategoryColor(item.category) + ".main"} fontWeight="bold">
                          {getCategoryLabel(item.category)}
                        </Typography>
                        
                        {item.location && (
                          <Chip
                            icon={<LocationOn fontSize="small" />}
                            label={item.location}
                            size="small"
                            color={getCategoryColor(item.category)}
                            variant="outlined"
                          />
                        )}
                      </Box>
                    }
                    sx={{ pb: 1 }}
                  />
                  
                  {/* Image section */}
                  <CardMedia
                    component="img"
                    height="160"
                    image={item.urlToImage || `https://via.placeholder.com/600x400?text=Bolivia+${getCategoryLabel(item.category)}`}
                    alt={item.title}
                    sx={{ objectFit: 'cover' }}
                  />
                  
                  <CardContent sx={{ flexGrow: 1, pt: 2 }}>
                    <Typography 
                      variant="h6" 
                      component="h2" 
                      gutterBottom
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        fontWeight: 'bold',
                        mb: 2
                      }}
                    >
                      {item.title}
                    </Typography>
                    
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        mb: 2,
                        lineHeight: 1.5
                      }}
                    >
                      {item.description}
                    </Typography>
                    
                    <Divider sx={{ my: 2 }} />
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <CalendarMonth fontSize="small" color="action" />
                        <Typography variant="caption" color="text.secondary">
                          {formatDate(item.publishedAt)}
                        </Typography>
                      </Box>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Schedule fontSize="small" color="action" />
                        <Typography variant="caption" color="text.secondary">
                          {formatTime(item.publishedAt)}
                        </Typography>
                      </Box>
                      
                      <Typography variant="caption" color="text.secondary" fontWeight="medium">
                        {item.source.name}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
              <Box sx={{ 
                display: 'flex', 
                gap: 1, 
                flexWrap: 'wrap',
                justifyContent: 'center'
              }}>
                {[...Array(totalPages)].map((_, i) => (
                  <Button
                    key={i}
                    variant={currentPage === i + 1 ? "contained" : "outlined"}
                    color="primary"
                    size="small"
                    onClick={() => handlePageChange(i + 1)}
                    sx={{ minWidth: '36px' }}
                  >
                    {i + 1}
                  </Button>
                ))}
              </Box>
            </Box>
          )}
        </>
      )}

      {/* Scroll to top button */}
      {showScrollTop && (
        <Box
          sx={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            zIndex: 1000
          }}
        >
          <IconButton
            onClick={scrollToTop}
            color="primary"
            sx={{ 
              backgroundColor: 'background.paper', 
              boxShadow: 3,
              width: 56,
              height: 56,
              '&:hover': { backgroundColor: 'primary.main', color: 'white' } 
            }}
            size="large"
          >
            <ArrowUpward />
          </IconButton>
        </Box>
      )}
    </Container>
  );
};

export default IncidentesPage;