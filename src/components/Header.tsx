import { Container, Dropdown, Nav, Navbar, NavItem, NavLink } from "react-bootstrap";
import { Link, LinkProps } from "react-router-dom";
import { ReactComponent as GithubIcon } from "bootstrap-icons/icons/github.svg";

interface Props {
  onClick: () => void;
}

const Header = ({ onClick }: Props) => {
  const linkTag = (props: LinkProps) => {
    // if we don't propagate the original onClick handler, the dropdown menu doesn't close
    let actualOnClick;
    if (props?.onClick) {
      // we do this to capture the actual function instead of just the props object (which could be mutable)
      const capturedOnClick = props.onClick;
      // @ts-ignore TS just keeps complaining about the mouse event types. Whatever, it'll be fine
      actualOnClick = (e) => {
        capturedOnClick(e);
        onClick();
      };
    } else {
      actualOnClick = onClick;
    }

    return <Link {...props} onClick={actualOnClick} />;
  };

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
              <Dropdown as={NavItem} className="bg-dark">
                <Dropdown.Toggle as={NavLink} active={false}>
                  Diffs
                </Dropdown.Toggle>
                <Dropdown.Menu className="bg-dark">
                  <Dropdown.Item as={linkTag} to="/diff/cr">
                    CR
                  </Dropdown.Item>
                  <Dropdown.Item as={linkTag} to="/diff/mtr">
                    MTR
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Nav.Link as={linkTag} to="/archives">
                Archives
              </Nav.Link>
              <Nav.Link href={`${process.env.REACT_APP_API_URL}/docs`} target="_blank">
                API
              </Nav.Link>
              <Nav.Link as={linkTag} to="/about">
                About
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="https://ko-fi.com/vaasa" target="_blank">
                Donate
              </Nav.Link>
              <Nav.Link href="https://github.com/lunakv/academyruins/" target="_blank">
                <GithubIcon />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
