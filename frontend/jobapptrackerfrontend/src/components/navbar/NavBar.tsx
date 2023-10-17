import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { NavBarTestIds } from './testIds/NavBarTestIds';
import { NavBarProps } from './props/NavBarProps';
import { Nav, NavDropdown } from 'react-bootstrap';
import { NavSearchBarTestIds } from './testIds/NavSearchBarTestIds';
/*
NavBar

props:
onSearchButtonPressed(searchTerm: string) -> Void
*/


export const NavBar = (props: NavBarProps) => {
  const renderDropDownNavBar = (): JSX.Element => {
      return (
        <div>
          <Navbar bg="light" expand="lg" data-testid={NavSearchBarTestIds.navSearchBarId}>
          <Container>
            <Navbar.Brand data-testid={NavSearchBarTestIds.navSearchBarBrandId}>{props.title}</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" data-testid={NavSearchBarTestIds.navSearchBarToggle}/>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <NavDropdown title="Menu" id="basic-nav-dropdown" data-testid={NavSearchBarTestIds.navSearchDropDown}>
                  <NavDropdown.Item onClick={props.logoutUser} data-testid={NavSearchBarTestIds.logoutButton}>
                    Log Out
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={props.navigateToAddJobApp} data-testid={NavSearchBarTestIds.addJobAppButton}>
                    Add Job App
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>     
        </div>
      );
  };

  const renderNavBarNoDropDown = (): JSX.Element => {
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
    )
  }

  const renderNavBar = (): JSX.Element => {
    if (props.shouldShowDropDown) {
      return renderDropDownNavBar();
    } else {
      return renderNavBarNoDropDown();
    }
  }
  
  return (
    renderNavBar()    
  );    
}