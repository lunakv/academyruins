import "../Support.css";
import "./LandingPage.css";
import { Container } from "react-bootstrap";

const LandingPage = () => (
  <Container fluid="lg">
    <div id="landing-content" className="offset text-center">
      <p className="cursive text-center">
        <span id="first-line">Its secrets once wrought the greatest artifice ever known. </span>
        <span id="second-line">Now crabs loot the rubble to decorate their shells.</span>
      </p>
      <hr />
      <div id="welcome-text">
        <p>
          Academy Ruins is a Magic: the Gathering knowledge portal. Its primary purpose is hosting diffs of the various
          Magic rules documents, specifically the Comprehensive Rules, the Magic Tournament Rules, and the Infraction
          Procedure Guide. It also houses an API allowing programmatic access to those documents, as well as an archive
          containing many of their old versions.
        </p>
      </div>
    </div>
  </Container>
);

export default LandingPage;
