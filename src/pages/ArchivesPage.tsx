import "../Support.css";
import { Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import CrArchive from "../components/archives/CrArchive";
import CrDiffArchive from "../components/archives/CrDiffArchive";
// TODO keyrune css

const ArchivesPage = () => (
  <Container fluid="lg" className=" my-5">
    <div className="text-center mb-4">
      <h2>Old Diffs</h2>
      <p>
        Previous diffs of the various docs. These are mostly preserved for
        people who are interested in tracing the history of the tournament docs.
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
        <p>
          <a href="/archives/ipg_5feb21">Kaldheim</a>
        </p>
        <p>
          <a href="/archives/ipg_28sep20">Zendikar Rising</a>
        </p>
        <p>
          <a href="/archives/ipg_3jul20">Core Set 2021</a>
        </p>
        <p>
          <a href="/archives/ipg_17apr20">Ikoria</a>
        </p>
        <p>
          <a href="/archives/ipg_24jan20">Theros Beyond Death</a>
        </p>
        <p>
          <a href="/archives/ipg_4oct19">Throne of Eldraine</a>
        </p>
        <p>
          <a href="/archives/ipg_12jul19">Core Set 2020</a>
        </p>
        <p>
          <a href="/archives/ipg_3may19">War of the Spark</a>
        </p>
        <p>
          <a href="/archives/ipg_21jan19">Ravnica Allegiance</a>
        </p>
        <p>
          <a href="/archives/ipg_5oct18">Guilds of Ravnica</a>
        </p>
      </Col>

      <Col md={4}>
        <h3>MTR</h3>
        <p>
          <a href="/archives/mtr_23jul21">Adventures in the Forgotten Realms</a>
        </p>
        <p>
          <a href="/archives/mtr_23apr21">Strixhaven</a>
        </p>
        <p>
          <a href="/archives/mtr_5feb21">Kaldheim</a>
        </p>
        <p>
          <a href="/archives/mtr_28sep20">Zendikar Rising</a>
        </p>
        <p>
          <a href="/archives/mtr_3jul20">Core Set 2021</a>
        </p>
        <p>
          <a href="/archives/mtr_17apr20">Ikoria</a>
        </p>
        <p>
          <a href="/archives/mtr_24jan20">Theros Beyond Death</a>
        </p>
        <p>
          <a href="/archives/mtr_4oct19">Throne of Eldraine</a>
        </p>
        <p>
          <a href="/archives/mtr_12jul19">Core Set 2020</a>
        </p>
        <p>
          <a href="/archives/mtr_3may19">War of the Spark</a>
        </p>
        <p>
          <a href="/archives/mtr_21jan19">Ravnica Allegiance</a>
        </p>
        <p>
          <a href="/archives/mtr_5oct18">Guilds of Ravnica</a>
        </p>
      </Col>
    </Row>

    <hr />

    <div className="text-center">
      <h2>Raw Documents</h2>
      <p>
        Not interested in the changes and just want the docs in their pure,
        unadulterated forms? Look no further.
      </p>
    </div>

    <Tabs
      defaultActiveKey="cr"
      variant="tabs"
      className="nav-justified bg-dark"
    >
      <Tab eventKey="cr" title="CR">
        <CrArchive />
      </Tab>
      <Tab eventKey="mtr" title="MTR">
        {/* TODO MTR archive */}
      </Tab>
      <Tab eventKey="ipg" title="IPG">
        {/* TODO IPG archive */}
      </Tab>
    </Tabs>
  </Container>
);

export default ArchivesPage;
