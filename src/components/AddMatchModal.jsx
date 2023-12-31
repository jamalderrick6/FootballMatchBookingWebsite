import { useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';
import API from '../api/api.js';
import { toast } from 'react-toastify';
import { Col, Row } from 'react-bootstrap';
import {
	fetchAddMatch,
	fetchAddStadium,
	fetchEditMatch,
} from '../api/admin.js';
import { data } from '../data/index.js';
import moment from 'moment';
import { updateToaster } from '../utils/index.js';

function addMatchModal({
	handleClose,
	show,
	appendMatch,
	isEdit = false,
	editMatch,
	match,
}) {
	const formRef = useRef(null);
	const [errorMessage, setErrorMessage] = useState('');
	const [teams, setTeams] = useState([]);
	const [stadiums, setStadiums] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const { data: res } = await API.get('/teams');
				setTeams(res);

				const { data: res2 } = await API.get('/stadiums');
				setStadiums(res2);
			} catch (error) {
				toast.error('Error in fetching teams or stadiums');
			}
		};
		fetchData();
	}, []);

	const handleAddMatch = async (e) => {
		e.preventDefault();
		setErrorMessage('');

		let team1 = formRef.current.team1.value,
			team2 = formRef.current.team2.value,
			seatPrice = formRef.current.seatPrice.value,
			stadium = formRef.current.stadium.value,
			mainReferee = formRef.current.mainReferee.value,
			linesMan1 = formRef.current.linesMan1.value,
			linesMan2 = formRef.current.linesMan2.value,
			date = formRef.current.date.value;

		const temp = validateForm({
			team1,
			team2,
			stadium,
			seatPrice,
			mainReferee,
			linesMan1,
			linesMan2,
			date,
		});

		if (temp) return setErrorMessage(temp);

		const stadiumObj = stadiums.find((s) => s.hash_value === stadium);
		if (isEdit && stadiumObj && !isBiggerStadium(stadiumObj, match.stadium)) {
			return setErrorMessage('Stadium is smaller than the previous one');
		}

		const objToSend = {
			team1,
			team2,
			stadium,
			mainReferee,
			linesMan1,
			linesMan2,
			date,
			seatPrice,
			name: `${getTeamNameById(teams, team1)} vs ${getTeamNameById(
				teams,
				team2,
			)}`,
		};
		const toastId = toast.loading(`${isEdit ? 'Editing' : 'Adding'} Match...`);
		try {
			let res, sucessMsg;
			if (isEdit) {
				res = await fetchEditMatch(match.id, objToSend);
				editMatch(res.data);
				sucessMsg = 'Match Edited Successfully';
			} else {
				res = await fetchAddMatch(objToSend);
				appendMatch(res);
				sucessMsg = 'Match Added Successfully';
			}
			formRef.current.reset();
			handleClose();

			updateToaster(toastId, sucessMsg, toast.TYPE.SUCCESS);
			toast.success();
		} catch (error) {
			console.log(error);

			let msg = error?.response?.data?.data?.message || '';
			if (msg.includes(' already has a match that day'))
				msg = 'this team already has a match that day';

			msg = msg || `Error in ${isEdit ? 'Editing' : 'Adding'} match`;
			setErrorMessage(msg);
			updateToaster(toastId, msg, toast.TYPE.ERROR);
		}
	};

	return (
		<>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title className="text-primary">
						{isEdit ? 'Edit Match' : 'Add New Match'}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={handleAddMatch} ref={formRef}>
						{/* team 1 */}
						<Form.Group className="mb-3">
							<Form.Label className="fw-bold "> Team 1</Form.Label>
							<Form.Select name="team1" disabled={isEdit}>
								{teams.map((team) => (
									<option
										key={team.hash_value}
										value={team.hash_value}
										selected={isEdit && match.team1.hash_value === team.hash_value}
									>
										{team.name}
									</option>
								))}
							</Form.Select>
						</Form.Group>

						{/* Team 2 */}
						<Form.Group className="mb-3">
							<Form.Label className="fw-bold "> Team 2</Form.Label>
							<Form.Select name="team2" disabled={isEdit}>
								{teams.map((team) => (
									<option
										key={team.hash_value}
										value={team.hash_value}
										selected={isEdit && match.team2.hash_value === team.hash_value}
									>
										{team.name}
									</option>
								))}
							</Form.Select>
						</Form.Group>

						{/* Stadium */}
						<Form.Group className="mb-3">
							<Form.Label className="fw-bold "> Stadium</Form.Label>
							<Form.Select name="stadium" disabled={isEdit}>
								{stadiums.map((stadium) => (
									<option
										key={stadium.hash_value}
										value={stadium.hash_value}
										selected={isEdit && match.stadium.hash_value === stadium.hash_value}
									>
										{stadium.name} ( {stadium.width} *{' '}
										{stadium.height} )
									</option>
								))}
							</Form.Select>
						</Form.Group>

						{/* Seat Price */}
						<Form.Group className="mb-3">
							<Form.Label className="fw-bold "> Seat Price</Form.Label>
							<Form.Control
								type="number"
								name="seatPrice"
								min={0}
								placeholder="Enter Seat Price ..."
								defaultValue={isEdit ? match.seatPrice : ''}
							/>
						</Form.Group>

						{/* Main Ref */}
						<Form.Group className="mb-3">
							<Form.Label className="fw-bold "> Main Refree</Form.Label>
							<Form.Select
								name="mainReferee"
								defaultValue={isEdit && match.mainReferee}
								required
							>
								{data.refrees.map((referee, idx) => (
									<option key={idx} value={referee}>
										{referee}
									</option>
								))}
							</Form.Select>
						</Form.Group>

						{/* Lines Men */}
						<Row>
							<Col xs={12} md={6}>
								<Form.Group className="mb-3">
									<Form.Label className="fw-bold "> LinesMan 1</Form.Label>
									<Form.Select
										name="linesMan1"
										defaultValue={isEdit && match.linesMan1}
										required
									>
										{data.linesMen.map((referee, idx) => (
											<option key={idx} value={referee}>
												{referee}
											</option>
										))}
									</Form.Select>
								</Form.Group>
							</Col>
							<Col xs={12} md={6}>
								<Form.Group className="mb-3">
									<Form.Label className="fw-bold "> LinesMan 2</Form.Label>
									<Form.Select
										name="linesMan2"
										defaultValue={isEdit && match.linesMan2}
										required
									>
										{data.linesMen.map((referee, idx) => (
											<option key={idx} value={referee}>
												{referee}
											</option>
										))}
									</Form.Select>
								</Form.Group>
							</Col>
						</Row>

						{/* Date */}
						<Form.Group className="mb-3">
							<Form.Label className="fw-bold "> Date</Form.Label>
							<Form.Control
								required
								aria-label="Date of Match"
								placeholder="Date of Match"
								type="datetime-local"
								name="date"
								defaultValue={
									isEdit && moment(match.date).format('YYYY-MM-DDTHH:mm')
								}
							/>
						</Form.Group>
						{errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="danger" onClick={handleClose}>
						Close
					</Button>
					<Button variant="success" onClick={handleAddMatch}>
						{isEdit ? 'Edit' : 'Add'} Match
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default addMatchModal;

function validateForm(data) {
	const {
		team1,
		team2,
		stadium,
		mainReferee,
		linesMan1,
		linesMan2,
		date,
		seatPrice,
	} = data;

	if (
		!team1 ||
		!team2 ||
		!stadium ||
		!mainReferee ||
		!seatPrice ||
		!linesMan1 ||
		!linesMan2 ||
		!date
	) {
		return 'All fields are required';
	}

	if (team1 === 'team1' || team2 === 'team2' || stadium === 'stadium') {
		return 'All fields are required';
	}

	if (isNaN(seatPrice)) {
		return 'Seat Price must be a number';
	}

	if (seatPrice < 0) {
		return 'Seat Price must be greater than 0';
	}

	if (team1 === team2) {
		return 'Team 1 and Team 2 must be different';
	}

	if (linesMan1 === linesMan2) {
		return 'LinesMan 1 and LinesMan 2 must be different';
	}

	if (new Date(date) < new Date()) {
		return 'Date must be greater than today';
	}

	return null;
}

function isBiggerStadium(stadium1, stadium2) {
	return (
		stadium1.width >= stadium2.width &&
		stadium1.height >= stadium2.height
	);
}

function getTeamNameById(teams, hash_value) {
	return teams.find((team) => team.hash_value === hash_value).name;
}
