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
      name: 'Amiah Pruitt Lamp1111111111111111111111111111111111111112312312',
      'KTA Number': '124 554 111',
      oldClub: 'Mobility',
      oldPackage: 'Baly',
      newClub: 'ha noi',
      newPackage: 1,
    },
    {
      id: 2,
      name: 'Amiah Pruitt Lamp2',
      'KTA Number': '124 554 222',
      oldClub: 'Mobility',
      oldPackage: 'Baly',
      newClub: 'ha noi',
      newPackage: 2,
    },
    {
      id: 3,
      name: 'Amiah Pruitt Lamp3',
      'KTA Number': '124 554 333',
      oldClub: 'Mobility',
      oldPackage: 'Baly',
      newClub: 'ha noi',
      newPackage: 3,
    },
    {
      id: 4,
      name: 'Amiah Pruitt Lamp4',
      'KTA Number': '124 554 444',
      oldClub: 'Mobility',
      oldPackage: 'Baly',
      newClub: 'ha noi',
      newPackage: 44,
    },
    {
      id: 5,
      name: 'Amiah Pruitt Lamp5',
      'KTA Number': '124 554 555',
      oldClub: 'Mobility',
      oldPackage: 'Baly',
      newClub: 'ha noi',
      newPackage: 4,
    },
    {
      id: 6,
      name: 'Amiah Pruitt Lamp61',
      'KTA Number': '124 554 6666',
      oldClub: 'Mobility',
      oldPackage: 'Baly',
      newClub: 'ha noi',
      newPackage: 5,
    },
  ];

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      renderCell: renderName,
    },
    { field: 'KTA Number', headerName: 'KTA Number', flex: 1 },
    { field: 'oldClub', headerName: 'Old Club', flex: 1 },
    { field: 'oldPackage', headerName: 'Old package', flex: 1 },
    { field: 'newClub', headerName: 'New club', flex: 1 },
    { field: 'newPackage', headerName: 'New package', flex: 1 },
  ];

  function renderName(params: GridRenderCellParams) {
    return (
      <div className="flex y-center w-100 hide-overflow">
        <div
          className="avatar rounded-full no-shrink"
          style={{ background: 'red', width: '31px', height: '31px' }}
        ></div>
        <span className="name lh-17 ml-14 no-shrink">{params.value}</span>
      </div>
    );
  }

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
