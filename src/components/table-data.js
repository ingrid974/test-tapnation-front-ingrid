import React from "react";
import DataTable from 'react-data-table-component';
import 'datatables.net-bs4';

const TableData = ({ data }) => {

    const customTitle = <h1 className="display-6 text-secondary text-center mb-4 mt-5">Données Marketing</h1>


    const columns = [
        { name: "Date", selector: (row) => row.date, sortable: true },
        { name: "Platform", selector: (row) => row.platform, sortable: true },
        { name: "Spend", selector: (row) => row.spend, sortable: true },
        { name: "Revenue D0", selector: (row) => row.cohort_revenue_d0, sortable: true },
        { name: "Revenue D1", selector: (row) => row.cohort_revenue_d1, sortable: true },
        { name: "Daily Revenue", selector: (row) => row.daily_revenue, sortable: true },
        { name: "Installs", selector: (row) => row.installs, sortable: true },
      ];
	
	return (
		<DataTable
                title={customTitle}
                columns={columns}
                data={data}
                pagination
                responsive
        />
	);
};

export default TableData;
