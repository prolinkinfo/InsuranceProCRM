/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useState } from 'react';
// @mui
import { Card, Stack, Button, Container, Typography, Box } from '@mui/material';
// components
import { useNavigate } from 'react-router-dom';
import { DataGrid, GridToolbar, GridToolbarContainer } from '@mui/x-data-grid';
import { DeleteOutline } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import Iconify from '../../components/iconify';
// sections
// mock
import AddLead from './Add'
import { apiget, deleteManyApi } from '../../service/api';
import DeleteModel from '../../components/Deletemodle'
import TableStyle from '../../components/TableStyle'
import EditModel from './Edit'
// ----------------------------------------------------------------------

function CustomToolbar({ selectedRowIds, fetchdata }) {
  const [opendelete, setOpendelete] = useState(false);
  const [userAction, setUserAction] = useState(null);

  const handleCloseDelete = () => setOpendelete(false)

  const handleOpenDelete = () => setOpendelete(true)

  const deleteManyLead = async (data) => {
    const result = await deleteManyApi('lead/deletemany', data)
    fetchdata()
    setUserAction(result)
    handleCloseDelete();
  }

  useEffect(() => {
    setUserAction(userAction)
  }, [userAction])

  return (
    <GridToolbarContainer>
      <GridToolbar />
      {selectedRowIds && selectedRowIds.length > 0 && <Button variant="text" sx={{ textTransform: 'capitalize' }} startIcon={<DeleteOutline />} onClick={handleOpenDelete}>Delete</Button>}
      <DeleteModel opendelete={opendelete} handleClosedelete={handleCloseDelete} deletedata={deleteManyLead} id={selectedRowIds} />
    </GridToolbarContainer>
  );
}

const Lead = () => {


  const [userAction, setUserAction] = useState(null);
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [leadData, setLeadData] = useState([]);
  const [id, setId] = useState('')
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const navigate = useNavigate()

  const userid = localStorage.getItem('user_id');
  const userRole = localStorage.getItem("userRole");

  // open edit model
  const handleOpenEdit = () => setOpenEdit(true);;
  const handleCloseEdit = () => setOpenEdit(false);

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);



  const columns = [
    {
      field: "firstName",
      headerName: "Frist Name",
      flex: 1,
      cellClassName: "name-column--cell name-column--cell--capitalize",
      renderCell: (params) => {
        const handleFirstNameClick = () => {
          navigate(`/dashboard/lead/view/${params.row._id}`)
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
      flex: 1,
      cellClassName:"name-column--cell--capitalize",
    },
    {
      field: "gender",
      headerName: "Gender",
      flex: 1,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "emailAddress",
      headerName: "Email Address",
      flex: 1,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      // eslint-disable-next-line arrow-body-style
      renderCell: (params) => {
        const handleFirstNameClick = async (data) => {
          setId(data)
          handleOpenEdit();
        };
        return (
          <>
            <EditModel open={openEdit} handleClose={handleCloseEdit} id={id} fetchLead={fetchdata} />
            <Button variant='text' size='small' color='primary' onClick={() => handleFirstNameClick(params?.row?._id)}><EditIcon /></Button>
          </>
        );
      }
    },
  ];


  const fetchdata = async () => {
    const result = await apiget(userRole === "admin" ? `lead/list` : `lead/list/?createdBy=${userid}`)
    if (result && result.status === 200) {
      setLeadData(result?.data?.result)
    }
  }

  const handleSelectionChange = (selectionModel) => {
    setSelectedRowIds(selectionModel);
  };


  useEffect(() => {
    fetchdata();
  }, [openAdd, userAction])
  return (
    <>
      {/* Add Lead Model */}
      <AddLead open={openAdd} handleClose={handleCloseAdd} setUserAction={setUserAction} />


      <Container>
        <Stack direction="row" alignItems="center" mb={5} justifyContent={"space-between"}>
          <Typography variant="h4" >
            Lead
          </Typography>
          <Stack direction="row" alignItems="center" justifyContent={"flex-end"} spacing={2}>
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd}>
              New Lead
            </Button>
          </Stack>
        </Stack>
        <TableStyle>
          <Box width="100%">
            <Card style={{ height: "600px", paddingTop: "15px" }}>
              <DataGrid
                rows={leadData}
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
      </Container >
    </>
  );
}

export default Lead