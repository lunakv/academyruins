import "../Support.css";
import "../Landing.css";
import { Container } from "react-bootstrap";

const LandingPage = () => (
  <Container fluid="lg">
    <div id="landing-content" className="offset text-center">
      <p className="cursive">
        <span id="first-line">
          Its secrets once wrought the greatest artifice ever known.{" "}
        </span>
        <span id="second-line">
          Now crabs loot the rubble to decorate their shells.
        </span>
      </p>
      <hr />
      <div id="welcome-text">
        <p>
          Venser's Journal is a Magic: the Gathering knowledge portal. Its
          primary purpose is hosting diffs of the various Magic tournament
          documents, specifically the Comprehensive Rules, Tournament Rules, and
          Infraction Procedure Guide.
        </p>
        <p>
          The archives also house as many old versions of the docs as I can
          find.
        </p>
      </div>
    </div>
  </Container>
);

export default LandingPage;
