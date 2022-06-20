import "../Support.css";
import { Container } from "react-bootstrap";

interface Props {
  message: string;
}

const ErrorPage = ({ message }: Props) => (
  <Container fluid className="offset text-center">
    <p className="cursive">
      Venser wondered if it could still be called a teleportation spell if the
      destination is <span className="spooky">oblivion</span>.
    </p>
    <hr className="w-100" />
    <p>{message}</p>
  </Container>
);

export default ErrorPage;
