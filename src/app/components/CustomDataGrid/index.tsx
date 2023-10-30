import * as React from 'react';
import { DataGrid, DataGridProps } from '@mui/x-data-grid';
import styled from 'styled-components';

const RootContainer = styled.div`
  .MuiDataGrid-root {
    border: none;
  }
  .MuiDataGrid-columnHeaderWrapper {
    background: rgba(240, 240, 240, 0.5);
    border-top: 1px solid rgba(224, 224, 224, 1);
    color: #777777;
    .MuiDataGrid-columnHeaderTitle {
      font-weight: 700;
    }
  }
  .MuiDataGrid-cell {
    white-space: unset !important;
    :focus {
      outline: none;
    }
    :focus-within {
      outline: none !important;
    }
  }
  .MuiDataGrid-columnHeader:focus {
    outline: none !important;
  }

  .MuiDataGrid-columnHeader:focus-within {
    outline: none !important;
  }
  .MuiDataGrid-columnSeparator {
    display: none !important;
  }
  .MuiDataGrid-columnHeaderTitle {
    user-select: none;
    padding: 0;
  }
  .MuiDataGrid-columnHeaderTitleContainer {
    padding: 0 !important;
  }
  .MuiDataGrid-row {
    cursor: pointer;
  }
  .name {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    width: calc(100% - 45px);
    word-break: break-word;
  }
`;

export default function CDataGrid(props: DataGridProps) {
  const { className, ...rest } = props;
  return (
    <RootContainer className={className}>
      <DataGrid
        {...rest}
        autoHeight
        disableColumnMenu
        hideFooterSelectedRowCount
        rowsPerPageOptions={[5, 10, 20, 50, 100]}
        paginationMode="server"
      />
    </RootContainer>
  );
}
