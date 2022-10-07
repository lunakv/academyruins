import "../Support.css";
import "./LandingPage.css";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ReactComponent as DiffIcon } from "bootstrap-icons/icons/file-earmark-diff.svg";
import { ReactComponent as ArchiveIcon } from "bootstrap-icons/icons/archive.svg";
import { ReactComponent as GearIcon } from "bootstrap-icons/icons/gear.svg";
import { ReactComponent as QuestionIcon } from "bootstrap-icons/icons/question-circle.svg";

interface IconProps {
  icon: JSX.Element;
  description: string;
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
        <Link to="/diff/cr">
          <LandingPageIcon icon={<DiffIcon />} description="Diffs" />
        </Link>
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
