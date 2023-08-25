
import { useEffect, useState } from 'react';
import { Card, Stack, Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Iconify from '../../components/iconify';
import AddUser from './Add'
import { apiget } from '../../service/api';
import TableStyle from '../../components/TableStyle';

// ----------------------------------------------------------------------

const User = () => {

    const [allUser, setAllUser] = useState([]);
    const [openAdd, setOpenAdd] = useState(false);
    const navigate = useNavigate()

    const handleOpenAdd = () => setOpenAdd(true);
    const handleCloseAdd = () => setOpenAdd(false);


    const columns = [
        {
            field: "firstName",
            headerName: "First Name",
            flex: 2,
            cellClassName: "name-column--cell name-column--cell--capitalize",
            renderCell: (params) => {
                const handleFirstNameClick = () => {
                    navigate(`/dashboard/user/view/${params.row._id}`)
                };

                return (
                    <Box onClick={handleFirstNameClick}>
                        {params.value}
                    </Box>
                );
            }
        },
        {
            field: "lastName",
            headerName: "Last Name",
            cellClassName:"name-column--cell--capitalize",
            flex: 2,

        },
        {
            field: "emailAddress",
            headerName: "Email Address",
            flex: 2,
        },
        {
            field: "role",
            headerName: "Role",
            cellClassName:"name-column--cell--capitalize",
            flex: 2
        }
    ];

    const fetchdata = async () => {
        const result = await apiget('user/list')
        if (result && result.status === 200) {
            setAllUser(result?.data?.result)
        }
    }
    useEffect(() => {
        fetchdata();
    }, [openAdd])

    return (
        <>
            <AddUser open={openAdd} handleClose={handleCloseAdd} />

            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4">
                        User
                    </Typography>
                    <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd}>
                        New User
                    </Button>
                </Stack>
                <TableStyle>
                    <Box width="100%" >
                        <Card style={{ height: "600px", paddingTop: "15px" }}>
                            <DataGrid
                                rows={allUser}
                                columns={columns}
                                components={{ Toolbar: GridToolbar }}
                                getRowId={row => row._id}
                            />
                        </Card>
                    </Box>
                </TableStyle>
            </Container >
        </>
    );
}

export default User