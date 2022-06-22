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
      <p className="cursive">None can find what hasn’t been lost.</p>
      <hr />
      <p>
        <b>{message}</b>
      </p>
    </Container>
  );
};

export default ErrorPage;
