import React, { useEffect, useState } from 'react';
import './App.css';
import { Navbar, Container, Form, FormControl, Button, Modal } from 'react-bootstrap';
import MovieList from './components/MovieList';

const API_KEY = 'b16ac56fbf458923dd1146c9ee49976b';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [noResults, setNoResults] = useState(false);
  const [page, setPage] = useState(1);
  const [currentView, setCurrentView] = useState('popular'); // 'popular' or 'search'
  const [showModal, setShowModal] = useState(false);
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(false); // Added to trigger new deployment

  useEffect(() => {
    if (currentView === 'popular') {
      setMovies([]);
      const fetchInitialMovies = async () => {
        setLoading(true);
        for (let i = 1; i <= 3; i++) {
          await getPopularMovies(i);
        }
        setPage(3);
        setLoading(false);
      };
      fetchInitialMovies();
    }
  }, [currentView]);

  const getPopularMovies = async (pageNum) => {
    setNoResults(false);
    try {
      const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${pageNum}`);
      const data = await response.json();
      setMovies(prevMovies => [...prevMovies, ...data.results]);
    } catch (error) {
      console.error('Error fetching popular movies:', error);
    }
  };

  const fetchMovieDetails = async (movieId) => {
    try {
      const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`);
      const data = await response.json();
      setMovieDetails(data);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };

  const handleMovieClick = (movieId) => {
    fetchMovieDetails(movieId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setMovieDetails(null);
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    getPopularMovies(nextPage);
    setPage(nextPage);
  };

  const searchMovies = async (e) => {
    e.preventDefault();
    setCurrentView('search');
    if (query.trim() === '') {
      handleLogoClick();
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
      const data = await response.json();
      if (data.results.length === 0) {
        setNoResults(true);
        setMovies([]);
      } else {
        setNoResults(false);
        setMovies(data.results);
      }
    } catch (error) {
      console.error('Error searching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogoClick = () => {
    setMovies([]);
    setQuery('');
    setPage(1);
    setCurrentView('popular');
  };


  return (
    <div className="App">
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
            <i className="fas fa-film" style={{ marginRight: '10px' }}></i>
            NobarQ
          </Navbar.Brand>
          <Form className="d-flex" onSubmit={searchMovies}>
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button variant="outline-success" type="submit">Search</Button>
          </Form>
        </Container>
      </Navbar>
      <Container className="mt-4">
        {loading ? (
          <div className="text-center"><h2>Loading...</h2></div>
        ) : noResults ? (
          <div className="text-center"><h2>Film tidak ada</h2></div>
        ) : (
          <MovieList movies={movies} onMovieClick={handleMovieClick} />
        )}
        {currentView === 'popular' && !noResults && movies.length > 0 && !loading && (
          <div className="text-center mt-4">
            <Button variant="primary" onClick={handleLoadMore}>Load More</Button>
          </div>
        )}
      </Container>

      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{movieDetails ? movieDetails.title : ''}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {movieDetails ? (
            <div className="d-flex">
              <img
                src={movieDetails.poster_path ? `${IMAGE_BASE_URL}${movieDetails.poster_path}` : 'https://placehold.co/500x750?text=No+Image'}
                alt={movieDetails.title}
                style={{ width: '200px', marginRight: '20px' }}
              />
              <div>
                <h5>Overview</h5>
                <p>{movieDetails.overview}</p>
                <p><strong>Release Date:</strong> {movieDetails.release_date}</p>
                <p><strong>Rating:</strong> {movieDetails.vote_average} / 10</p>
                <p><strong>Genres:</strong> {movieDetails.genres.map(genre => genre.name).join(', ')}</p>
              </div>
            </div>
          ) : (
            <p>Loading movie details...</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;
