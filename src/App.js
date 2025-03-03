import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import 'datatables.net-bs4';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend, Filler } from 'chart.js';
import ChartData from './components/chart-data';
import TableData from './components/table-data';

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  Filler
);

const App = () => {
  const [data, setData] = useState(null);
  const [dataTable, setDataTable] = useState([]);
  const [spendChartData, setSpendChartData] = useState(null);
  const [revenueChartData, setRevenueChartData] = useState(null);

  const formatDataForTable = () => {
    const processedDataTable = [];
    Object.entries(data).forEach(([date, platforms]) => {
      Object.entries(platforms).forEach(([platform, types]) => {
        processedDataTable.push({ date, platform, ...types });
      });
    });  
    return processedDataTable; 
  };

  const formatDataForChart = (type) => {
    const labels = Object.keys(data);
    const platforms = Object.keys(data[labels[0]]);
    const datasets = platforms.map((platform) => {
      return {
        label: platform,
        data: labels.map((date) => data[date][platform][type]),
        borderColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
        fill: false,
      };
    });
    return { labels, datasets };
  };

   const getJsonData = () => {
      fetch('/data.json')
      .then((response) => response.json())
      .then((jsonData) => {
        setData(jsonData.data)
      })
      .catch((error) => console.error("Erreur de chargement du JSON :", error));
    };

  useEffect(() => {
      getJsonData();
  }, []);

  useEffect(() => {
    if (data) {
      setDataTable(formatDataForTable());
      setSpendChartData(formatDataForChart("spend"));
      setRevenueChartData(formatDataForChart("daily_revenue"));
    }
}, [data]);

  return (
    <Container fluid>
      <Row className="mt-4">
        <Col lg={12}>
          <Card>
            <Card.Body>
              <h1 className="display-2 text-center mb-2">Tableau de bord Marketing</h1>
              <Row>
                <ChartData data={spendChartData} type={"spend"}/>
                <ChartData data={revenueChartData} type={"revenue"}/>
              </Row>
              <TableData data={dataTable} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default App;