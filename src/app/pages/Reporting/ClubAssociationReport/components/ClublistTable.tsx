import * as React from 'react';
import {
  GridRowsProp,
  GridColDef,
  GridRenderCellParams,
  GridRowParams,
} from '@mui/x-data-grid';

import CustomDataGrid from 'app/components/CustomDataGrid';

function Table() {
  const [page, setPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(5);
  const [loading, setLoading] = React.useState(false);

  const rows: GridRowsProp = [
    {
      id: 1,
      clubName:
        'Amiah Pruitt Lamp1111111111111111111111111111111111111112312312',
      clubCode: '124 554 111',
      star: 'Mobility',
      adminName: 'Baly',
      province: 'ha noi',
      createdTime: 1,
    },
    {
      id: 2,
      clubName: 'Amiah Pruitt Lamp2',
      clubCode: '124 554 222',
      star: 'Mobility',
      adminName: 'Baly',
      province: 'ha noi',
      createdTime: 2,
    },
    {
      id: 3,
      clubName: 'Amiah Pruitt Lamp3',
      clubCode: '124 554 333',
      star: 'Mobility',
      adminName: 'Baly',
      province: 'ha noi',
      createdTime: 3,
    },
    {
      id: 4,
      clubName: 'Amiah Pruitt Lamp4',
      clubCode: '124 554 444',
      star: 'Mobility',
      adminName: 'Baly',
      province: 'ha noi',
      createdTime: 44,
    },
    {
      id: 5,
      clubName: 'Amiah Pruitt Lamp5',
      clubCode: '124 554 555',
      star: 'Mobility',
      adminName: 'Baly',
      province: 'ha noi',
      createdTime: 4,
    },
    {
      id: 6,
      clubName: 'Amiah Pruitt Lamp61',
      clubCode: '124 554 6666',
      star: 'Mobility',
      adminName: 'Baly',
      province: 'ha noi',
      createdTime: 5,
    },
  ];

  const columns: GridColDef[] = [
    {
      field: 'clubName',
      headerName: 'Club name',
      flex: 1,
    },
    { field: 'clubCode', headerName: 'Club code', flex: 1 },
    { field: 'star', headerName: 'Star', flex: 1 },
    { field: 'adminName', headerName: 'Admin name', flex: 1 },
    { field: 'province', headerName: 'Province', flex: 1 },
    { field: 'createdTime', headerName: 'createdTime', flex: 1 },
  ];

  const handlePageChange = (newPage: number) => {
    console.log(newPage);
  };

  const handlePageSizeChange = (newPage: number) => {
    console.log(newPage);
  };

  const handleRowClick = (params: GridRowParams) => {
    console.log(params);
  };
  return (
    <CustomDataGrid
      className="mt-7"
      rows={rows}
      columns={columns}
      autoHeight
      disableColumnMenu
      hideFooterSelectedRowCount
      pageSize={pageSize}
      rowsPerPageOptions={[5, 10, 20, 50, 100]}
      paginationMode="server"
      onRowClick={handleRowClick}
      onPageChange={handlePageChange}
      onPageSizeChange={handlePageSizeChange}
      page={page}
      loading={loading}
    />
  );
}

export default React.memo(Table);
