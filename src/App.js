import logo from './logo.png';
import './App.css';
import { Navbar, Container, Form, FormControl, Button } from 'react-bootstrap';
import MovieList from './components/MovieList';

function App() {
  return (
    <div className="App">
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">
            <img
              src={logo}
              height="40" // Anda bisa sesuaikan ukurannya
              className="d-inline-block align-top"
              alt="NobarQ Logo"
            />
          </Navbar.Brand>
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
