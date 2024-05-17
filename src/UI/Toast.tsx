import { toast } from 'react-toastify';

type Props = {
	type: 'success' | 'error'
	message: string,
}

const Toast = ({
	type,
	message,
}: Props) => {

	const toastFunction = type === 'success' ? toast.success : toast.error;

  toastFunction(message);
}

export { Toast };