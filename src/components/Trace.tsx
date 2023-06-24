import { Col, Container, Row } from "react-bootstrap";
import VerticalLine from "./VerticalLine";
import TraceSegment, { TraceItem } from "./TraceSegment";

interface Props {
  trace: TraceItem[] | null;
  ruleNumber: string;
}

const Trace = ({ trace, ruleNumber }: Props) => {
  return (
    <Container fluid="lg" className="my-5">
      <Row>
        <Col xs={12} className="text-center mb-3">
          <h2>Trace of rule {ruleNumber}</h2>
        </Col>
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
  if (trace.length === 0) {
    return (
      <div className="text-center">
        <i>No changes found for this rule.</i>
      </div>
    );
  }

  return (
    <>
      {trace.map((item, i) => (
        <>
          <Row className="justify-content-center">
            <TraceSegment item={item} />
          </Row>
          {i < trace.length - 1 && (
            <Row className="justify-content-center">
              <VerticalLine height="7em" />
            </Row>
          )}
        </>
      ))}
    </>
  );
};

export default Trace;
