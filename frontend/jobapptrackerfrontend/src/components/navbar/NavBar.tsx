import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

/*
NavBar

props:
onSearchButtonPressed(searchTerm: string) -> Void
*/


export const NavBar = () => {
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