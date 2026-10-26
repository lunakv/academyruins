import { FormEvent, ReactNode, useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { adminFetch, clearAdminCredentials, getAdminCredentials, setAdminCredentials } from "../../utils/adminApi";

interface Props {
  title: string;
  children: ReactNode;
}

const AdminLogin = ({ onLogin }: { onLogin: () => void }) => {
  const [user, setUser] = useState("admin");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | undefined>(undefined);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      // verify the credentials before storing them
      await adminFetch("/admin/links", {}, btoa(`${user}:${password}`));
      setAdminCredentials(user, password);
      onLogin();
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <Form onSubmit={handleSubmit} style={{ maxWidth: "24rem" }} className="mx-auto">
      <Form.Group className="mb-3">
        <Form.Label>Username</Form.Label>
        <Form.Control value={user} onChange={(e) => setUser(e.target.value)} autoComplete="username" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
      </Form.Group>
      {error && <Alert variant="danger">{error}</Alert>}
      <Button type="submit">Log in</Button>
    </Form>
  );
};

const AdminLayout = ({ title, children }: Props) => {
  const [loggedIn, setLoggedIn] = useState(!!getAdminCredentials());

  const logout = () => {
    clearAdminCredentials();
    setLoggedIn(false);
  };

  return (
    <Container fluid="lg" className="my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">{title}</h2>
        {loggedIn && (
          <div>
            <Link to="/admin" className="me-3">
              Admin home
            </Link>
            <Button variant="outline-secondary" size="sm" onClick={logout}>
              Log out
            </Button>
          </div>
        )}
      </div>
      {loggedIn ? children : <AdminLogin onLogin={() => setLoggedIn(true)} />}
    </Container>
  );
};

export default AdminLayout;
