/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import GroupsIcon from "@mui/icons-material/Groups";
import Addmeetings from './Addmeetings';
import TableStyleTwo from '../TableStyleTwo';

const Meetings = ({ rows, style, toggleVisibilityMeeting, isVisibleMeetings, _id, setUserAction, data }) => {
  const [openMeeting, setOpenMeeting] = useState(false);
  const navigate = useNavigate();
  
  // open Meeting model
  const handleOpenMeeting = () => setOpenMeeting(true);
  const handleCloseMeeting = () => setOpenMeeting(false);


  const columns = [
    {
      field: "subject",
      headerName: "Subject",
      flex: 1,
      cellClassName: "name-column--cell name-column--cell--capitalize",
      renderCell: (params) => {
        const handleFirstNameClick = () => {
          navigate(`/dashboard/meeting/view/${params.row._id}`)
        };

        return (
          <Box onClick={handleFirstNameClick}>
            {params.value}
          </Box>
        );
      }
    },
    {
      field: "startDate",
      headerName: "Start Date",
      flex: 1,
      valueFormatter: (params) => {
        const date = new Date(params.value);
        return date.toLocaleString();
      },
    },
    {
      field: "endDate",
      headerName: "End Date",
      flex: 1,
      valueFormatter: (params) => {
        const date = new Date(params.value);
        return date.toLocaleString();
      },
    },
    {
      field: "duration",
      headerName: "Duration",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
    }
  ];

  return (
    <div>
      {/* Add Meeting */}
      <Addmeetings open={openMeeting} handleClose={handleCloseMeeting} _id={_id} data={data} setUserAction={setUserAction} />

      <Box style={{ cursor: "pointer" }} p={2}>
        <Grid container display="flex" alignItems="center">
          <Stack direction="row" alignItems="center" justifyContent={"space-between"} width={"100%"}>
            <Stack direction="row" spacing={1} alignItems={"center"}>
              <Button
                onClick={toggleVisibilityMeeting}
                color="secondary"
                variant="contained"
                sx={{ width: "28px", minWidth: "0px", padding: "0px", height: "25px" }}
              >
                {isVisibleMeetings ? <RemoveIcon /> : <AddIcon />}
              </Button>
              <GroupsIcon />
              <Typography variant="h5">Meetings</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent={"flex-end"} spacing={2}>
              {isVisibleMeetings && (
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  startIcon={<AddIcon />}
                  onClick={handleOpenMeeting}
                >
                  Create Meeting
                </Button>
              )}
            </Stack>
          </Stack>
        </Grid>
      </Box>
      {
        isVisibleMeetings &&
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
    </div>
  )
}

export default Meetings
