import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";

const AdminPage = () => (
  <AdminLayout title="Admin">
    <ListGroup>
      <ListGroup.Item action as={Link} to="/admin/links">
        Current links
        <div className="text-secondary small">View and edit all active redirects.</div>
      </ListGroup.Item>
      <ListGroup.Item action as={Link} to="/admin/pending-links">
        Pending links
        <div className="text-secondary small">Edit and confirm newly detected document links.</div>
      </ListGroup.Item>
      <ListGroup.Item action as={Link} to="/admin/pending-diffs">
        Pending diffs
        <div className="text-secondary small">Review and confirm pending CR and MTR diffs.</div>
      </ListGroup.Item>
    </ListGroup>
  </AdminLayout>
);

export default AdminPage;
