// submit new diff from preview
import { Button, Form, Modal } from "react-bootstrap";
import { useState } from "react";

interface Props {
  show: boolean;
  onHide: () => void;
}

const PreviewConfirmModal = ({ show, onHide }: Props) => {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [bulletin, setBulletin] = useState("");
  const [pwd, setPwd] = useState("");
  const [response, setResponse] = useState("Not sent");

  const handleSubmit = async () => {
    const body = { name, code, bulletin };
    const token = encodeURIComponent(pwd);
    const resp = await fetch(
      `${process.env.REACT_APP_API_URL}/admin/confirm/cr?token=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    setResponse(resp.status + "\n\n" + (await resp.text()));
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm New Diff</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>Set Name</Form.Label>
          <Form.Control
            type="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Set Code</Form.Label>
          <Form.Control
            type="input"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Update Bulletin URL</Form.Label>
          <Form.Control
            type="input"
            value={bulletin}
            onChange={(e) => setBulletin(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
          />
        </Form.Group>
        <hr className="w-100" />
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

export default PreviewConfirmModal;
