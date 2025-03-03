import React from "react";
import { Line } from 'react-chartjs-2';
import { Col } from 'react-bootstrap';

const ChartData = ({ data, type }) => {

	const title = type === "spend" ? "Courbe des dépenses" : "Courbes des revenus";
	
	return (
        <Col md={6}>
			<h1 className="display-6 text-secondary text-center mb-4 mt-5">{title}</h1>
            {data && <Line data={data} />}
        </Col>
	);
};

export default ChartData;
