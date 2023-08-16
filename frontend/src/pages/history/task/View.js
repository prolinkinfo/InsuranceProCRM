/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, Container, Grid, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography'
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import Card from '@mui/material/Card';
import { useNavigate, useParams } from 'react-router-dom';
import Actionbutton from '../../../components/Actionbutton'
import DeleteModel from '../../../components/Deletemodle'
import Overview from './Overview';
import Other from './Other';
import ViewEdit from '../../../components/event/ViewEdit';
import { apidelete, apiget } from '../../../service/api';
import Header from '../../../components/Header';


const View = () => {
    const [taskData, setTaskData] = useState({});
    const [userAction, setUserAction] = useState(null);
    const [openEdit, setOpenEdit] = useState(false);
    const [opendelete, setOpendelete] = useState(false);
    const [isVisibleOverview, setIsVisibleOverview] = useState(true);
    const [isVisibleOther, setIsVisibleOther] = useState(true);
    const params = useParams()
    const navigate = useNavigate()

    // open Edit model
    const handleOpenEdit = () => setOpenEdit(true);
    const handleCloseEdit = () => setOpenEdit(false);

    // open delete model
    const handleOpenDelete = () => setOpendelete(true);
    const handleCloseDelete = () => setOpendelete(false);

    // toggleButton
    const toggleVisibilityOverview = () => setIsVisibleOverview(!isVisibleOverview);
    const toggleVisibilityOther = () => setIsVisibleOther(!isVisibleOther);


    const back = () => {
        navigate('/dashboard/history')
    }


    // fetch api
    const fetchdata = async () => {
        const result = await apiget(`task/view/${params.id}`)
        if (result && result.status === 200) {
            setTaskData(result?.data?.tasks)
        }
    }

    // delete api
    const deletedata = async () => {
        await apidelete(`task/delete/${params.id}`)
        navigate('/dashboard/history')
    }

    useEffect(() => {
        fetchdata();
    }, [userAction])

    return (
        <div>
            {/* open Edit tasks model */}
            <ViewEdit open={openEdit} handleClose={handleCloseEdit} id={params.id} lead='lead' contact='contact' setUserAction={setUserAction} />

            {/* open Delete Model */}
            <DeleteModel opendelete={opendelete} handleClosedelete={handleCloseDelete} deletedata={deletedata} id={params.id} />

            <Container>
                <Grid container display="flex" alignItems="center">
                    <Stack direction="row" alignItems="center" mb={5} justifyContent={"space-between"} width={"100%"}>
                        <Header
                            title="Task Details"
                        />
                        <Stack direction="row" alignItems="center" justifyContent={"flex-end"} spacing={2}>
                            {/* Action Butoon */}
                            <Actionbutton
                                handleOpenEdit={handleOpenEdit}
                                handleOpenDelete={handleOpenDelete}
                                back={back}
                            />
                        </Stack>
                    </Stack>
                </Grid>
                
                {/* OVERVIEW  */}
                <Card sx={{ marginTop: "50px" }}>
                    <Box
                        style={{
                            // background: Palette.grey[300],
                            cursor: "pointer",
                        }}
                        p={1}
                        onClick={toggleVisibilityOverview}
                    >
                        <Stack direction={'row'} spacing={1} display={"flex"} alignItems={"center"} >
                            <Button
                                onClick={toggleVisibilityOverview}
                                color="secondary"
                                variant="contained"
                                sx={{ width: "28px", minWidth: "0px", padding: "0px", height: "25px" }}
                            >
                                {isVisibleOverview ? <RemoveIcon /> : <AddIcon />}
                            </Button>
                            <Typography variant="h5">OVERVIEW</Typography>
                        </Stack>
                    </Box>
                    {isVisibleOverview && <Overview data={taskData} />}
                </Card>

                {/* OTHER */}
                <Card sx={{ marginTop: "25px" }}>
                    <Box style={{ cursor: "pointer" }}
                        p={1}
                        onClick={toggleVisibilityOther}
                    >
                        <Stack direction={"row"} spacing={1} display={"flex"} alignItems={"center"}>
                            <Button
                                onClick={toggleVisibilityOther}
                                color="secondary"
                                variant="contained"
                                sx={{ width: "28px", minWidth: "0px", padding: "0px", height: "25px" }}
                            >
                                {isVisibleOther ? <RemoveIcon /> : <AddIcon />}
                            </Button>
                            <Typography variant="h5">Other</Typography>
                        </Stack>
                    </Box>
                    {isVisibleOther && <Other data={taskData} />}
                </Card>
            </Container>


        </div >
    )
}

export default View
