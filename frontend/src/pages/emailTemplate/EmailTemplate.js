import { Box, Button, Card, Container, Stack, Typography } from '@mui/material';
import { DataGrid, nbNO } from '@mui/x-data-grid';
import React from 'react'
import { Link } from 'react-router-dom';
import TableStyle from '../../components/TableStyle';
import Iconify from '../../components/iconify/Iconify';

const EmailTemplate = () => {
    const columns = [
        {
            field: "firstName",
            headerName: "Template Name",
            flex: 1,
            cellClassName: "name-column--cell name-column--cell--capitalize"
        },
        { field: "lastName", headerName: "Last Name", flex: 1, cellClassName: "name-column--cell--capitalize" },
        { field: "gender", headerName: "Gender", flex: 1 },
        { field: "phoneNumber", headerName: "Phone Number", flex: 1 },
        { field: "emailAddress", headerName: "Email Address", flex: 1 },
    ];
    return (
        <div>
            <Container>
                <TableStyle>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                        <Typography variant="h4">
                            Email Template List
                        </Typography>
                        <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} >
                            <Link to="/dashboard/emailtemplate/add" style={{textDecoration:"none",color:"white"}}>New Template</Link>
                        </Button>
                    </Stack>
                    <Box width="100%">
                        <Card style={{ height: "600px", paddingTop: "15px" }}>
                            <DataGrid
                                rows={nbNO}
                                columns={columns}
                                // components={{ Toolbar: () => CustomToolbar({ selectedRowIds, fetchdata }) }}
                                checkboxSelection
                                // onRowSelectionModelChange={handleSelectionChange}
                                // rowSelectionModel={selectedRowIds}
                                getRowId={row => row._id}
                            />
                        </Card>
                    </Box>
                </TableStyle>
            </Container>
        </div>
    )
}

export default EmailTemplate
