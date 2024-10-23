import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { faker } from '@faker-js/faker';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'capaNumber', headerName: 'CAPA NUMBER', width: 70 },
  { field: 'type', headerName: 'TYPE', width: 70 },
  { field: 'capaTitle', headerName: 'CAPA TITLE', width: 70 },
  {
    field: 'site',
    headerName: 'SITE',
    type: 'number',
    width: 70,
  },
  {
    field: 'department',
    headerName: 'DEPARTMENT',
    description: 'This column has a value getter and is not sortable.',
    width: 70,
  },
  { field: 'assignee', headerName: 'ASSIGNEE', width: 70 },
  { field: 'dateRaised', headerName: 'DATE RAISED', width: 70 },
  { field: 'phase', headerName: 'PHASE', width: 70 },
  { field: 'dateDue', headerName: 'DATE DUE', width: 70 },
  { field: 'daysRemaining', headerName: 'DAYS REMAINING', type: 'number', width: 70 },
  { field: 'openDays', headerName: 'OPEN DAYS', type: 'number', width: 70 },
  { field: 'state', headerName: 'STATE', width: 70 },
];

const capaTypes = ['Safety', 'Performance', 'Quality', 'Compliance', 'Other'];
const capaPhases = ['Triage', 'Execution', 'Signed Off'];
const capaStates = ['Assigned', 'In Progress', 'In Review', 'Done'];

const someData = [{
  id: 1,
  capaNumber: faker.number.int({min: 1000, max: 9999}),
  type: faker.helpers.arrayElement(capaTypes),
  capaTitle: faker.hacker.phrase(),
  site: faker.location.city(),
  department: faker.commerce.department(),
  assignee: faker.person.fullName(),
  dateRaised: faker.date.past(),
  phase: faker.helpers.arrayElement(capaPhases),
  dateDue: faker.date.future(),
  daysRemaining: faker.number.int(50),
  openDays: faker.number.int({min: 100, max: 500}),
  state: 'wewetewtw',
}];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const paginationModel = { page: 0, pageSize: 5 };

const CapaTable = () => {
  return (
    <>
      <DataGrid
        rows={someData}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </>
  );
}

export default CapaTable;
