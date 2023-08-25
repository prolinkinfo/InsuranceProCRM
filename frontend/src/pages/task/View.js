/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Container, Grid, Stack, Tab, Tabs } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Actionbutton from '../../components/Actionbutton'
import DeleteModel from '../../components/Deletemodle'
import Overview from './Overview';
import Other from './Other';
import ViewEdit from '../../components/task/Edit';
import { apidelete, apiget } from '../../service/api';
import Header from '../../components/Header';
import { CustomTabPanel, a11yProps } from '../../components/CustomTabPanel';

const View = () => {
    const [taskData, setTaskData] = useState({});
    const [userAction, setUserAction] = useState(null);
    const [openEdit, setOpenEdit] = useState(false);
    const [opendelete, setOpendelete] = useState(false);
    const [value, setValue] = useState(0);

    const params = useParams()
    const navigate = useNavigate()

    // open Edit model
    const handleOpenEdit = () => setOpenEdit(true);
    const handleCloseEdit = () => setOpenEdit(false);

    // open delete model
    const handleOpenDelete = () => setOpendelete(true);
    const handleCloseDelete = () => setOpendelete(false);

    // tab
    const handleChange = (event, newValue) => setValue(newValue);

    const back = () => {
        navigate('/dashboard/task')
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
        navigate('/dashboard/task')
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
                    <Stack direction="row" alignItems="center" mb={3} justifyContent={"space-between"} width={"100%"}>
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

                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: "0px" }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="OVERVIEW" {...a11yProps(0)} />
                            <Tab label="OTHER" {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                        <Overview data={taskData} setUserAction={setUserAction} />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <Other data={taskData} />
                    </CustomTabPanel>
                </Box>
               
            </Container>


        </div >
    )
}

export default View
