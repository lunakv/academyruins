import React, { MouseEventHandler } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft } from "@fortawesome/free-solid-svg-icons/faCaretLeft";
import { Button } from "react-bootstrap";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons/faCaretRight";

enum Position {
  left,
  right,
}
type PositionStrings = keyof typeof Position;

interface Props {
  position: PositionStrings;
  disabled?: boolean;
  onClick: MouseEventHandler;
}

const NavigationSidePanel = ({
  position,
  disabled = false,
  onClick,
}: Props) => {
  const positionValue = Position[position];
  let style: React.CSSProperties = {
    top: "50%",
    position: "fixed",
    transform: "translateY(-50%)",
  };

  let icon;
  if (positionValue === Position.right) {
    icon = faCaretRight;
    style["right"] = "5%";
  } else {
    icon = faCaretLeft;
    style["left"] = "5%";
  }

  return (
    <div style={style} className="side-navigation">
      <Button variant="link" disabled={disabled} onClick={onClick}>
        <FontAwesomeIcon icon={icon} size="3x" />
      </Button>
    </div>
  );
};

export default NavigationSidePanel;
