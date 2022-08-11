import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, LinkProps } from "react-router-dom";

interface Props {
  onClick: () => void;
}

const Header = ({ onClick }: Props) => {
  const linkTag = (props: LinkProps) => <Link {...props} onClick={onClick} />;
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="md">
        <Container fluid="lg">
          <Navbar.Brand as={linkTag} to="/">
            Academy Ruins
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="header-nav" />
          <Navbar.Collapse id="header-nav">
            <Nav className="me-auto">
              <NavDropdown title="Diffs" menuVariant="dark" className="bg-dark">
                <NavDropdown.Item as={linkTag} to="/diff/cr/latest">
                  Comprehensive Rules
                </NavDropdown.Item>
                <NavDropdown.Item as={linkTag} to="/diff/ipg">
                  Infraction Procedure Guide
                </NavDropdown.Item>
                <NavDropdown.Item as={linkTag} to="/diff/mtr">
                  Magic Tournament Rules
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link as={linkTag} to="/archives">
                Archives
              </Nav.Link>
              <Nav.Link href={`${process.env.REACT_APP_API_URL}/docs`}>API</Nav.Link>
              <Nav.Link as={linkTag} to="/about">
                About
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
