import React, { useEffect, useState } from 'react';
import logo from './logo.png';
import './App.css';
import { Navbar, Container, Form, FormControl, Button } from 'react-bootstrap';
import MovieList from './components/MovieList';

const API_KEY = 'b16ac56fbf458923dd1146c9ee49976b';
const BASE_URL = 'https://api.themoviedb.org/3';

function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [noResults, setNoResults] = useState(false);
  const [page, setPage] = useState(1);
  const [currentView, setCurrentView] = useState('popular'); // 'popular' or 'search'

  useEffect(() => {
    if (currentView === 'popular') {
      setMovies([]);
      const fetchInitialMovies = async () => {
        for (let i = 1; i <= 3; i++) {
          await getPopularMovies(i);
        }
        setPage(3);
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
    }
  };

  const handleLogoClick = () => {
    setMovies([]);
    setQuery('');
    setPage(1);
    setCurrentView('popular');
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
            <img
              src={logo}
              height="40"
              className="d-inline-block align-top"
              alt="NobarQ Logo"
            />
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
        {noResults ? (
          <div className="text-center"><h2>Film tidak ada</h2></div>
        ) : (
          <MovieList movies={movies} />
        )}
        {currentView === 'popular' && !noResults && movies.length > 0 && (
          <div className="text-center mt-4">
            <Button variant="primary" onClick={handleLoadMore}>Load More</Button>
          </div>
        )}
      </Container>
    </div>
  );
}

export default App;
