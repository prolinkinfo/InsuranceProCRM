import { styled } from '@mui/material/styles';
import Palette from '../theme/palette';

const TableStyleTwo = styled('div')({
  margin: "0 0 0 0",

  "& .MuiDataGrid-root": {
    border: "none",
  },
  "& .MuiDataGrid-cell": {
    borderBottom: "none",
  },
  "& .name-column--cell--capitalize": {
      textTransform: "capitalize"
  },
  "& .name-column--cell": {
    color: Palette.primary.main,
  },
  "& .name-column--cell:hover": {
    textDecoration: "underline",
    cursor: "pointer",
  },
  "& .MuiDataGrid-columnHeaders": {
    backgroundColor: Palette.primary.lighter,
    border: "none",
    borderRadius: "0px",
  },
  "& .MuiDataGrid-footerContainer": {
    borderTop: "none",
    height: "20px !important",
    backgroundColor: Palette.primary.lighter,
    minHeight: 40,
    borderRadius: "0 0 5px 5px",
  },
  
  ".css-1jiby6q-MuiDataGrid-root .MuiDataGrid-columnHeader:focus-within, .css-1jiby6q-MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
    outline: "none"
  }
});

export default TableStyleTwo