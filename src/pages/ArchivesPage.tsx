import "../Support.css";
import { Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import CrArchive from "../components/archives/CrArchive";
import CrDiffArchive from "../components/archives/CrDiffArchive";
import PolicyDocArchive from "../components/archives/PolicyDocArchive";
// TODO keyrune css

const ArchivesPage = () => (
  <Container fluid="lg" className=" my-5">
    <div className="text-center mb-4">
      <h2>Old Diffs</h2>
      <p>
        Previous diffs of the various docs. These are mostly preserved for people who are interested in tracing the
        history of the tournament docs.
      </p>
    </div>
    <Row>
      {/* TODO load these lists from db instead of hard-coding them */}
      <Col md={4}>
        <h3>CR</h3>
        <CrDiffArchive />
      </Col>

      <Col md={4}>
        <h3>IPG</h3>
        {/* TODO IPG diff archive */}
        <i>Coming soon!</i>
      </Col>

      <Col md={4}>
        <h3>MTR</h3>
        {/* TODO MTR diff archive */}
        <i>Coming soon!</i>
      </Col>
    </Row>

    <hr />

    <div className="text-center">
      <h2>Raw Documents</h2>
      <p>Not interested in the changes and just want the docs in their pure, unadulterated forms? Look no further.</p>
    </div>

    <Tabs defaultActiveKey="cr" variant="tabs" className="nav-justified bg-dark rounded-top">
      <Tab eventKey="cr" title="CR">
        <CrArchive />
      </Tab>
      <Tab eventKey="ipg" title="IPG">
        <PolicyDocArchive kind="ipg" />
      </Tab>
      <Tab eventKey="mtr" title="MTR">
        <PolicyDocArchive kind="mtr" />
      </Tab>
    </Tabs>
  </Container>
);

export default ArchivesPage;
