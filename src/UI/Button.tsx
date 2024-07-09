import * as React from 'react';
import { Button as ReactButton } from 'react-bootstrap';

type Props = {
  children: React.ReactNode;
  variant?: 'primary' | 'danger';
  className?: string;
  disabled?: boolean;
  dataTestId?: string;
  onClick: ()=>void;
}

const Button = ({
  children,
  variant,
  className,
  disabled,
  dataTestId,
  onClick
}: Props) => {
  const primaryClasses = variant === `primary` ? '!bg-primary !border-primary hover:bg-primary hover:border-primary' : ''
  const customClassName = `${primaryClasses} ${className ? className : ''}`;

  return (
    <ReactButton
      data-testid={dataTestId || 'custom-button'}
      className={customClassName}
      onClick={onClick}
      variant={variant}
      disabled={disabled}
    >
      {children}
    </ReactButton>
  )
}

export { Button };