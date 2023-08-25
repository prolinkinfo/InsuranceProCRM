/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useState } from 'react';
// @mui
import { Card, Stack, Button, Container, Typography, Box } from '@mui/material';
// components
import { DataGrid, GridToolbar, GridToolbarContainer } from '@mui/x-data-grid';
import { DeleteOutline } from '@mui/icons-material';
import Iconify from '../../components/iconify';
// sections
import AddDocument from './Add'
import { apidelete, apiget, deleteManyApi } from '../../service/api';
import TableStyle from '../../components/TableStyle';
import DeleteModel from '../../components/Deletemodle'
import { constant } from '../../constant';

// ----------------------------------------------------------------------

function CustomToolbar({ selectedRowIds, fetchdata }) {
    const [opendelete, setOpendelete] = useState(false);


    const handleCloseDelete = () => {
        setOpendelete(false)
    }

    const handleOpenDelete = () => {
        setOpendelete(true)
    }

    // delete many api
    const deleteManyContact = async (data) => {
        await deleteManyApi('document/deletemany', data)
        fetchdata()
        handleCloseDelete();
    }

    return (
        <GridToolbarContainer>
            <GridToolbar />
            {selectedRowIds && selectedRowIds.length > 0 && <Button variant="text" sx={{ textTransform: 'capitalize' }} startIcon={<DeleteOutline />} onClick={handleOpenDelete}>Delete</Button>}
            <DeleteModel opendelete={opendelete} handleClosedelete={handleCloseDelete} deletedata={deleteManyContact} id={selectedRowIds} />
        </GridToolbarContainer>
    );
}

const Documents = () => {
    const [userAction, setUserAction] = useState(null);
    const [documentList, setDocumentList] = useState([])
    const [openAdd, setOpenAdd] = useState(false);
    const [selectedRowIds, setSelectedRowIds] = useState([]);

    const userid = localStorage.getItem('user_id');
    const userRole = localStorage.getItem("userRole")

    const handleOpenAdd = () => {
        setOpenAdd(true)
    }
    const handleCloseAdd = () => {
        setOpenAdd(false)
    }

    const handleSelectionChange = (selectionModel) => {
        setSelectedRowIds(selectionModel);
    };

    // file download api
    const downloadFile = async (id) => {
        const result = await apiget(`document/file/${id}`)
        setUserAction(result)
    }

    // file delete api
    const deleteFile = async (id) => {
        const result = await apidelete(`document/delete/${id}`)
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
                const downloadUrl = `${constant.baseUrl}document/file/${params.row._id}`;

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

    // fetch documents list
    const fetchdata = async () => {
        const result = await apiget(userRole === "admin" ? `document/list` : `document/list/?createdBy=${userid}`)
        if (result && result.status === 200) {
            setDocumentList(result?.data?.result)
        }
    }

    useEffect(() => {
        fetchdata();
    }, [userAction])
    return (
        <>
            {/* Add Document Model */}
            <AddDocument open={openAdd} handleClose={handleCloseAdd} setUserAction={setUserAction} />

            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4">
                        Documents
                    </Typography>
                    <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd}>
                        New Document
                    </Button>
                </Stack>
                <TableStyle>
                    <Box width="100%">
                        <Card style={{ height: "600px", paddingTop: "15px" }}>
                            <DataGrid
                                rows={documentList}
                                columns={columns}
                                components={{ Toolbar: () => CustomToolbar({ selectedRowIds, fetchdata }) }}
                                checkboxSelection
                                onRowSelectionModelChange={handleSelectionChange}
                                rowSelectionModel={selectedRowIds}
                                getRowId={row => row._id}
                            />
                        </Card>
                    </Box>
                </TableStyle>
            </Container>
        </>
    );
}

export default Documents