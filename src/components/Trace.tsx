import { ReactComponent as ExclamationIcon } from "bootstrap-icons/icons/exclamation-circle.svg";
import { Alert, Col, Container, Row } from "react-bootstrap";
import VerticalLine from "./VerticalLine";
import TraceSegment, { TraceItem } from "./TraceSegment";

export interface TraceModel {
  ruleNumber: string;
  items: TraceItem[];
}

interface Props {
  trace: TraceModel | null;
  ruleNumber: string;
}

const Trace = ({ trace, ruleNumber }: Props) => {
  const actualRuleNumber = trace?.ruleNumber;

  return (
    <Container fluid="lg" className="my-5">
      <Row className="justify-content-center">
        <Col xs={12} className="text-center mb-3">
          <h2>Trace of rule {actualRuleNumber}</h2>
        </Col>
        {ruleNumber !== actualRuleNumber && (
          <Col md={8}>
            <TraceRedirectionMessage requested={ruleNumber} actual={actualRuleNumber!} />
          </Col>
        )}
      </Row>

      <TraceContent trace={trace} />
    </Container>
  );
};

const TraceContent = ({ trace }: Pick<Props, "trace">) => {
  if (trace === null) {
    return (
      <div className="text-center">
        <i>Rule not found.</i>
      </div>
    );
  }
  if (trace.items.length === 0) {
    return (
      <div className="text-center">
        <i>No changes found for this rule.</i>
      </div>
    );
  }

  return (
    <>
      {trace.items.map((item, i) => (
        <>
          <Row className="justify-content-center">
            <TraceSegment item={item} />
          </Row>
          {i < trace.items.length - 1 && (
            <Row className="justify-content-center">
              <VerticalLine height="7em" />
            </Row>
          )}
        </>
      ))}
    </>
  );
};

const TraceRedirectionMessage = ({ requested, actual }: { requested: string; actual: string }) => {
  return (
    <Alert variant="warning">
      <Row>
        <Col xs="auto" className="m-auto">
          <ExclamationIcon width={20} height={20} />
        </Col>
        <Col>
          Rule {requested} contains just a keyword name. The trace was automatically redirected to rule {actual}, which
          contains its definition. <a href="?exact=true">Disable redirection.</a>
        </Col>
      </Row>
    </Alert>
  );
};

export default Trace;
