import "../Support.css";
import "./LandingPage.css";
import { Accordion, Col, Dropdown, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ReactComponent as DiffIcon } from "bootstrap-icons/icons/file-earmark-diff.svg";
import { ReactComponent as ArchiveIcon } from "bootstrap-icons/icons/archive.svg";
import { ReactComponent as GearIcon } from "bootstrap-icons/icons/gear.svg";
import { ReactComponent as QuestionIcon } from "bootstrap-icons/icons/question-circle.svg";
import { PropsWithChildren } from "react";

interface IconProps {
  icon: JSX.Element;
  description: string;
  children?: JSX.Element[];
}

const LandingPageIcon = ({ icon, description }: IconProps) => (
  <Row className="ms-2 ms-md-0 align-items-center">
    <Col xs={3} md={12}>
      {icon}
    </Col>
    <Col xs={9} md={12} className="mt-md-4 icon-desc">
      {description}
    </Col>
  </Row>
);

const LandingPageAccordion = ({ icon, description, children }: PropsWithChildren<IconProps>) => (
  <Row className="ms-2 ms-md-0 align-items-center">
    <Accordion flush>
      <Accordion.Header>
        <Col xs={3}>{icon}</Col>
        <Col xs={9} className="icon-desc">
          {description}
        </Col>
      </Accordion.Header>
      <Accordion.Body>
        {children?.map((child) => (
          <Col className="accordion-link text-cream pt-3" xs={12}>
            {child}
          </Col>
        ))}
      </Accordion.Body>
    </Accordion>
  </Row>
);

const LandingPageDropdown = ({ icon, description, children }: IconProps) => (
  <Dropdown drop="end">
    {/* @ts-ignore */}
    <Dropdown.Toggle>
      <LandingPageIcon icon={icon} description={description} />
    </Dropdown.Toggle>
    <Dropdown.Menu>
      {children?.map((child, i) => (
        <Dropdown.Item eventKey={i}>{child}</Dropdown.Item>
      ))}
    </Dropdown.Menu>
  </Dropdown>
);

const DynamicLandingPageMultiItemButton = ({ icon, description, children }: IconProps) => (
  <>
    <div className="d-none d-md-block">
      <LandingPageDropdown icon={icon} description={description}>
        {children}
      </LandingPageDropdown>
    </div>
    <div className="d-md-none">
      <LandingPageAccordion icon={icon} description={description}>
        {children}
      </LandingPageAccordion>
    </div>
  </>
);

const LandingPage = () => (
  <div id="landing-wrapper" className="bg-dark">
    <Row id="landing-content" className="bg-dark text-cream text-md-center">
      <Col xs={12} className="text-center">
        <p id="landing-title">Academy Ruins</p>
        <p id="landing-subtitle">Magic: The Gathering Rules Library</p>
      </Col>
      <Col xs={12}>
        <hr className="w-75 mx-auto" />
      </Col>
      <Col md={3} className="landing-link">
        <DynamicLandingPageMultiItemButton icon={<DiffIcon />} description="Diffs">
          <Link to="/diff/cr">CR</Link>
          <Link to="/diff/mtr">MTR</Link>
        </DynamicLandingPageMultiItemButton>
      </Col>
      <Col md={3} className="landing-link">
        <Link to="/archives">
          <LandingPageIcon icon={<ArchiveIcon />} description="Archives" />
        </Link>
      </Col>
      <Col md={3} className="landing-link">
        <a href={process.env.REACT_APP_API_URL + "/docs"}>
          <LandingPageIcon icon={<GearIcon />} description="API" />
        </a>
      </Col>
      <Col md={3} className="landing-link">
        <Link to="/about">
          <LandingPageIcon icon={<QuestionIcon />} description="About" />
        </Link>
      </Col>
    </Row>
  </div>
);

export default LandingPage;
