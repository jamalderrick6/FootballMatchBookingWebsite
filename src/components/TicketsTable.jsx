import React from 'react';
import { Table } from 'react-bootstrap';

const TicketsTable = ({ tickets }) => {
	return (
		<div
			className="mt-3"
			style={{
				maxHeight: '600px',
				overflow: 'auto',
			}}
		>
			<Table hover responsive bordered className="mh-100">
				{/* The head of table */}
				<thead className="border-bottom border-2 border-dark">
					<tr className="text-primary fw-bold text-center">
						<td>Seat</td>
						<td>Ticket Number</td>
					</tr>
				</thead>

				{/* Real Data */}
				<tbody>
					{tickets.map((el, idx) => (
						<tr className="my-2 text-primary" key={idx}>
							<td className=" fw-bold text-center">
								<span className="text-primary ms-2">
									R {el?.seat?.y} * C {el?.seat?.x}
								</span>
							</td>
							<td className="text-center">
								<span className="fw-bold mt-2">{el?.ticketNumber}</span>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	);
};

export default TicketsTable;
