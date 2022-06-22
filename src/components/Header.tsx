import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => (
  <header>
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid="lg">
        <Navbar.Brand as={Link} to="/">
          Academy Ruins
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="header-nav" />
        <Navbar.Collapse id="header-nav">
          <Nav className="me-auto">
            <NavDropdown title="Diffs" menuVariant="dark" className="bg-dark">
              <NavDropdown.Item as={Link} to="/diff/cr/latest">
                Comprehensive Rules
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/diff/ipg">
                Infraction Procedure Guide
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/diff/mtr">
                Magic Tournament Rules
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="/archives">
              Archives
            </Nav.Link>
            <Nav.Link href="https://api.academyruins.com/docs">API</Nav.Link>
            <Nav.Link as={Link} to="/about">
              About
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </header>
);

export default Header;
