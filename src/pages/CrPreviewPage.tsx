import { useEffect, useState } from "react";
import { CrDiffItem } from "../types";
import ColumnDiff from "../components/ColumnDiff";
import { Button, Col, Row } from "react-bootstrap";
import CrPreviewConfirmModal from "../components/CrPreviewConfirmModal";

async function fetchPreview() {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/pending/cr`);
  const json = await res.json();
  return json.data;
}

interface DiffPreview {
  changes: CrDiffItem[];
  sourceSet: string;
  nav: {
    prev: { old: string; new: string };
  };
}

const CrPreviewPage = () => {
  const [data, setData] = useState<DiffPreview | undefined>(undefined);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchPreview().then(setData);
  }, []);

  if (!data) return <p>"Loading..."</p>;

  return (
    <Row>
      <Col xs={12}>
        <ColumnDiff oldName={data.sourceSet} newName={"???"} changes={data.changes} />
      </Col>
      <Col xs={12}>
        <Button onClick={() => setShowModal(true)}>Confirm</Button>
      </Col>
      <CrPreviewConfirmModal show={showModal} onHide={() => setShowModal(false)} />
    </Row>
  );
};

export default CrPreviewPage;
