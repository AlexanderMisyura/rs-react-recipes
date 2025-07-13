import { ErrorFallback } from '@components';
import { Component /* , type ErrorInfo */ } from 'react';

interface Props {
  children: React.ReactNode;
}

interface State {
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    error: null,
  };

  public boundResetError = this.resetError.bind(this);

  public static getDerivedStateFromError(error: Error) {
    return { error: error };
  }

  public componentDidCatch(error: Error, errorInfo: unknown) {
    console.log('Hello from ErrorBoundary ⊂(◉‿◉)つ', error, errorInfo);
  }

  public resetError() {
    this.setState({ error: null });
  }

  public render() {
    const { error } = this.state;
    if (error) {
      return <ErrorFallback error={error} resetFunction={this.boundResetError} />;
    }
    return this.props.children;
  }
}
