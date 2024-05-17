import * as React from 'react';

type Props = {
	children: React.ReactNode
	className?: string
}

const Label = ({children, className }: Props) => {
	const customClass = `font-bold ${ !className ? '' : className }`
	return (
		<label className={customClass}>
			{children}
		</label>
	)
}

export { Label };