import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { NavBarTestIds } from './testIds/NavBarTestIds';
import { NavBarProps } from './props/NavBarProps';
/*
NavBar

props:
onSearchButtonPressed(searchTerm: string) -> Void
*/


export const NavBar = (props: NavBarProps) => {
    return (
        <div>
          <Navbar bg="light" expand="lg" data-testid={NavBarTestIds.navBar}>
            <Container>
              <Navbar.Brand data-testid={NavBarTestIds.navBarBrand}>
                {props.title}  
              </Navbar.Brand>
            </Container>
          </Navbar>
        </div>
    );    
}