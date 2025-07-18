import { clsx } from 'clsx/lite';
import { Component } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props {
  className?: string;
  children: React.ReactNode;
  testId?: string;
}

export class BoxWrapper extends Component<Props> {
  public render() {
    const combinedClasses = twMerge(
      clsx(
        'rounded-sm bg-amber-50 shadow-xl',
        'mx-2 p-4 flex flex-col place-items-center gap-4',
        'max-w-5xl',
        this.props.className
      )
    );

    return (
      <div data-testid={this.props.testId} className={combinedClasses}>
        {this.props.children}
      </div>
    );
  }
}
