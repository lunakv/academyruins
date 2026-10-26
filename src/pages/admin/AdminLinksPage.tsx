import AdminLayout from "../../components/admin/AdminLayout";
import LinkTable from "../../components/admin/LinkTable";

const AdminLinksPage = () => (
  <AdminLayout title="Current Links">
    <LinkTable endpoint="/admin/links" emptyMessage="There are no links." />
  </AdminLayout>
);

export default AdminLinksPage;
