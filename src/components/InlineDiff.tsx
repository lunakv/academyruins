// TODO findNewStuff; makeItPretty
// TODO docs.js
import { Accordion, Container } from "react-bootstrap";
import { transformMtrChange } from "../utils/ruleChangeTransform";
import { MtrDiffItem } from "../types";

interface Props {
  title: string;

  changes: MtrDiffItem[];
}
const InlineDiff = ({ title, changes }: Props) => (
  <Container fluid="lg">
    <h2 className="text-center my-4">{title}</h2>
    <Accordion flush>
      {changes.map(transformMtrChange).map(([title, content], i) => (
        <Accordion.Item eventKey={i.toString()}>
          <Accordion.Header>{title}</Accordion.Header>
          <Accordion.Body>{content}</Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  </Container>
);

export default InlineDiff;
