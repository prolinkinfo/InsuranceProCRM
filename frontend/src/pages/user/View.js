/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Card, Container, Grid, Stack, Typography } from '@mui/material';
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

const View = () => {

    const [userDetails, setUserDetails] = useState({});
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [opendelete, setOpendelete] = useState(false);
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
                    <Stack direction="row" alignItems="center" mb={5} justifyContent={"space-between"} width={"100%"}>
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

                {/* OVERVIEW  */}
                <Card>
                    <Box style={{ cursor: "pointer" }} p={1}>
                        <Typography variant="h5">OVERVIEW</Typography>
                    </Box>
                    <Box mt="0px" style={{ borderTop: "1px solid", borderTopColor: Palette.grey[400] }} p={3}>
                        <Grid container display="flex" spacing={4}>
                            <Grid item xs={12} sm={6}>
                                <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} pb={2}>
                                    <Typography variant="body1">First Name :</Typography>
                                    <Typography variant="body2" color={Palette.grey[600]} style={{textTransform:"capitalize"}}>{userDetails?.firstName ? userDetails?.firstName : "---"}</Typography>
                                </Grid>
                                <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
                                    <Typography variant="body1">Email :</Typography>
                                    <Typography variant="body2" color={Palette.grey[600]}>{userDetails?.emailAddress ? userDetails?.emailAddress : "---"}</Typography>
                                </Grid>
                                <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
                                    <Typography variant="body1">CreatedOn :</Typography>
                                    <Typography variant="body2" color={Palette.grey[600]}>
                                        {moment(userDetails?.createdOn).format('lll')}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} pb={2}>
                                    <Typography variant="body1">Last Name :</Typography>
                                    <Typography variant="body2" color={Palette.grey[600]} style={{textTransform:"capitalize"}}>{userDetails?.lastName ? userDetails?.lastName : "---"}</Typography>
                                </Grid>
                                <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
                                    <Typography variant="body1">Role :</Typography>
                                    <Typography variant="body2" color={Palette.grey[600]} style={{textTransform:"capitalize"}}>{userDetails?.role ? userDetails?.role : "---"}</Typography>
                                </Grid>
                                <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
                                    <Typography variant="body1">ModifiedOn :</Typography>
                                    <Typography variant="body2" color={Palette.grey[600]}>
                                        {moment(userDetails?.modifiedOn).format('lll')}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                </Card>
            </Container>
        </div>
    )
}

export default View
