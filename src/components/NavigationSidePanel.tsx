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

const NavigationSidePanel = ({ position, disabled = false, onClick }: Props) => {
  const positionValue = Position[position];

  let icon;
  if (positionValue === Position.right) {
    icon = faCaretRight;
  } else {
    icon = faCaretLeft;
  }

  return (
    <div className={`side-navigation sn-${position}`}>
      <Button variant="link" disabled={disabled} onClick={onClick}>
        <FontAwesomeIcon icon={icon} size="3x" />
      </Button>
    </div>
  );
};

export default NavigationSidePanel;
