import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { ChangeEvent, FormEvent, useState } from "react";
import { ReactComponent as SearchIcon } from "bootstrap-icons/icons/search.svg";
import { useNavigate } from "react-router-dom";

const TraceSearchPage = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState("");

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (input) navigate(`./${input}`);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <Container fluid="lg" className="my-5 justify-content-center">
      <Col xs={12} className="text-center mb-4">
        <h2>Trace</h2>
      </Col>
      <Row className="justify-content-center mb-5">
        <Col xs={12} md={4}>
          <Form onSubmit={handleSearchSubmit}>
            <InputGroup>
              <Form.Control value={input} onChange={handleInputChange} placeholder="Enter rule number to trace" />
              <Button type="submit" disabled={!input}>
                <SearchIcon />
              </Button>
            </InputGroup>
          </Form>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs={12} md={8} className="text-secondary">
          <p>
            The trace is a tool designed to let you easily track the history of a particular rule. Just give it a rule
            number, and it’ll show you all the changes that particular rule went through in its history.
          </p>
          <p>
            Note that we can only follow a trace as far back as the available CR diffs allow, so particularly old
            changes might not be included. It also tracks only rules with actual rules text, so trying to trace e.g. a
            rule section will have no effect.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default TraceSearchPage;
