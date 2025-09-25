import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Button } from 'react-bootstrap';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const API_KEY = 'b16ac56fbf458923dd1146c9ee49976b'; // Ganti dengan API key Anda
  const BASE_URL = 'https://api.themoviedb.org/3';
  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

  const fetchMovies = async (pageNum) => {
    try {
      const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${pageNum}`);
      const data = await response.json();
      setMovies(prevMovies => [...prevMovies, ...data.results]);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  useEffect(() => {
    fetchMovies(page);
  }, [page]);

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <>
      <Row xs={1} md={2} lg={4} className="g-4">
        {movies.map((movie) => (
          <Col key={`${movie.id}-${Math.random()}`} className="card-animation">
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
      <div className="text-center mt-4">
        <Button variant="primary" onClick={handleLoadMore}>Load More</Button>
      </div>
    </>
  );
};

export default MovieList;
