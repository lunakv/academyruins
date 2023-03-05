import "../Support.css";
import { Container } from "react-bootstrap";
const NotFoundPage = () => {
  return (
    <Container fluid="lg" className="mt-5 text-center">
      <h2>This Page Does Not Exist</h2>
      <hr />
      <p>
        <i>
          Its secrets once wrought the greatest artifice ever known. Now crabs loot the rubble to decorate their shells.
        </i>
      </p>
      <p className="mt-3">
        If you believe this page should exist, please file a report on{" "}
        <a href="https://github.com/lunakv/academyruins/issues">GitHub</a>.
      </p>
    </Container>
  );
};

export default NotFoundPage;
