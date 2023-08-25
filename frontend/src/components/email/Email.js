/* eslint-disable react/prop-types */
import { Box, Button, Grid, Stack, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React, { useState } from 'react'
import EmailIcon from "@mui/icons-material/Email";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from 'react-router-dom';
import Addemail from './Addemail';
import TableStyleTwo from '../TableStyleTwo';

const Emails = ({ rows, toggleVisibilityEmail, isVisibleEmail, _id, setUserAction, data }) => {

  const [openEmail, setOpenNote] = useState(false);
  const navigate = useNavigate();

  // open note model
  const handleOpenEmail = () => setOpenNote(true);
  const handleCloseEmail = () => setOpenNote(false);


  const columns = [
    {
      field: "subject",
      headerName: "Subject",
      flex: 1,
      cellClassName: "name-column--cell name-column--cell--capitalize",
      renderCell: (params) => {
        const handleFirstNameClick = () => {
          navigate(`/dashboard/email/view/${params.row._id}`)
        };

        return (
          <Box onClick={handleFirstNameClick}>
            {params.value}
          </Box>
        );
      }
    },
    {
      field: "sender",
      headerName: "Sender",
      flex: 1,
    },
    {
      field: "receiver",
      headerName: "Receiver",
      flex: 1,
    }
  ];

  return (
    <div>
      {/* Add email */}
      <Addemail open={openEmail} handleClose={handleCloseEmail} _id={_id} setUserAction={setUserAction} receiver={data} />

      <Box
        style={{ cursor: "pointer" }}
        p={2}
      >
        <Grid container display="flex" alignItems="center">
          <Stack direction="row" alignItems="center" justifyContent={"space-between"} width={"100%"}>
            <Stack direction="row" spacing={1} alignItems={"center"}>
              <Button
                onClick={toggleVisibilityEmail}
                color="secondary"
                variant="contained"
                sx={{ width: "28px", minWidth: "0px", padding: "0px", height: "25px" }}
              >
                {isVisibleEmail ? <RemoveIcon /> : <AddIcon />}
              </Button>
              <EmailIcon />
              <Typography variant="h5">Emails</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent={"flex-end"} spacing={2}>
              {isVisibleEmail && (
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  startIcon={<AddIcon />}
                  onClick={handleOpenEmail}
                >
                  Create Email
                </Button>
              )}
            </Stack>
          </Stack>
        </Grid>
      </Box>
      {isVisibleEmail &&
        <TableStyleTwo>
          <Box width="100%" height="30vh">
            <DataGrid
              rows={rows}
              columns={columns}
              columnHeaderHeight={40}
              getRowId={row => row._id}

            />
          </Box>
        </TableStyleTwo>
      }

    </div>
  )
}

export default Emails
