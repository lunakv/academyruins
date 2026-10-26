import { useEffect, useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { adminFetch } from "../utils/adminApi";

interface Props {
  show: boolean;
  onHide: () => void;
  onConfirmed?: () => void;
  // effective date detected by the extractor, if any (YYYY-MM-DD)
  effectiveDate?: string | null;
}

const PolicyPreviewConfirmModal = ({ show, onHide, onConfirmed, effectiveDate }: Props) => {
  const [date, setDate] = useState(effectiveDate ?? "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => setDate(effectiveDate ?? ""), [effectiveDate]);

  const handleSubmit = async () => {
    setBusy(true);
    setError(undefined);
    try {
      await adminFetch("/admin/confirm/mtr", {
        method: "POST",
        body: JSON.stringify({ effectiveDate: date || null }),
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
        <Modal.Title>Confirm New MTR Diff</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Label>Effective Date</Form.Label>
          <Form.Control type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </Form.Group>
        {error && <Alert variant="danger">{error}</Alert>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={handleSubmit} disabled={busy || !date}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PolicyPreviewConfirmModal;
