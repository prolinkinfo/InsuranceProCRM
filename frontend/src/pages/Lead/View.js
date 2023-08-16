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
import Papa from "papaparse";
import dayjs from 'dayjs';
import AddLead from './Add'
import EditModel from './Edit'
import DeleteModel from '../../components/Deletemodle'
import Notes from '../../components/note/Note';
import Calls from '../../components/call/Call';
import Meetings from '../../components/meeting/Meeting';
import Emails from '../../components/email/Email';
import Tasks from '../../components/event/Task';
import Header from '../../components/Header';
import Overview from './Overview';
import Moreinformation from './Moreinformation';
import Other from './Other';
// eslint-disable-next-line arrow-body-style
import { apidelete, apiget } from '../../service/api';
// eslint-disable-next-line no-unused-vars


const View = () => {
    const [leadData, setLeadData] = useState({});
    const [userAction, setUserAction] = useState(null);
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [opendelete, setOpendelete] = useState(false);
    const [isVisibleOverview, setIsVisibleOverview] = useState(true);
    const [isVisibleMoreinformation, setIsVisibleMoreinformation] = useState(false);
    const [isVisibleOther, setIsVisibleOther] = useState(false);
    const [isVisibleNotes, setIsVisibleNotes] = useState(false);
    const [isVisibleCall, setIsVisibleCall] = useState(false);
    const [isVisibleMeetings, setIsVisibleMeetings] = useState(false);
    const [isVisibleEmail, setIsVisibleEmail] = useState(false);
    const [isVisibleTask, setIsVisibleTask] = useState(false);

    const params = useParams()
    const navigate = useNavigate()

    // open add model
    const handleOpenAdd = () => setOpenAdd(true);
    const handleCloseAdd = () => setOpenAdd(false);

    // open edit model
    const handleOpenEdit = () => setOpenEdit(true);
    const handleCloseEdit = () => setOpenEdit(false);

    // open delete model
    const handleOpenDelete = () => setOpendelete(true);
    const handleCloseDelete = () => setOpendelete(false);

    // toggleButtons
    const toggleVisibilityOverview = () => setIsVisibleOverview(!isVisibleOverview);
    const toggleVisibilityMoreinformation = () => setIsVisibleMoreinformation(!isVisibleMoreinformation);
    const toggleVisibilityOther = () => setIsVisibleOther(!isVisibleOther);
    const toggleVisibilityNotes = () => setIsVisibleNotes(!isVisibleNotes);
    const toggleVisibilityCall = () => setIsVisibleCall(!isVisibleCall);
    const toggleVisibilityMeeting = () => setIsVisibleMeetings(!isVisibleMeetings);
    const toggleVisibilityEmail = () => setIsVisibleEmail(!isVisibleEmail);
    const toggleVisibilityTask = () => setIsVisibleTask(!isVisibleTask);

    const back = () => {
        navigate('/dashboard/lead')
    }

    // fetch api
    const fetchdata = async () => {
        const result = await apiget(`lead/view/${params.id}`)
        if (result && result.status === 200) {
            setLeadData(result?.data?.lead)
        }
    }

    // delete api
    const deletedata = async () => {
        await apidelete(`lead/delete/${params.id}`)
        navigate('/dashboard/lead')
    }


    useEffect(() => {
        fetchdata();
    }, [userAction])


    // Export data in csv file
    const leadCsvData = [
        {
            title: leadData?.title,
            firstName: leadData?.firstName,
            lastName: leadData?.lastName,
            dateOfBirth: dayjs(leadData?.dateOfBirth).format('DD-MM-YYYY'),
            gender: leadData?.gender,
            phoneNumber: leadData?.phoneNumber,
            emailAddress: leadData?.emailAddress,
            address: leadData?.address,
            leadSource: leadData?.leadSource,
            leadStatus: leadData?.leadStatus,
            leadScore: leadData?.leadScore,
            alternatePhoneNumber: leadData?.alternatePhoneNumber,
            additionalEmailAddress: leadData?.additionalEmailAddress,
            instagramProfile: leadData?.instagramProfile,
            twitterProfile: leadData?.twitterProfile,
            typeOfInsurance: leadData?.typeOfInsurance,
            desiredCoverageAmount: leadData?.desiredCoverageAmount,
            specificPolicyFeatures: leadData?.specificPolicyFeatures,
            QualificationStatus: leadData?.QualificationStatus,
            policyType: leadData?.policyType,
            policyNumber: leadData?.policyNumber,
            startDate: dayjs(leadData?.startDate).format('DD-MM-YYYY'),
            endDate: dayjs(leadData?.endDate).format('DD-MM-YYYY'),
            coverageAmount: leadData?.coverageAmount,
            termLength: leadData?.termLength,
            conversionReason: leadData?.conversionReason,
            conversionDateTime:leadData?.conversionDateTime,
            leadCategory: leadData?.leadCategory,
            leadPriority: leadData?.leadPriority,
            assigned_agent: `${leadData?.assigned_agent?.firstName} ${leadData?.assigned_agent?.firstName}`,
            createdOn: dayjs(leadData?.createdOn).format('DD-MM-YYYY HH:mm:ss'),
            modifiedOn: dayjs(leadData?.modifiedOn).format('DD-MM-YYYY HH:mm:ss'),
        },
    ];
    const handleExport = () => {
        const csvString = Papa.unparse(leadCsvData);
        const csvBlob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
        const csvUrl = URL.createObjectURL(csvBlob);
        const downloadLink = document.createElement("a");

        downloadLink.href = csvUrl;
        downloadLink.setAttribute(
            "download",
            `Lead_Data`
        );
        downloadLink.click();

        // handleCloseaction();
    };

    return (
        <div>
            {/* Add Lead Model */}
            <AddLead open={openAdd} handleClose={handleCloseAdd} />

            {/* Add Edit Model */}
            <EditModel open={openEdit} handleClose={handleCloseEdit} id={params.id} fetchLead={fetchdata} />

            {/* open Delete Model */}
            <DeleteModel opendelete={opendelete} handleClosedelete={handleCloseDelete} deletedata={deletedata} id={params.id} />

            <Container>
                <Grid container display="flex" alignItems="center">
                    <Stack direction="row" alignItems="center" mb={5} justifyContent={"space-between"} width={"100%"}>
                        <Header
                            title={`${leadData?.title} ${leadData?.firstName} ${leadData?.lastName}`}
                            subtitle="Lead"
                        />
                        <Stack direction="row" alignItems="center" justifyContent={"flex-end"} spacing={2}>
                            {/* Action Butoon */}
                            <Actionbutton
                                handleOpen={handleOpenAdd}
                                handleOpenEdit={handleOpenEdit}
                                handleOpenDelete={handleOpenDelete}
                                handleExport={handleExport}
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
                    {isVisibleOverview && <Overview data={leadData} setUserAction={setUserAction}/>}
                </Card>

                {/* MORE INFORMATION */}
                <Card sx={{ marginTop: "25px" }}>
                    <Box style={{ cursor: "pointer" }}
                        p={1}
                        onClick={toggleVisibilityMoreinformation}
                    >
                        <Stack direction={"row"} spacing={1} display={"flex"} alignItems={"center"}>
                            <Button
                                onClick={toggleVisibilityMoreinformation}
                                color="secondary"
                                variant="contained"
                                sx={{ width: "28px", minWidth: "0px", padding: "0px", height: "25px" }}
                            >
                                {isVisibleMoreinformation ? <RemoveIcon /> : <AddIcon />}
                            </Button>
                            <Typography variant="h5">MORE INFORMATION</Typography>
                        </Stack>
                    </Box>
                    {isVisibleMoreinformation && <Moreinformation data={leadData} />}
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
                    {isVisibleOther && <Other data={leadData} />}
                </Card>

                {/* Notes Table */}
                <Card sx={{ marginTop: "50px" }}>
                    <Notes toggleVisibilityNotes={toggleVisibilityNotes} isVisibleNotes={isVisibleNotes} setUserAction={setUserAction} rows={leadData?.notes} _id={params.id} method="lead" />
                </Card>

                {/* Calls Table */}
                <Card sx={{ marginTop: "20px" }}>
                    <Calls toggleVisibilityCall={toggleVisibilityCall} isVisibleCall={isVisibleCall} setUserAction={setUserAction} rows={leadData?.calls} _id={params.id} />
                </Card>

                {/* Meetings Table */}
                <Card sx={{ marginTop: "20px" }}>
                    <Meetings toggleVisibilityMeeting={toggleVisibilityMeeting} isVisibleMeetings={isVisibleMeetings} setUserAction={setUserAction} rows={leadData?.meetings} _id={params.id} data={leadData} />
                </Card>

                {/* Emails Table */}
                <Card sx={{ marginTop: "20px" }}>
                    <Emails toggleVisibilityEmail={toggleVisibilityEmail} isVisibleEmail={isVisibleEmail} setUserAction={setUserAction} rows={leadData?.emails} _id={params.id} data={leadData} />
                </Card>

                {/* Tasks Table */}
                <Card sx={{ marginTop: "20px" }}>
                    <Tasks toggleVisibilityTask={toggleVisibilityTask} isVisibleTask={isVisibleTask} setUserAction={setUserAction} rows={leadData?.tasks} data={leadData} _id={params.id} />
                </Card>
            </Container>

        </div >
    )
}

export default View
