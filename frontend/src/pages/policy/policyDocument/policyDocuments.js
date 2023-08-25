/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { useEffect, useState } from 'react';
// @mui
import { Card, Stack, Button, Container, Typography, Box, Grid } from '@mui/material';
// components
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import AttachmentIcon from '@mui/icons-material/Attachment';
import Iconify from '../../../components/iconify';
// sections
import AddDocument from './Add'
import { apidelete, apiget } from '../../../service/api';
import TableStyleTwo from '../../../components/TableStyleTwo';
import { constant } from '../../../constant';
// ----------------------------------------------------------------------

const PolicyDocumentPage = ({ rows, toggleVisibilityPolicyDoc, isVisiblePolicyDoc, setUserAction, _id }) => {

    const [openAdd, setOpenAdd] = useState(false);
    const handleOpenAdd = () => setOpenAdd(true);
    const handleCloseAdd = () => setOpenAdd(false);

    const downloadFile = async (id) => {
        const result = await apiget(`policydocument/file/${id}`)
        setUserAction(result)
    }

    const deleteFile = async (id) => {
        const result = await apidelete(`policydocument/delete/${id}`)
        setUserAction(result)
    }


    const columns = [
        {
            field: "file",
            headerName: "File",
            flex: 1,
        },

        {
            field: "fileName",
            headerName: "File Name",
            flex: 1,
            cellClassName: "name-column--cell--capitalize" 
        },
        {
            field: "createdOn",
            headerName: "CreateOn",
            flex: 1,
            valueFormatter: (params) => {
                const date = new Date(params.value);
                return date.toDateString();
            },

        },
        {
            field: "action",
            headerName: "Action",
            flex: 1,
            renderCell: (params) => {
                const handleFirstNameClick = async () => { downloadFile(params.row._id) };
                const downloadUrl = `${constant.baseUrl}policydocument/file/${params.row._id}`;

                return (
                    <Box onClick={handleFirstNameClick}>
                        <Stack direction={"row"} spacing={2}>
                            <a href={downloadUrl}><Button variant='contained' size='small'>Download</Button></a>
                            <Button variant='outlined' size='small' color='error' onClick={() => deleteFile(params.row._id)}>Delete</Button>
                        </Stack>
                    </Box>
                );
            }
        },

    ];

    return (
        <>
            {/* Add Document Model */}
            <AddDocument open={openAdd} handleClose={handleCloseAdd} setUserAction={setUserAction} _id={_id} />

            <Box p={2} style={{ cursor: "pointer" }}>
                <Grid container display="flex" alignItems="center">
                    <Stack direction="row" alignItems="center" justifyContent={"space-between"} width={"100%"}>
                        <Stack direction="row" spacing={1} alignItems={"center"}>
                            <Button
                                onClick={toggleVisibilityPolicyDoc}
                                color="secondary"
                                variant="contained"
                                sx={{ width: "28px", minWidth: "0px", padding: "0px", height: "25px" }}
                            >
                                {isVisiblePolicyDoc ? <RemoveIcon /> : <AddIcon />}
                            </Button>
                            <AttachmentIcon />
                            <Typography variant="h5">Policy Documents</Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center" justifyContent={"flex-end"} spacing={2}>
                            {isVisiblePolicyDoc && (
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    size="small"
                                    startIcon={<AddIcon />}
                                    onClick={handleOpenAdd}
                                >
                                    Add Document
                                </Button>
                            )}
                        </Stack>
                    </Stack>
                </Grid>
            </Box>
            {
                isVisiblePolicyDoc &&
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
        </>
    );
}

export default PolicyDocumentPage