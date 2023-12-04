import { CircularProgress } from '@mui/material';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { useEffect, useState } from 'react';
import API from '../api/api.js';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

const clientId = "AbMXNojc10Te9AidRfGcYKM9Zg4t-thqwV8SNnD6517DoS0egqPz2DOmv-3l64g0lYB6lLq7gCgyOy3c";

const PaypalCheckoutButton = ({
	seats,
	isDisabled,
	setReservations,
	setUserReservations,
}) => {
	const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
	const parmas = useParams();
	const navigate = useNavigate();
	const { id: matchId } = parmas;

	const createOrder = async () => {
		try {
			const { data: res } = await API.post(`matches/${matchId}/reservations`, {
				seats,
			});

			return res.data.paypalOrderId;
		} catch (error) {
			console.log(error);
			toast.error('Error in creating Order');
		}
	};

	const onApprove = async (data, actions) => {
		try {
			const paypalOrderId = data.orderID;

			const confirmUrl = `matches/${matchId}/reservations/capture-payment`;
			const { data: res } = await API.post(confirmUrl, {
				orderId: paypalOrderId,
			});

			setReservations((prev) => [...prev, ...res.data]);
			setUserReservations([]);
			navigate('/user-reservation');
			console.log(res);
			toast.success('Order Paid Successfully');
		} catch (err) {
			console.log(err);
			toast.error('error while paying Order');
		}
	};
	function onError(err) {
		console.log(err);
		// toast.dismiss();
		toast.error('error while paying Order');
	}
	function onCancel(data, actions) {
		// toast.dismiss();
		toast.error('Order Payment Cancelled');
	}

	useEffect(() => {
		const loadPaypalScript = async () => {
			paypalDispatch({
				type: 'resetOptions',
				value: {
					'client-id': clientId,
					currency: 'USD',
				},
			});
			paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
		};
		loadPaypalScript();
	}, [paypalDispatch]);

	useEffect(() => {
		paypalDispatch({
			type: 'resetOptions',
			value: {
				'client-id': clientId,
				currency: 'USD',
			},
		});
		paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
	}, [isDisabled, seats]);

	return (
		<>
			{isPending ? (
				<CircularProgress />
			) : (
				<PayPalButtons
					className="mt-4 w-100"
					createOrder={createOrder}
					onApprove={onApprove}
					onError={onError}
					onCancel={onCancel}
					disabled={isDisabled}
				/>
			)}
		</>
	);
};

export default PaypalCheckoutButton;
