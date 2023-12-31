import moment from 'moment';
import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const MatchCard = ({ match, showDetails = true }) => {
	return (
		<div className="w-md-50 p-3 shadow-lg rounded-4 mb-3">
			{/* 2 Teams  */}
			<Row className="justify-content-center">
				<Col className="d-flex flex-column justify-content-center align-items-center sh">
					<p className="mt-3 text-primary fw-bold"> {match.team1.name} </p>
				</Col>
				<Col className="fw-bold text-primary d-flex flex-column justify-content-center align-items-center">
					Vs
				</Col>
				<Col className="d-flex flex-column justify-content-center align-items-center">
					<p className="mt-3 text-primary fw-bold"> {match.team2.name} </p>
				</Col>
			</Row>
			{/* Stadium */}
			<Row className="mb-3">
				<Col className="d-flex flex-column justify-content-center align-items-center text-center">
					<div className="d-flex justify-content-evenly w-100">
						<h5 className="fw-bold mb-2">
							Stadium :<b className="ms-1 text-primary">{match.stadium.name}</b>
						</h5>
						<p className="fw-bold">
							Seat Price :
							<b className="ms-1 text-primary">{match.seatPrice} Kshs.</b>
						</p>
					</div>
				</Col>
			</Row>
			<hr className="w-50 mx-auto" />
			{/* Referees */}
			<Row className="justify-content-center">
				<Col className="d-flex  justify-content-center align-items-center">
					<span className="fw-bold">Referee :</span>
					<b className="ms-1 text-primary">{match.mainReferee}</b>
				</Col>
				<Col className="d-flex  justify-content-center align-items-center">
					<span className="fw-bold">LinesMan 1 :</span>
					<b className="ms-1 text-primary">{match.linesMan1}</b>
				</Col>
				<Col className="d-flex  justify-content-center align-items-center">
					<span className="fw-bold">LinesMan 2 :</span>
					<b className="ms-1 text-primary">{match.linesMan2}</b>
				</Col>
			</Row>
			<hr className="w-50 mx-auto" />
			{/* Date */}
			<Row className="justify-content-center text-center">
				<Col className="d-flex  justify-content-center align-items-center">
					<h5 className="mt-3 ms-1 text-primary fw-bold">
						{moment(match.date).isBefore(Date.now())
							? `Ended : ${moment(match.date).fromNow()}`
							: `Played in : ${moment(match.date).format(
									'DD/MM/YYYY -  h:mm a',
							  )}`}
					</h5>
				</Col>
			</Row>
			{showDetails && (
				<Row>
					<Col className="d-flex  justify-content-end align-items-center">
						<Button
							as={Link}
							to={`/matches/${match.id}`}
							variant="secondary"
							className="px-3 rounded-3"
						>
							Details
						</Button>
					</Col>
				</Row>
			)}
		</div>
	);
};

export default MatchCard;
