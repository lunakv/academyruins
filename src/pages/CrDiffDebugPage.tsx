import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import ColumnDiff from "../components/ColumnDiff";
import loadFile from "../utils/loadFile";

const CrDiffDebugPage = () => {
  const [diff, setDiff] = useState([]);

  return (
    <Row>
      <Col xs={12}>
        <input type="file" onChange={loadFile(setDiff)} />
      </Col>
      <Col xs={12}>
        <ColumnDiff oldName="Old" newName="New" changes={diff} />
      </Col>
    </Row>
  );
};

export default CrDiffDebugPage;
