import React from "react";
import ErrorPage from "../pages/ErrorPage";

interface IState {
  hasError: boolean;
  errorMessage?: string;
}

class ErrorBoundary extends React.Component<React.PropsWithChildren, IState> {
  constructor(props: React.PropsWithChildren) {
    super(props);
    this.state = { hasError: false, errorMessage: undefined };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, errorMessage: error.message };
  }

  render() {
    if (this.state.hasError) {
      return <ErrorPage message={this.state.errorMessage} />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
