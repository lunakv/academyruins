import "../Support.css";
import { Container } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";

interface Props {
  message?: string;
}

const ErrorPage = ({ message }: Props) => {
  const [searchParams] = useSearchParams();
  message ??= searchParams.get("message") ?? "An unidentified error occurred";

  return (
    <Container fluid="lg" className="offset text-center">
      <p className="cursive">
        Venser wondered if it could still be called a teleportation spell if the
        destination is <span className="spooky">oblivion</span>.
      </p>
      <hr />
      <p>{message}</p>
    </Container>
  );
};

export default ErrorPage;
