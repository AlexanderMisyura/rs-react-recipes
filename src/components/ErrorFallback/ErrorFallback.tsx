import { Button } from '@components';
import { Component } from 'react';

interface Props {
  error: Error;
  resetFunction: () => void;
  children?: React.ReactNode;
}

export class ErrorFallback extends Component<Props> {
  public render() {
    return (
      <div className="flex max-w-2xl flex-col place-items-center gap-4 rounded-xs bg-amber-50 p-4 shadow-xl">
        <h1 className="text-2xl font-bold text-red-600">Something went wrong</h1>
        <p className="text-xl">{this.props.error.message}</p>
        <Button onClickHandler={this.props.resetFunction}>{this.props.children ?? 'Fix'}</Button>
      </div>
    );
  }
}
