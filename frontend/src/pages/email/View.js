/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Container, Grid, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
// eslint-disable-next-line import/no-unresolved
import Actionbutton from 'src/components/Actionbutton'
import Typography from '@mui/material/Typography'

// eslint-disable-next-line import/no-unresolved
import Card from '@mui/material/Card';

// eslint-disable-next-line arrow-body-style

import { useNavigate, useParams } from 'react-router-dom';

import DeleteModel from '../../components/Deletemodle'
import Overview from './Overview';

// eslint-disable-next-line arrow-body-style
import { apidelete, apiget } from '../../service/api';
import Header from '../../components/Header';


const View = () => {
    const [emailData, setEmailData] = useState({});
    const [opendelete, setOpendelete] = useState(false);
    const navigate = useNavigate()
    const params = useParams()
    

    // open delete model
    const handleOpenDelete = () => setOpendelete(true);
    const handleCloseDelete = () => setOpendelete(false);

    
    const back = () => {
        navigate('/dashboard/email')
    }


    // fetch api
    const fetchdata = async () => {
        const result = await apiget(`email/view/${params.id}`)
        if (result && result.status === 200) {
            setEmailData(result?.data?.emails)
        }
    }

    // delete api
    const deletedata = async () => {
        await apidelete(`email/delete/${params.id}`)
        navigate('/dashboard/email')
    }


    useEffect(() => {
        fetchdata();
    }, [])


    return (
        <div>


            {/* open Delete Model */}
            <DeleteModel opendelete={opendelete} handleClosedelete={handleCloseDelete}  id={params.id} deletedata={deletedata}/>

            <Container>
                <Grid container display="flex" alignItems="center">
                    <Grid container display="flex" alignItems="center">
                        <Stack direction="row" alignItems="center" mb={3} justifyContent={"space-between"} width={"100%"}>
                            <Header
                                title="Email Details"
                            />
                            <Stack direction="row" alignItems="center" justifyContent={"flex-end"} spacing={2}>
                                {/* Action Butoon */}
                                <Actionbutton
                                    handleOpenDelete={handleOpenDelete}
                                    back={back}
                                />
                            </Stack>
                        </Stack>
                    </Grid>
                </Grid>

                {/* OVERVIEW  */}
                <Card>
                    <Box p={1}>
                        <Stack direction={'row'} spacing={1} display={"flex"} alignItems={"center"} >
                            <Typography variant="h5">OVERVIEW</Typography>
                        </Stack>
                    </Box>
                 <Overview data={emailData} />
                </Card>

            </Container>

        </div >
    )
}

export default View
