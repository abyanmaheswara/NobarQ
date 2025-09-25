import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const API_KEY = 'b16ac56fbf458923dd1146c9ee49976b'; // Ganti dengan API key Anda
  const BASE_URL = 'https://api.themoviedb.org/3';
  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []); // Empty dependency array means this effect runs once after the initial render

  return (
    <Row xs={1} md={2} lg={4} className="g-4">
      {movies.map((movie) => (
        <Col key={movie.id}>
          <Card>
            <Card.Img variant="top" src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt={movie.title} />
            <Card.Body>
              <Card.Title>{movie.title}</Card.Title>
              <Card.Text>{movie.overview.substring(0, 100)}...</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default MovieList;
