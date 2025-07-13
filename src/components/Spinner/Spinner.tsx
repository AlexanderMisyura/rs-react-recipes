import chiliIcon from '@assets/chili.svg';
import { Heading } from '@components';
import { Component } from 'react';

export class Spinner extends Component {
  public render() {
    return (
      <div>
        <div className="h-40 w-40 animate-spin">
          <img src={chiliIcon} alt="" />
        </div>
        <Heading>Loading...</Heading>
      </div>
    );
  }
}
