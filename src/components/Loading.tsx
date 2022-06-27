import { Spinner } from "react-bootstrap";
import React from "react";

interface Props extends React.ComponentPropsWithoutRef<"div"> {
  isLoading: boolean;
}

const Loading = ({ isLoading, children, ...props }: React.PropsWithChildren<Props>) => {
  props.className ??= "";
  props.className += " text-center";

  if (isLoading) {
    return (
      <div {...props}>
        <Spinner animation="border">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  } else {
    return <>{children}</>;
  }
};

export default Loading;
