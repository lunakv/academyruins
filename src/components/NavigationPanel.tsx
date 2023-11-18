import { Button, Col, Row } from "react-bootstrap";
import { ReactComponent as CaretRightIcon } from "bootstrap-icons/icons/caret-right-fill.svg";
import { ReactComponent as CaretLeftIcon } from "bootstrap-icons/icons/caret-left-fill.svg";
import { ReactComponent as CaretUpIcon } from "bootstrap-icons/icons/caret-up-fill.svg";
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
      <Col xs={2} />
      <Col xs={4} xl="auto" className="navigation navigation-left">
        <Button variant="link" disabled={leftDisabled} onClick={() => onClick("prev")}>
          <CaretLeftIcon />
        </Button>
      </Col>
      <Col xs={4} xl="auto" className="navigation navigation-right">
        <Button variant="link" disabled={rightDisabled} onClick={() => onClick("next")}>
          <CaretRightIcon />
        </Button>
      </Col>
      <Col xs={2} xl="auto" className="navigation navigation-top">
        <Button variant="link" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <CaretUpIcon />
        </Button>
      </Col>
    </Row>
    <div className="navigation-placeholder" />
  </>
);

export default NavigationPanel;
