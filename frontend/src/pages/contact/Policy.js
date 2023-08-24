/* eslint-disable react/prop-types */
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RemoveIcon from "@mui/icons-material/Remove";
import PolicyIcon from '@mui/icons-material/Policy';
import AddIcon from "@mui/icons-material/Add";
import TableStyleTwo from "../../components/TableStyleTwo";
import AddPolicy from '../policy/Add'

const Policy = ({ rows, toggleVisibilityPolicy, isVisiblePolicy, _id, setUserAction }) => {

  const [openAdd, setOpenAdd] = useState(false)

  // open add model
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);


  const navigate = useNavigate();

  const columns = [
    {
      field: "policyNumber",
      headerName: "Policy Number",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: (params) => {
        const handleFirstNameClick = () => {
          navigate(`/dashboard/policy/view/${params.id}`)
        };

        return (
          <Box onClick={handleFirstNameClick}>
            {params.value}
          </Box>
        );
      }
    },
    {
      field: "policyType",
      headerName: "Policy Type",
      flex: 1,
    },
    {
      field: "policyStartDate",
      headerName: "Policy start date",
      flex: 1,
      valueFormatter: (params) => {
        const date = new Date(params.value);
        return date.toDateString();
      },
    },
    {
      field: "policyEndDate",
      headerName: "Policy end date",
      flex: 1,
      valueFormatter: (params) => {
        const date = new Date(params.value);
        return date.toDateString();
      },
    },
    {
      field: "policyStatus",
      headerName: "Policy status",
      flex: 1,
    }
  ];


  return (
    <div>

      {/* Add Claim */}
      <AddPolicy open={openAdd} handleClose={handleCloseAdd} _id={_id} setUserAction={setUserAction} />

      <Box style={{ cursor: "pointer" }} p={2}>
        <Grid container display="flex" alignItems="center">
          <Stack direction="row" alignItems="center" justifyContent={"space-between"} width={"100%"}>
            <Stack direction="row" spacing={1} alignItems={"center"}>
              <Button
                onClick={toggleVisibilityPolicy}
                color="secondary"
                variant="contained"
                sx={{ width: "28px", minWidth: "0px", padding: "0px", height: "25px" }}
              >
                {isVisiblePolicy ? <RemoveIcon /> : <AddIcon />}
              </Button>
              <PolicyIcon />
              <Typography variant="h5">Policy</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent={"flex-end"} spacing={2}>
              {isVisiblePolicy && (
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  startIcon={<AddIcon />}
                  onClick={handleOpenAdd}
                >
                  Create Policy
                </Button>
              )}
            </Stack>
          </Stack>
        </Grid>
      </Box >
      {
        isVisiblePolicy &&
        <TableStyleTwo>
          <Box width="100%" height="30vh">
            <DataGrid
              rows={rows}
              columns={columns}
              getRowId={row => row._id}
              columnHeaderHeight={40}
            />
          </Box>
        </TableStyleTwo>
      }
    </div >
  );
};

export default Policy;
