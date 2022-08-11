import React from "react";
import ErrorPage from "../pages/ErrorPage";

interface IState {
  errorMessage?: string;
}

interface IProps {
  hasError: boolean;
  onError: () => void;
}

class ErrorBoundary extends React.Component<React.PropsWithChildren<IProps>, IState> {
  constructor(props: React.PropsWithChildren<IProps>) {
    super(props);
    this.state = { errorMessage: undefined };
  }

  static getDerivedStateFromError(error: Error) {
    return { errorMessage: error.message };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.props.onError();
  }

  render() {
    if (this.props.hasError) {
      return <ErrorPage message={this.state.errorMessage} />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
