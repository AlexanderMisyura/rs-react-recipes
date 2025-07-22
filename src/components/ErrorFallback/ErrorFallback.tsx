import { BoxWrapper, Button, Heading } from '@components';
import { Component } from 'react';

interface Props {
  error: Error;
  title?: string;
  resetFunction?: () => void;
  btnChildren?: React.ReactNode;
}

export class ErrorFallback extends Component<Props> {
  public render() {
    return (
      <BoxWrapper testId="error-fallback" className="max-w-2xl border-2 border-red-600">
        <Heading className="text-red-600">{this.props.title ?? 'Something went wrong'}</Heading>
        <p className="text-xl">{this.props.error.message}</p>
        {this.props.resetFunction && (
          <Button onClickHandler={this.props.resetFunction}>
            {this.props.btnChildren ?? 'Fix'}
          </Button>
        )}
      </BoxWrapper>
    );
  }
}
