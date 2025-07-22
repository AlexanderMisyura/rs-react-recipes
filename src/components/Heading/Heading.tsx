import { clsx } from 'clsx';
import { Component } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props {
  className?: string;
  children: React.ReactNode;
}

export class Heading extends Component<Props> {
  public render() {
    const combinedClasses = twMerge(
      clsx('text-center text-2xl font-bold text-orange-900', this.props.className)
    );
    return <h1 className={combinedClasses}>{this.props.children}</h1>;
  }
}
