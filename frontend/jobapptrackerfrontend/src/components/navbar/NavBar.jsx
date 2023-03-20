import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useState } from 'react';

/*
NavBar

props:
onSearchButtonPressed(searchTerm: string) -> Void
*/
export const NavBar = (props) => {
    return (
        <div>
          <Navbar bg="light" expand="lg" data-testid="navbar">
            <Container>
              <Navbar.Brand href="#home" data-testid="navbarbrand">
                Job Application Tracker</Navbar.Brand>
            </Container>
          </Navbar>
        </div>
    );    
}