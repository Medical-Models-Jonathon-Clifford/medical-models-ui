import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { faker } from '@faker-js/faker';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'CAPA NUMBER', width: 70 },
  { field: 'phase', headerName: 'PHASE', width: 70 },
];

const capaPhases = ['Triage', 'Execution', 'Signed Off'];

const someData = [{
  id: 1,
  name: faker.hacker.phrase(),
  phase: faker.helpers.arrayElement(capaPhases),
}];

const paginationModel = { page: 0, pageSize: 5 };

const SimpleCapaTable = ({someOtherData}: {someOtherData: any[]}) => {
  return (
    <>
      <DataGrid
        rows={someOtherData}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </>
  );
}

export default SimpleCapaTable;
