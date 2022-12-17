import { MtrDiffItem } from "../types";
import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import InlineDiff from "../components/InlineDiff";
import PolicyPreviewConfirmModal from "../components/PolicyPreviewConfirmModal";

async function fetchPreview() {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/pending/mtr`);
  const json = await res.json();
  if (!res.ok) throw new Error(json.detail);
  return json;
}

interface DiffPreview {
  changes: MtrDiffItem[];
  effective_date: string;
}

const PolicyPreviewPage = () => {
  const [data, setData] = useState<DiffPreview | undefined>(undefined);
  const [showModal, setShowModal] = useState(false);

  const [error, setError] = useState(undefined);
  if (error) throw error;

  useEffect(() => {
    fetchPreview().then(setData).catch(setError);
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <Row>
      <Col xs={12}>
        <InlineDiff title={data.effective_date} changes={data.changes} />
      </Col>
      <Col xs={12}>
        <Button onClick={() => setShowModal(true)}>Confirm</Button>
      </Col>
      <PolicyPreviewConfirmModal show={showModal} onHide={() => setShowModal(false)} />
    </Row>
  );
};

export default PolicyPreviewPage;
