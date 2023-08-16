import { useEffect, useState } from 'react';
// @mui
import { Card, Stack, Button, Container, Typography, Box } from '@mui/material';
// components
import { useNavigate } from 'react-router-dom';
import { DataGrid, GridToolbar, GridToolbarContainer } from '@mui/x-data-grid';
import { DeleteOutline } from '@mui/icons-material';
// sections
// mock
import { apiget, deleteManyApi } from '../../../service/api';
import DeleteModel from '../../../components/Deletemodle'
import TableStyle from '../../../components/TableStyle';
// ----------------------------------------------------------------------
function CustomToolbar({ selectedRowIds, fetchdata }) {
  const [opendelete, setOpendelete] = useState(false);

  const handleCloseDelete = () => setOpendelete(false);
  const handleOpenDelete = () => setOpendelete(true);



  const deleteManyMettings = async (data) => {
    await deleteManyApi('meeting/deletemany', data)
    fetchdata();
    handleCloseDelete();
  }

  return (
    <GridToolbarContainer>
      <GridToolbar />
      {selectedRowIds && selectedRowIds.length > 0 && <Button variant="text" sx={{ textTransform: 'capitalize' }} startIcon={<DeleteOutline />} onClick={handleOpenDelete}>Delete</Button>}
      <DeleteModel opendelete={opendelete} handleClosedelete={handleCloseDelete} deletedata={deleteManyMettings} id={selectedRowIds} />
    </GridToolbarContainer>
  );
}

const Meeting = () => {
  const [allMeeting, setAllMeeting] = useState([]);
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const navigate = useNavigate()

  const userid = localStorage.getItem('user_id');
  const userRole = localStorage.getItem("userRole")

  const handleSelectionChange = (selectionModel) => {
    setSelectedRowIds(selectionModel);
  };


  const columns = [
    {
      field: "meetingAgenda",
      headerName: "Meeting Agenda",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: (params) => {
        const handleFirstNameClick = () => {
          navigate(`/dashboard/history/meeting/view/${params.row._id}`)
        };

        return (
          <Box onClick={handleFirstNameClick}>
            {params.value}
          </Box>
        );
      }
    },
    {
      field: "meetingAttendes",
      headerName: "Meeting Attendes",
      flex: 1,
    },
    {
      field: "meetingDateTime",
      headerName: "Meeting Date/Time",
      flex: 1,
      valueFormatter: (params) => {
        const date = new Date(params.value);
        return date.toLocaleString();
      },
    },
    {
      field: "meetingLocation",
      headerName: "Meeting Location",
      flex: 1,
    }
  ];

  const fetchdata = async () => {
    const result = await apiget(userRole === "admin" ? `meeting/list` : `meeting/list/?createdBy=${userid}`)
    if (result && result.status === 200) {
      setAllMeeting(result?.data?.result)
    }
  }
  useEffect(() => {
    fetchdata();
  }, [])

  return (
    <>
      <Box>
        <TableStyle>
          <Box width="100%">
            <Card style={{ height: "600px", paddingTop: "15px" }}>
              <DataGrid
                rows={allMeeting}
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
      </Box>
    </>
  );
}

export default Meeting