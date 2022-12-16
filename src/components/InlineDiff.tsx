import "../Docs.css";
// TODO findNewStuff; makeItPretty
// TODO docs.js
import { Accordion, Container } from "react-bootstrap";
import { transformMtrChange } from "../utils/ruleChangeTransform";
import { MtrDiffItem } from "../types";

interface Props {
  title: string;

  changes: MtrDiffItem[];
}

function getTitle(change: MtrDiffItem): string {
  const chunk = change.old ?? change.new!;
  return chunk.title;
}

function getFullTitle(change: MtrDiffItem): string {
  const chunk = change.old ?? change.new!;
  let ret = "";
  if (chunk.section) {
    ret += chunk.section + "." + chunk.subsection + " ";
  }
  return ret + chunk.title;
}

const InlineDiffPage = ({ title, changes }: Props) => (
  <Container fluid="lg">
    <h2 className="text-center my-4">{title}</h2>
    <Accordion flush>
      {changes.map((section) => (
        <Accordion.Item eventKey={getTitle(section)}>
          <Accordion.Header>{getFullTitle(section)}</Accordion.Header>
          <Accordion.Body>{transformMtrChange(section.old?.content, section.new?.content)}</Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  </Container>
);

export default InlineDiffPage;
