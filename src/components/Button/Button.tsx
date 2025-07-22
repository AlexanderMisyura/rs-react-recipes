import { clsx } from 'clsx/lite';
import { Component } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type?: 'button' | 'submit' | 'reset';
  children?: React.ReactNode;
  onClickHandler?: () => void;
  testId?: string;
}

export class Button extends Component<Props> {
  public render() {
    const combinedClasses = twMerge(
      clsx(
        'px-4 py-2',
        'cursor-pointer rounded-md border-2 border-transparent bg-sky-200 font-bold shadow-sm tracking-wide',
        'hover:border-sky-300',
        'active:border-sky-200 active:bg-sky-100 active:text-gray-500 active:shadow-inner',
        'transition-colors',
        this.props.className
      )
    );

    return (
      <button
        data-testid={this.props.testId}
        type={this.props.type ?? 'button'}
        className={combinedClasses}
        onClick={this.props.onClickHandler}
      >
        {this.props.children}
      </button>
    );
  }
}
