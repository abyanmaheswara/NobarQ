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

  const getPopularMovies = async () => {
    setNoResults(false);
    try {
      const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error('Error fetching popular movies:', error);
    }
  };

  useEffect(() => {
    getPopularMovies();
  }, []);

  const searchMovies = async (e) => {
    e.preventDefault();
    if (query.trim() === '') {
      getPopularMovies();
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

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#" onClick={getPopularMovies} style={{ cursor: 'pointer' }}>
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
      </Container>
    </div>
  );
}

export default App;
