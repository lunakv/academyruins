import "../Support.css";
import { Container } from "react-bootstrap";

const LandingPage = () => (
  <Container fluid>
    <div className="offset text-center">
      <p className="cursive">
        Its secrets once wrought the greatest artifice ever known.
        <br />
        Now crabs loot the rubble to decorate their shells.
      </p>
      <hr className="w-100" />
      <p>
        Venser's Journal is a Magic: the Gathering knowledge portal. Its primary
        purpose is hosting diffs of the various Magic tournament documents,
        specifically the Comprehensive Rules, Tournament Rules, and Infraction
        Procedure Guide.
      </p>
      <p>
        The archives also house as many old versions of the docs as I can find.
      </p>
    </div>
  </Container>
);

export default LandingPage;
