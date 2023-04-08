import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import loadFile from "../utils/loadFile";
import InlineDiff from "../components/InlineDiff";
import { formatDate } from "../utils/dateFormatter";
import { MtrDiffItem } from "../types";

interface Diff {
  effectiveDate: string;
  changes: MtrDiffItem[];
}

const MtrDiffDebugPage = () => {
  const [diff, setDiff] = useState<Diff>({ changes: [], effectiveDate: new Date().toISOString() });

  return (
    <Row>
      <Col xs={12}>
        <input type="file" onChange={loadFile(setDiff)} />
      </Col>
      <Col xs={12}>
        <InlineDiff title={formatDate(diff.effectiveDate)} changes={diff.changes} />
      </Col>
    </Row>
  );
};

export default MtrDiffDebugPage;
