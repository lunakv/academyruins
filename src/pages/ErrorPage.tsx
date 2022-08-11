import "../Support.css";
import { Container } from "react-bootstrap";

interface Props {
  message?: string;
}

const ErrorPage = ({ message }: Props) => {
  message ??= "An unidentified error occurred";

  return (
    <Container fluid="lg" className="mt-5 text-center">
      <h2>An Unexpected Error Occurred</h2>
      <hr />
      <p>
        <b>{message}</b>
      </p>
      <p className="mt-3">
        Try refreshing the page. If the issue persists, please file a report on{" "}
        <a href="https://github.com/lunakv/academyruins/issues">GitHub</a>.
      </p>
    </Container>
  );
};

export default ErrorPage;
