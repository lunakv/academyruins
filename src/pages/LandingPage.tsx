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
  <Row>
    <Col xs={3} lg={12}>
      {icon}
    </Col>
    <Col xs={9} lg={12} className="mt-lg-4 icon-desc">
      {description}
    </Col>
  </Row>
);

const LandingPage = () => (
  <Row id="landing-wrapper" className="bg-dark text-cream text-lg-center">
    <Col xs={12} id="landing-title" className="cursive text-center">
      Academy Ruins
    </Col>
    <Col xs={12}>
      <hr className="w-75 mx-auto" />
    </Col>
    <Col lg={3}>
      <Link to="/diff/cr">
        <LandingPageIcon icon={<DiffIcon />} description="Diffs" />
      </Link>
    </Col>
    <Col lg={3}>
      <Link to="/archives">
        <LandingPageIcon icon={<ArchiveIcon />} description="Archives" />
      </Link>
    </Col>
    <Col lg={3}>
      <a href={process.env.REACT_APP_API_URL + "/docs"}>
        <LandingPageIcon icon={<GearIcon />} description="API" />
      </a>
    </Col>
    <Col lg={3}>
      <Link to="/about">
        <LandingPageIcon icon={<QuestionIcon />} description="About" />
      </Link>
    </Col>
  </Row>
);

export default LandingPage;
