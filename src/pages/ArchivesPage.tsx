import "../Support.css";
import { Container, Tab, Tabs } from "react-bootstrap";
import CrArchive from "../components/archives/CrArchive";
import CrDiffArchive from "../components/archives/CrDiffArchive";
import PolicyDocArchive from "../components/archives/PolicyDocArchive";
import PolicyDiffArchive from "../components/archives/PolicyDiffArchive";

const ArchivesPage = () => (
  <Container fluid="lg" className=" my-5">
    <div className="text-center mb-4">
      <h2>Old Diffs</h2>
      <p>
        Previous diffs of the various docs. These are mostly preserved for people who are interested in tracing the
        history of the tournament docs.
      </p>
    </div>
    <Tabs defaultActiveKey="cr" variant="tabs" className="nav-justified bg-dark rounded-top">
      <Tab title="CR" eventKey="cr">
        <CrDiffArchive />
      </Tab>
      <Tab title="IPG" eventKey="ipg">
        {/* TODO IPG diff archive */}
        <i>Coming soon!</i>
      </Tab>
      <Tab title="MTR" eventKey="mtr">
        <PolicyDiffArchive />
      </Tab>
    </Tabs>

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
