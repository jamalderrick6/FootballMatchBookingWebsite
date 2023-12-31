import { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';
import API from '../api/api.js';
import { toast } from 'react-toastify';
import { Col, Row } from 'react-bootstrap';
import { fetchAddStadium } from '../api/admin.js';
import { updateToaster } from '../utils/index.js';

function AddStadiumModal({ handleClose, show, appendStadium }) {
	const formRef = useRef(null);
	const [errorMessage, setErrorMessage] = useState('');

	const handleAddStadium = async (e) => {
		e.preventDefault();

		let name = formRef.current.name.value.trim(),
			description = formRef.current.description.value.trim(),
			width = formRef.current.width.value.trim(),
			height = formRef.current.height.value.trim(),
			image = formRef.current.image.value.trim();

		setErrorMessage('');
		console.log(image);
		if (!name || !width || !height || !image)
			return setErrorMessage('Please Enter All Required Fields');

		if (width < 10 || height < 10) {
			return setErrorMessage('Width and Height must be greater than 10');
		}

		if (width > 50 || height > 50) {
			return setErrorMessage('Width and Height must be less than 50');
		}

		const toastId = toast.loading(`Adding Stadium...`);
		try {
			const res = await fetchAddStadium({
				name,
				description,
				width,
				height,
				image,
			});

			appendStadium(res);

			formRef.current.reset();
			updateToaster(toastId, 'Stadium Added Successfully', toast.TYPE.SUCCESS);
			handleClose();
		} catch (error) {
			setErrorMessage('Error while Adding Stadium');
			updateToaster(toastId, 'Error while Adding Stadium', toast.TYPE.ERROR);
			console.log(error);
		}
	};

	return (
		<>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title className="text-primary">Add New Stadium</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={handleAddStadium} ref={formRef}>
						<Form.Group className="mb-3">
							<Form.Label className="fw-bold "> Name</Form.Label>
							<Form.Control
								required
								placeholder="enter Stadium name"
								type="text"
								name="name"
							/>
						</Form.Group>

						<Form.Group className="mb-3">
							<Form.Label className="fw-bold "> Description</Form.Label>
							<Form.Control
								required
								placeholder="enter Description (optional)"
								type="text"
								name="description"
							/>
						</Form.Group>

						<Row>
							<Col>
								<Form.Group className="mb-3">
									<Form.Label className="fw-bold "> width</Form.Label>
									<Form.Control
										required
										placeholder="Vip lounge width"
										type="number"
										name="width"
									/>
								</Form.Group>
							</Col>
							<Col>
								<Form.Group className="mb-3">
									<Form.Label className="fw-bold "> height</Form.Label>
									<Form.Control
										required
										placeholder="Vip lounge height"
										type="number"
										name="height"
									/>
								</Form.Group>
							</Col>
						</Row>

						<Form.Group className="mb-3">
							<Form.Label className="fw-bold "> Image</Form.Label>
							<Form.Control
								required
								placeholder="enter image url here"
								type="text"
								name="image"
							/>
						</Form.Group>

						{errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="danger" onClick={handleClose}>
						Close
					</Button>
					<Button variant="success" onClick={handleAddStadium}>
						Add Stadium
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default AddStadiumModal;
