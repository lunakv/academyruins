import "../Docs.css";
// TODO findNewStuff; makeItPretty
// TODO docs.js
import { Accordion, Container } from "react-bootstrap";

interface Props {
  title: string;
  data: any[]; // TODO give proper type
}

const InlineDiffPage = ({ title, data }: Props) => (
  <Container fluid>
    <h2 className="text-center my-4">{title}</h2>
    <Accordion flush>
      {data.map((section) => (
        <Accordion.Item eventKey={section.code}>
          <Accordion.Header>{section.title}</Accordion.Header>
          <Accordion.Body>
            {section.body /* TODO properly display section */}
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  </Container>
);

export default InlineDiffPage;
