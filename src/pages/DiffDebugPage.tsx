import { ChangeEvent, useState } from "react";
import { Col, Row } from "react-bootstrap";
import ColumnDiff from "../components/ColumnDiff";

const DiffDebugPage = () => {
  const [diff, setDiff] = useState([]);
  const fileLoader = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setDiff([]);
      return;
    }
    const file = e.target.files[0] as File;
    const reader = new FileReader();
    reader.onload = (event: ProgressEvent<FileReader>) => {
      let text = (event.target?.result ?? "[]") as string;
      const json = JSON.parse(text);
      setDiff(json);
    };
    reader.readAsText(file);
  };

  return (
    <Row>
      <Col xs={12}>
        <input type="file" onChange={fileLoader} />
      </Col>
      <Col xs={12}>
        <ColumnDiff oldName="Old" newName="New" changes={diff} />
      </Col>
    </Row>
  );
};

export default DiffDebugPage;
