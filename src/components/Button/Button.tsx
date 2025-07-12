import { Component } from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type?: 'button' | 'submit' | 'reset';
  children?: React.ReactNode;
  onClickHandler?: () => void;
}

export class Button extends Component<Props> {
  public render() {
    return (
      <button
        type={this.props.type ?? 'button'}
        className="cursor-pointer rounded-md border-2 border-transparent bg-sky-200 px-4 py-2 font-bold tracking-wide shadow-sm transition-colors hover:border-sky-300 active:border-sky-200 active:bg-sky-100 active:text-gray-500 active:shadow-inner"
        onClick={this.props.onClickHandler}
      >
        {this.props.children}
      </button>
    );
  }
}
