import { styled } from '@mui/material/styles';
import Palette from '../theme/palette';

const TableStyle = styled('div')({
  "& .MuiDataGrid-root": {
    border: "none",
  },
  "& .MuiDataGrid-cell": {
    borderBottom: "none",
  },
  "& .name-column--cell": {
    color: Palette.primary.main,
    cursor: "pointer",

  },
  "& .name-column--cell--capitalize": {
    textTransform: "capitalize",
  },
  "& .name-column--cell:hover": {
    textDecoration: "underline",
  },
  "& .MuiDataGrid-columnHeaders": {
    backgroundColor: Palette.grey[200],
    borderBottom: "none",
    outline: "none !important",
    borderRadius: "0px",
  },
  "& .MuiDataGrid-virtualScroller": {
    scrollbarWidth: "1px",
  },
  "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
    textTransform: "capitalize",
    fontSize: "15px",
  },
  ".MuiDataGrid-cell:focus,.MuiDataGrid-columnHeader:focus,MuiDataGrid-columnHeaderCheckbox:focus": {
    outline: "none !important",
  },
  ".css-1jiby6q-MuiDataGrid-root .MuiDataGrid-columnHeader:focus-within, .css-1jiby6q-MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
    outline: "none"
  }
});

export default TableStyle