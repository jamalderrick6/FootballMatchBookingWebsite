import { toast } from 'react-toastify';

export const isAdmin = (currentUser) => {
	return currentUser?.role === 'AD';
};
export const isManager = (currentUser) => {
	return currentUser?.role === 'AD';
};

export const updateToaster = (toastId, message, type) => {
	toast.update(toastId, {
		render: message,
		type: type,
		isLoading: false,
		closeButton: true,
		autoClose: null, // to inherit the default value

		className: 'rotateY animated',
	});
};
