/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Container, Grid, Stack, Tab, Tabs } from '@mui/material'
import React, { useEffect, useState } from 'react'
// eslint-disable-next-line import/no-unresolved
import Actionbutton from 'src/components/Actionbutton'
// eslint-isable-next-line import/no-unresolved
// eslint-disable-next-line arrow-body-style
import { useNavigate, useParams } from 'react-router-dom';
import Editcalls from '../../components/call/Editcalls';
import Overview from './Overview';
import Other from './Other';
import DeleteModel from '../../components/Deletemodle'
// eslint-disable-next-line arrow-body-style
import { apidelete, apiget } from '../../service/api';
import Header from '../../components/Header';
import { CustomTabPanel, a11yProps } from '../../components/CustomTabPanel';

const View = () => {

    const [callData, setCallData] = useState({});
    const [openEdit, setOpenEdit] = useState(false);
    const [opendelete, setOpendelete] = useState(false);
    const [value, setValue] = useState(0);

    const navigate = useNavigate()
    const params = useParams()

    // open Edit model
    const handleOpenEdit = () => setOpenEdit(true);
    const handleCloseEdit = () => setOpenEdit(false);

    // open delete model
    const handleOpenDelete = () => setOpendelete(true);
    const handleCloseDelete = () => setOpendelete(false);

    // tab
    const handleChange = (event, newValue) => setValue(newValue);



    const back = () => {
        navigate('/dashboard/call')
    }

    // fetch api
    const fetchdata = async () => {
        const result = await apiget(`call/view/${params.id}`)
        if (result && result.status === 200) {
            setCallData(result?.data?.calls)
        }
    }

    // delete api
    const deletedata = async () => {
        await apidelete(`call/delete/${params.id}`)
        navigate('/dashboard/call')
    }


    useEffect(() => {
        fetchdata();
    }, [])

    return (
        <div>
            {/* open Edit Model */}
            <Editcalls open={openEdit} handleClose={handleCloseEdit} id={params.id} fetchcalls={fetchdata} />

            {/* open Delete Model */}
            <DeleteModel opendelete={opendelete} handleClosedelete={handleCloseDelete} deletedata={deletedata} id={params.id} />

            <Container>
                <Grid container display="flex" alignItems="center">
                    <Stack direction="row" alignItems="center" mb={3} justifyContent={"space-between"} width={"100%"}>
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
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: "0px" }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="OVERVIEW" {...a11yProps(0)} />
                            <Tab label="OTHER" {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                        <Overview data={callData} />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <Other data={callData} />
                    </CustomTabPanel>
                </Box>
            </Container>
        </div >
    )
}

export default View
