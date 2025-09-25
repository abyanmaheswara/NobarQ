import './App.css';
import { Navbar, Container, Form, FormControl, Button } from 'react-bootstrap';
import MovieList from './components/MovieList';

function App() {
  return (
    <div className="App">
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Movie App</Navbar.Brand>
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Container>
      </Navbar>
      <Container className="mt-4">
        <MovieList />
      </Container>
    </div>
  );
}

export default App;
