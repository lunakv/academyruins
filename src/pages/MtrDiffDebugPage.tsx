import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import ColumnDiff from "../components/ColumnDiff";
import loadFile from "../utils/loadFile";
import InlineDiff from "../components/InlineDiff";
import { formatDate } from "../utils/dateFormatter";
import { MtrDiffItem } from "../types";

interface Diff {
  effective_date: string;
  changes: MtrDiffItem[];
}

const MtrDiffDebugPage = () => {
  const [diff, setDiff] = useState<Diff>({ changes: [], effective_date: new Date().toISOString() });

  return (
    <Row>
      <Col xs={12}>
        <input type="file" onChange={loadFile(setDiff)} />
      </Col>
      <Col xs={12}>
        <InlineDiff title={formatDate(diff.effective_date)} changes={diff.changes} />
      </Col>
    </Row>
  );
};

export default MtrDiffDebugPage;
