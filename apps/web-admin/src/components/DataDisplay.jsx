import { DataGrid, GridToolbar, LinearProgress } from '@mui/x-data-grid';
import { ThemeProvider, createTheme } from '@mui/material';

const MuiTheme = createTheme({});

export default function DataDisplay({ loading, rows, columns, onRowClick }) {
  return (
    <ThemeProvider theme={MuiTheme}>
      <DataGrid
        rows={rows}
        columns={columns}
        slots={{
          toolbar: GridToolbar,
          loadingOverlay: LinearProgress,
        }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        loading={loading}
        getRowId={(row) => row.id}
        sx={{
          '& .MuiDataGrid-row:hover': {
            cursor: 'pointer',
          },
        }}
        onRowClick={onRowClick}
      />
    </ThemeProvider>
  );
}
