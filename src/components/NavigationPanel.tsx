import { Button, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft } from "@fortawesome/free-solid-svg-icons/faCaretLeft";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons/faCaretRight";
import "./NavigationPanel.css";

type NavDirection = "prev" | "next";
interface Props {
  leftDisabled: boolean;
  rightDisabled: boolean;
  onClick: (arg: NavDirection) => void;
}

const NavigationPanel = ({ leftDisabled, rightDisabled, onClick }: Props) => (
  <>
    <Row className="navigation-container">
      <Col xs={6} xl="auto" className="navigation navigation-left">
        <Button variant="link" disabled={leftDisabled} onClick={() => onClick("prev")}>
          <FontAwesomeIcon icon={faCaretLeft} />
        </Button>
      </Col>
      <Col xs={6} xl="auto" className="navigation navigation-right">
        <Button variant="link" disabled={rightDisabled} onClick={() => onClick("next")}>
          <FontAwesomeIcon icon={faCaretRight} />
        </Button>
      </Col>
    </Row>
    <div className="navigation-placeholder" />
  </>
);

export default NavigationPanel;
