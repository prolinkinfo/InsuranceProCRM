/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Card, Container, Grid, Stack, Tab, Tabs, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment/moment'
import Actionbutton from '../../components/Actionbutton';
import Header from '../../components/Header';
import { apidelete, apiget } from '../../service/api';
import AddUser from './Add'
import EditUser from './Edit'
import DeleteModel from '../../components/Deletemodle'
import Palette from '../../theme/palette'
import { CustomTabPanel, a11yProps } from '../../components/CustomTabPanel';
import Overview from './Overview';
import Other from './Other';

const View = () => {

    const [userDetails, setUserDetails] = useState({});
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [opendelete, setOpendelete] = useState(false);
    const [value, setValue] = useState(0);
    const navigate = useNavigate()
    const params = useParams()

    const userdata = JSON.parse(localStorage.getItem('user'));

    // open add model
    const handleOpenAdd = () => setOpenAdd(true);
    const handleCloseAdd = () => setOpenAdd(false);

    // open Edit model
    const handleOpenEdit = () => setOpenEdit(true);
    const handleCloseEdit = () => setOpenEdit(false);

    // open delete model
    const handleOpenDelete = () => setOpendelete(true);
    const handleCloseDelete = () => setOpendelete(false);

    // tab
    const handleChange = (event, newValue) => setValue(newValue);

    const back = () => {
        navigate('/dashboard/user')
    }

    // fetch api
    const fetchdata = async () => {
        const result = await apiget(`user/view/${params.id}`)
        if (result && result.status === 200) {
            setUserDetails(result.data)
        }
    }

    // delete api
    const deletedata = async () => {
        await apidelete(`user/delete/${params.id}`)
        navigate('/dashboard/user')
    }

    useEffect(() => {
        fetchdata();
    }, [openAdd])


    return (
        <div>

            {/* Add User Model */}
            <AddUser open={openAdd} handleClose={handleCloseAdd} />

            {/* Add Edit Model */}
            <EditUser open={openEdit} handleClose={handleCloseEdit} id={params.id} fetchUser={fetchdata} />

            {/* open Delete Model */}
            <DeleteModel opendelete={opendelete} handleClosedelete={handleCloseDelete} deletedata={deletedata} id={params.id} />

            <Container>
                <Grid container display="flex" alignItems="center">
                    <Stack direction="row" alignItems="center" mb={3} justifyContent={"space-between"} width={"100%"}>
                        <Header
                            title={`${userDetails?.firstName} ${userDetails?.lastName}`}
                            subtitle="Profile Details"
                        />
                        <Stack direction="row" alignItems="center" justifyContent={"flex-end"} spacing={2}>
                            {/* Action Butoon */}
                            {userdata.role === "admin" ?
                                <Actionbutton
                                    handleOpen={handleOpenAdd}
                                    handleOpenEdit={handleOpenEdit}
                                    handleOpenDelete={handleOpenDelete}
                                    back={back}
                                />
                                :
                                <Actionbutton
                                    handleOpenEdit={handleOpenEdit}
                                    handleOpenDelete={handleOpenDelete}
                                    back={back}
                                />
                            }
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
                        <Overview data={userDetails}/>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <Other data={userDetails} />
                    </CustomTabPanel>
                </Box>
            </Container>
        </div>
    )
}

export default View
