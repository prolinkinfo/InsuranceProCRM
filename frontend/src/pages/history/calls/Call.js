import { useEffect, useState } from 'react';
// @mui
import { Card, Button, Box } from '@mui/material';
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
const CustomToolbar = ({ selectedRowIds, fetchdata }) => {
  const [opendelete, setOpendelete] = useState(false);

  // open DeleteModel
  const handleCloseDelete = () => setOpendelete(false);
  const handleOpenDelete = () => setOpendelete(true);

  const deleteManyCalls = async (data) => {
    await deleteManyApi('call/deletemany', data)
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

const Call = () => {
  const [allCall, setAllCall] = useState([]);
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const navigate = useNavigate()

  const userid = localStorage.getItem('user_id');
  const userRole = localStorage.getItem("userRole")

  const handleSelectionChange = (selectionModel) => {
    setSelectedRowIds(selectionModel);
  };

  const columns = [
    {
      field: "callType",
      headerName: "Call Type",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: (params) => {
        const handleFirstNameClick = () => {
          navigate(`/dashboard/history/call/view/${params.row._id}`)
        };

        return (
          <Box onClick={handleFirstNameClick}>
            {params.value}
          </Box>
        );
      }
    },
    {
      field: "callDuration",
      headerName: "Call Duration",
      flex: 1,
    },
    {
      field: "callDateTime",
      headerName: "Call Date/Time",
      flex: 1,
      valueFormatter: (params) => {
        const date = new Date(params.value);
        return date.toLocaleString();
      },
    }
  ];

  const fetchdata = async () => {
    const result = await apiget(userRole === "admin" ? `call/list` : `call/list/?createdBy=${userid}`)
    if (result && result.status === 200) {
      setAllCall(result?.data?.result)
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
                rows={allCall}
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

export default Call