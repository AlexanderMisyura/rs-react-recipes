import errorIcon from '@assets/error.svg';
import { BoxWrapper, Button } from '@components';
import { Component } from 'react';

interface State {
  isError: boolean;
}

export class ErrorTrigger extends Component<object, State> {
  public state = {
    isError: false,
  };

  public render() {
    if (this.state.isError) {
      throw new Error('Triggered Error. Try to fix it.');
    }

    return (
      <BoxWrapper className="mb-2 self-center border-2 border-red-600">
        <Button
          className="flex items-center gap-2"
          onClickHandler={() => {
            this.setState({ isError: true });
          }}
        >
          <img className="h-6" src={errorIcon} alt="" />
          Trigger Error
          <img className="h-6" src={errorIcon} alt="" />
        </Button>
      </BoxWrapper>
    );
  }
}
