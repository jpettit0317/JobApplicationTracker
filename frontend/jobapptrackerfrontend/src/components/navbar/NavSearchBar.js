import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { useState } from 'react';

export const NavSearchBar = (props) => {
    const [searchTerm, setSearchTerm] = useState("");

    const onSearchBoxChanged = (event) => {
        const newSearchTerm = event.target.value;
        setSearchTerm(newSearchTerm);
    }

    const onSearchButtonPressed = () => {
        props.onSearchButtonPressed(searchTerm);
    }

    return (
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="#home">Job Application Tracker</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#link">Link</Nav.Link>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Form className="d-flex">
                <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={onSearchBoxChanged}
                />
                <Button variant="outline-success" onClick={onSearchButtonPressed}>Search</Button>
            </Form>
            </Navbar.Collapse>
          </Container>
        </Navbar>
    );
}