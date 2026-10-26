import AdminLayout from "../../components/admin/AdminLayout";
import LinkTable from "../../components/admin/LinkTable";

const AdminPendingLinksPage = () => (
  <AdminLayout title="Pending Links">
    <LinkTable endpoint="/admin/pending-links" emptyMessage="No links are pending." confirmable />
  </AdminLayout>
);

export default AdminPendingLinksPage;
