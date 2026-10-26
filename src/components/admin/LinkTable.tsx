import { useCallback, useEffect, useState } from "react";
import { Alert, Button, Form, Table } from "react-bootstrap";
import { adminFetch } from "../../utils/adminApi";

interface LinkItem {
  resource: string;
  link: string;
}

interface Props {
  // endpoint returning the list of links; editing PUTs to `${endpoint}/{resource}`
  endpoint: string;
  emptyMessage: string;
  // if set, a confirm button is shown for each row, POSTing to `${endpoint}/{resource}/confirm`
  confirmable?: boolean;
}

const LinkTable = ({ endpoint, emptyMessage, confirmable }: Props) => {
  const [links, setLinks] = useState<LinkItem[] | undefined>(undefined);
  const [editing, setEditing] = useState<string | undefined>(undefined);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ variant: string; text: string } | undefined>(undefined);

  const load = useCallback(async () => {
    try {
      const json = await adminFetch(endpoint);
      setLinks(json.data);
    } catch (err) {
      setMessage({ variant: "danger", text: (err as Error).message });
    }
  }, [endpoint]);

  useEffect(() => {
    load();
  }, [load]);

  const run = async (action: () => Promise<string>) => {
    setBusy(true);
    try {
      setMessage({ variant: "success", text: await action() });
      await load();
    } catch (err) {
      setMessage({ variant: "danger", text: (err as Error).message });
    } finally {
      setBusy(false);
    }
  };

  const save = (resource: string) =>
    run(async () => {
      await adminFetch(`${endpoint}/${encodeURIComponent(resource)}`, {
        method: "PUT",
        body: JSON.stringify({ link: draft }),
      });
      setEditing(undefined);
      return `Link for ${resource} updated.`;
    });

  const confirm = (item: LinkItem) => {
    if (!window.confirm(`Replace the current ${item.resource} link with ${item.link}?`)) return;
    run(async () => {
      await adminFetch(`${endpoint}/${encodeURIComponent(item.resource)}/confirm`, { method: "POST" });
      return `Link for ${item.resource} confirmed.`;
    });
  };

  const startEditing = (item: LinkItem) => {
    setEditing(item.resource);
    setDraft(item.link);
  };

  return (
    <>
      {message && (
        <Alert variant={message.variant} dismissible onClose={() => setMessage(undefined)}>
          {message.text}
        </Alert>
      )}
      {links === undefined ? (
        <p>Loading...</p>
      ) : links.length === 0 ? (
        <p className="text-secondary">{emptyMessage}</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Resource</th>
              <th>Link</th>
              <th style={{ width: "1%" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {links.map((item) => (
              <tr key={item.resource}>
                <td>{item.resource}</td>
                <td className="text-break">
                  {editing === item.resource ? (
                    <Form.Control
                      size="sm"
                      value={draft}
                      autoFocus
                      onChange={(e) => setDraft(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") save(item.resource);
                        if (e.key === "Escape") setEditing(undefined);
                      }}
                    />
                  ) : (
                    <a href={item.link} target="_blank" rel="noreferrer">
                      {item.link}
                    </a>
                  )}
                </td>
                <td className="text-nowrap">
                  {editing === item.resource ? (
                    <>
                      <Button size="sm" variant="success" disabled={busy || !draft} onClick={() => save(item.resource)}>
                        Save
                      </Button>{" "}
                      <Button size="sm" variant="secondary" disabled={busy} onClick={() => setEditing(undefined)}>
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button size="sm" variant="outline-primary" disabled={busy} onClick={() => startEditing(item)}>
                        Edit
                      </Button>
                      {confirmable && (
                        <>
                          {" "}
                          <Button size="sm" variant="success" disabled={busy} onClick={() => confirm(item)}>
                            Confirm
                          </Button>
                        </>
                      )}
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default LinkTable;
