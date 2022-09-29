import React from "react";

interface IState {
  errorMessage?: string;
}

interface IProps {
  hasError: boolean;
  onError: () => void;
  errorComponent: (message: string | undefined) => JSX.Element;
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
      return this.props.errorComponent(this.state.errorMessage);
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
