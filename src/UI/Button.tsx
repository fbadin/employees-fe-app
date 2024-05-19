import * as React from 'react';
import { Button as ReactButton } from 'react-bootstrap';

type Props = {
	children: React.ReactNode;
	variant?: 'primary';
	className?: string;
	onClick: ()=>void;
}

const Button = ({ children, variant, className, onClick }: Props) => {
	const primaryClasses = variant === `primary` ? 'bg-primary border-primary hover:bg-primary hover:border-primary' : ''
	const customClassName = `${primaryClasses} ${className ? className : ''}`;

	return (
		<ReactButton className={customClassName} onClick={onClick}>
			{ children }
		</ReactButton>
	)
}

export { Button };