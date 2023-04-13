import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { NavBarTestIds } from './testIds/NavBarTestIds';
/*
NavBar

props:
onSearchButtonPressed(searchTerm: string) -> Void
*/


export const NavBar = () => {
    return (
        <div>
          <Navbar bg="light" expand="lg" data-testid={NavBarTestIds.navBar}>
            <Container>
              <Navbar.Brand href="#home" data-testid={NavBarTestIds.navBarBrand}>
                Job Application Tracker</Navbar.Brand>
            </Container>
          </Navbar>
        </div>
    );    
}