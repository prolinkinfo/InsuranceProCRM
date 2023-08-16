/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, Container, Grid, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
// eslint-disable-next-line import/no-unresolved
import Actionbutton from 'src/components/Actionbutton'
import Typography from '@mui/material/Typography'
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

// eslint-disable-next-line import/no-unresolved
import Card from '@mui/material/Card';

// eslint-disable-next-line arrow-body-style

import { useNavigate, useParams } from 'react-router-dom';

import Editmeetings from '../../../components/meeting/Editmeetings';
import DeleteModel from '../../../components/Deletemodle'
import Overview from './Overview';
import Other from './Other';

// eslint-disable-next-line arrow-body-style
import { apidelete, apiget } from '../../../service/api';
import Header from '../../../components/Header';


const View = () => {

    const [meetingData, setMeetingData] = useState({});
    const [openEdit, setOpenEdit] = useState(false);
    const [opendelete, setOpendelete] = useState(false);
    const [isVisibleOverview, setIsVisibleOverview] = useState(true);
    const [isVisibleOther, setIsVisibleOther] = useState(true);
    const navigate = useNavigate()
    const params = useParams()

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
        const result = await apiget(`meeting/view/${params.id}`)
        if (result && result.status === 200) {
            setMeetingData(result?.data?.meetings)
        }
    }

    // delete api
    const deletedata = async () => {
        await apidelete(`meeting/delete/${params.id}`)
        navigate('/dashboard/history')
    }

    useEffect(() => {
        fetchdata();
    }, [openEdit, opendelete])

    return (
        <div>
            {/* open Edit meetings Model */}
            <Editmeetings open={openEdit} handleClose={handleCloseEdit} id={params.id} fetchMeeting={fetchdata} />

            {/* open Delete mode */}
            <DeleteModel opendelete={opendelete} handleClosedelete={handleCloseDelete} deletedata={deletedata} id={params.id} />

            <Container>
                <Grid container display="flex" alignItems="center">
                    <Stack direction="row" alignItems="center" mb={5} justifyContent={"space-between"} width={"100%"}>
                        <Header
                            title="Call Details"
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
                            <Typography variant="h5" >OVERVIEW</Typography>
                        </Stack>
                    </Box>
                    {isVisibleOverview && <Overview data={meetingData} />}
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
                            <Typography variant="h5" >Other</Typography>
                        </Stack>
                    </Box>
                    {isVisibleOther && <Other data={meetingData} />}
                </Card>
            </Container>


        </div >
    )
}

export default View
