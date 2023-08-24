/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useState } from 'react';
// @mui
import { Card, Stack, Container, Typography, Box, Button } from '@mui/material';
// components
import { useNavigate } from 'react-router-dom';
import { DataGrid, GridToolbar, GridToolbarContainer } from '@mui/x-data-grid';
// sections
// mock
import { DeleteOutline } from '@mui/icons-material';
import DeleteModel from '../../components/Deletemodle'
import { apiget, deleteManyApi } from '../../service/api';
import TableStyle from '../../components/TableStyle';
import Iconify from '../../components/iconify/Iconify';
// ----------------------------------------------------------------------

function CustomToolbar({ selectedRowIds, fetchdata }) {
    const [opendelete, setOpendelete] = useState(false);

    // open DeleteModel
    const handleCloseDelete = () => setOpendelete(false);
    const handleOpenDelete = () => setOpendelete(true);

    const deleteManyCalls = async (data) => {
        await deleteManyApi('email/deletemany', data)
        fetchdata();
        handleCloseDelete();
    }

    return (
        <GridToolbarContainer>
            <GridToolbar />
            {selectedRowIds && selectedRowIds.length > 0 && <Button variant="text" sx={{ textTransform: 'capitalize' }} startIcon={<DeleteOutline />} onClick={handleOpenDelete}>Delete</Button>}
            <DeleteModel opendelete={opendelete} handleClosedelete={handleCloseDelete} deletedata={deleteManyCalls} id={selectedRowIds} />
        </GridToolbarContainer>
    );
}

const Email = () => {
    // eslint-disable-next-line no-unused-vars
    const [userAction, setUserAction] = useState(null);
    const [emailList, setEmailList] = useState([]);
    const [selectedRowIds, setSelectedRowIds] = useState([]);

    const navigate = useNavigate()

    const userid = localStorage.getItem('user_id');
    const userRole = localStorage.getItem("userRole")

    const handleSelectionChange = (selectionModel) => {
        setSelectedRowIds(selectionModel);
    };

    const columns = [
        {
            field: "subject",
            headerName: "Subject",
            flex: 1,
            cellClassName: "name-column--cell",
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
        },
        {
            field: "createdBy",
            headerName: "Created By",
            flex: 1,
            cellClassName: "name-column--cell",
            renderCell: (params) => {
                const handleFirstNameClick = () => {
                    navigate(`/dashboard/user/view/${params?.row?.createdBy?._id}`)
                };
                return (
                    <Box onClick={handleFirstNameClick}>
                        {`${params.row.createdBy.firstName} ${params.row.createdBy.lastName}`}
                    </Box>
                );
            }
        }
    ];

    const fetchdata = async () => {
        const result = await apiget(userRole === "admin" ? `email/list` : `email/list/?createdBy=${userid}`)
        if (result && result.status === 200) {
            setEmailList(result?.data?.result)
        }
    }

    useEffect(() => {
        fetchdata();
    }, [userAction])
    return (
        <>
            <Container>
                <TableStyle>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                        <Typography variant="h4">
                            Emails List
                        </Typography>
                        <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} >
                            New Email
                        </Button>
                    </Stack>
                    <Box width="100%">
                        <Card style={{ height: "600px", paddingTop: "15px" }}>
                            <DataGrid
                                rows={emailList}
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

export default Email