import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

interface Props {
  show: boolean;
  onHide: () => void;
}

const PolicyPreviewConfirmModal = ({ show, onHide }: Props) => {
  const [pwd, setPwd] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async () => {
    const token = encodeURIComponent(pwd);
    const resp = await fetch(`${process.env.REACT_APP_API_URL}/admin/confirm/mtr?token=${token}`, {
      method: "POST",
    });
    setResponse(resp.status + "\n\n" + (await resp.text()));
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm New Diff</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" value={pwd} onChange={(e) => setPwd(e.target.value)} />
        </Form.Group>
        <hr />
        <textarea readOnly value={response} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={handleSubmit}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PolicyPreviewConfirmModal;
