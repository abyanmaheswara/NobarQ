import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const MovieList = ({ movies }) => {
  return (
    <Row xs={1} md={2} lg={4} className="g-4">
      {movies.map((movie) => (
        <Col key={movie.id} className="card-animation">
          <Card>
            <Card.Img 
              variant="top" 
              src={movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : 'https://placehold.co/500x750?text=No+Image'} 
              alt={movie.title} 
            />
            <Card.Body>
              <Card.Title>{movie.title}</Card.Title>
              <Card.Text>{movie.overview ? `${movie.overview.substring(0, 100)}...` : 'No overview available.'}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default MovieList;
