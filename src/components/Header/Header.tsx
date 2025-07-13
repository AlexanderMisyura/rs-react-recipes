import logo from '@assets/logo.png';
import { BoxWrapper } from 'components/BoxWrapper/BoxWrapper';
import { Component } from 'react';

interface Props {
  children: React.ReactNode;
}

export class Header extends Component<Props> {
  public render() {
    return (
      <header className="sticky top-0 flex w-full justify-center">
        <BoxWrapper className="m-0 w-full flex-row flex-wrap justify-between gap-4 p-2 max-sm:justify-center">
          <div className="flex items-center gap-2 select-none">
            <img src={logo} alt="logo" className="h-12" />
            <span className="text-2xl font-bold text-orange-900">Hot Recipes</span>
          </div>
          {this.props.children}
        </BoxWrapper>
      </header>
    );
  }
}
