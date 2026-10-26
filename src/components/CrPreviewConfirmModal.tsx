// submit new diff from preview
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { useState } from "react";
import { adminFetch } from "../utils/adminApi";

interface Props {
  show: boolean;
  onHide: () => void;
  onConfirmed?: () => void;
}

const CrPreviewConfirmModal = ({ show, onHide, onConfirmed }: Props) => {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [bulletin, setBulletin] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const handleSubmit = async () => {
    setBusy(true);
    setError(undefined);
    try {
      await adminFetch("/admin/confirm/cr", {
        method: "POST",
        body: JSON.stringify({ name, code, bulletin }),
      });
      onConfirmed?.();
      onHide();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm New CR Diff</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Label>Set Name</Form.Label>
          <Form.Control value={name} maxLength={50} onChange={(e) => setName(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Set Code</Form.Label>
          <Form.Control value={code} maxLength={5} onChange={(e) => setCode(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Update Bulletin URL (optional)</Form.Label>
          <Form.Control type="url" value={bulletin} onChange={(e) => setBulletin(e.target.value)} />
        </Form.Group>
        {error && <Alert variant="danger">{error}</Alert>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={handleSubmit} disabled={busy || !name || !code}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CrPreviewConfirmModal;
