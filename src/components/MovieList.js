import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';

const MovieList = () => {
  const movies = [
    {
      title: 'Sample Movie 1',
      poster_path: 'https://placehold.co/300x450',
      overview: 'This is a short description for sample movie 1. More details will be available later.',
    },
    {
      title: 'Sample Movie 2',
      poster_path: 'https://placehold.co/300x450',
      overview: 'This is a short description for sample movie 2. More details will be available later.',
    },
    {
      title: 'Sample Movie 3',
      poster_path: 'https://placehold.co/300x450',
      overview: 'This is a short description for sample movie 3. More details will be available later.',
    },
    {
      title: 'Sample Movie 4',
      poster_path: 'https://placehold.co/300x450',
      overview: 'This is a short description for sample movie 4. More details will be available later.',
    },
  ];

  return (
    <Row xs={1} md={2} lg={4} className="g-4">
      {movies.map((movie, idx) => (
        <Col key={idx}>
          <Card>
            <Card.Img variant="top" src={movie.poster_path} />
            <Card.Body>
              <Card.Title>{movie.title}</Card.Title>
              <Card.Text>{movie.overview}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default MovieList;
