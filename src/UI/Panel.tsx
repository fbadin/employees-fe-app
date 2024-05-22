import * as React from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
}

const Panel = ({ children, className }: Props) => {
  const customClassName = `${className ? className : ''}`;

  return (
    <div
      data-testid='panel'
      className={`bg-dark-gray rounded-md text-dark-1 bg-dark-grey p-3 ${customClassName}`}
    >
      {children}
    </div>
  )
}

export { Panel };