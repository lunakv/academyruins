import { useCallback, useEffect, useState } from "react";
import { Alert, Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import CrPreviewConfirmModal from "../../components/CrPreviewConfirmModal";
import PolicyPreviewConfirmModal from "../../components/PolicyPreviewConfirmModal";
import { adminFetch } from "../../utils/adminApi";

interface PendingDiffs {
  cr: {
    creationDay: string;
    sourceSet: string;
    sourceCode: string;
    changeCount: number;
    moveCount: number;
  } | null;
  mtr: {
    creationDay: string;
    effectiveDate: string | null;
    changeCount: number;
  } | null;
}

const PendingDiffsTable = () => {
  const [diffs, setDiffs] = useState<PendingDiffs | undefined>(undefined);
  const [modal, setModal] = useState<"cr" | "mtr" | undefined>(undefined);
  const [message, setMessage] = useState<{ variant: string; text: string } | undefined>(undefined);

  const load = useCallback(async () => {
    try {
      setDiffs(await adminFetch("/admin/pending-diffs"));
    } catch (err) {
      setMessage({ variant: "danger", text: (err as Error).message });
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const onConfirmed = (doc: string) => () => {
    setMessage({ variant: "success", text: `${doc} diff confirmed.` });
    load();
  };

  if (!diffs) return message ? <Alert variant={message.variant}>{message.text}</Alert> : <p>Loading...</p>;

  return (
    <>
      {message && (
        <Alert variant={message.variant} dismissible onClose={() => setMessage(undefined)}>
          {message.text}
        </Alert>
      )}
      {!diffs.cr && !diffs.mtr ? (
        <p className="text-secondary">No diffs are pending.</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Document</th>
              <th>Created</th>
              <th>Details</th>
              <th style={{ width: "1%" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {diffs.cr && (
              <tr>
                <td>CR</td>
                <td>{diffs.cr.creationDay}</td>
                <td>
                  From {diffs.cr.sourceSet} ({diffs.cr.sourceCode}); {diffs.cr.changeCount} changes,{" "}
                  {diffs.cr.moveCount} moves
                </td>
                <td className="text-nowrap">
                  <Link className="btn btn-sm btn-outline-primary" to="/preview/cr">
                    Preview
                  </Link>{" "}
                  <Button size="sm" variant="success" onClick={() => setModal("cr")}>
                    Confirm
                  </Button>
                </td>
              </tr>
            )}
            {diffs.mtr && (
              <tr>
                <td>MTR</td>
                <td>{diffs.mtr.creationDay}</td>
                <td>
                  Effective {diffs.mtr.effectiveDate ?? <em>unknown</em>}; {diffs.mtr.changeCount} changes
                </td>
                <td className="text-nowrap">
                  <Link className="btn btn-sm btn-outline-primary" to="/preview/mtr">
                    Preview
                  </Link>{" "}
                  <Button size="sm" variant="success" onClick={() => setModal("mtr")}>
                    Confirm
                  </Button>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
      <CrPreviewConfirmModal show={modal === "cr"} onHide={() => setModal(undefined)} onConfirmed={onConfirmed("CR")} />
      <PolicyPreviewConfirmModal
        show={modal === "mtr"}
        onHide={() => setModal(undefined)}
        onConfirmed={onConfirmed("MTR")}
        effectiveDate={diffs.mtr?.effectiveDate}
      />
    </>
  );
};

const AdminPendingDiffsPage = () => (
  <AdminLayout title="Pending Diffs">
    <PendingDiffsTable />
  </AdminLayout>
);

export default AdminPendingDiffsPage;
