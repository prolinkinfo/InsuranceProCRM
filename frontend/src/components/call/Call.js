/* eslint-disable react/prop-types */
import { Box, Button, Grid, Stack, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import CallIcon from "@mui/icons-material/Call";
import Addcalls from './Addcalls';
import TableStyleTwo from '../TableStyleTwo';

const Call = ({ rows, toggleVisibilityCall, isVisibleCall, _id, setUserAction }) => {
    const [openCall, setOpenCall] = useState(false);
    const navigate = useNavigate();

    // open call model
    const handleOpenCall = () => setOpenCall(true);
    const handleCloseCall = () => setOpenCall(false);

    const columns = [
        {
            field: "subject",
            headerName: "Subject ",
            cellClassName: "name-column--cell name-column--cell--capitalize",
            flex: 1,
            renderCell: (params) => {
                const handleFirstNameClick = () => {
                    navigate(`/dashboard/call/view/${params.row._id}`)
                };
                return (
                    <Box onClick={handleFirstNameClick}>
                        {params.value}
                    </Box>
                );
            }
        },
        {
            field: "startDateTime",
            headerName: "Start Date & Time",
            flex: 1,
            valueFormatter: (params) => {
                const date = new Date(params.value);
                return date.toLocaleString();
            },
        },
        { field: "duration", headerName: "Duration", headerAlign: "left", align: "left", flex: 1 },
        { field: "status", headerName: "Status", headerAlign: "left", align: "left", flex: 1 },


    ];

    return (
        <div>
            {/* Add Calls */}
            <Addcalls open={openCall} handleClose={handleCloseCall} _id={_id} setUserAction={setUserAction} />

            <Box style={{ cursor: "pointer" }} p={2}>
                <Grid container display="flex" alignItems="center">
                    <Stack direction="row" alignItems="center" justifyContent={"space-between"} width={"100%"}>
                        <Stack direction="row" spacing={1} alignItems={"center"}>
                            <Button
                                onClick={toggleVisibilityCall}
                                color="secondary"
                                variant="contained"
                                sx={{ width: "28px", minWidth: "0px", padding: "0px", height: "25px" }}
                            >
                                {isVisibleCall ? <RemoveIcon /> : <AddIcon />}
                            </Button>
                            <CallIcon />
                            <Typography variant="h5">Calls</Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center" justifyContent={"flex-end"} spacing={2}>
                            {isVisibleCall && (
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    size="small"
                                    startIcon={<AddIcon />}
                                    onClick={handleOpenCall}
                                >
                                    Create call
                                </Button>
                            )}
                        </Stack>
                    </Stack>
                </Grid>
            </Box>
            {
                isVisibleCall &&
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

export default Call
