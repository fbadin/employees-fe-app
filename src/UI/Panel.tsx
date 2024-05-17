import * as React from 'react';

type Props = {
	children: React.ReactNode
}

const Painel = (props: Props) => {
	return (
		<div className="rounded-md text-dark-1 bg-dark-grey p-3">
			{props.children}
		</div>
	)
}

export { Painel };