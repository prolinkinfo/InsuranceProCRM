import { Box, Container, Grid, Stack, Tab, Tabs } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Papa from "papaparse";
import Card from '@mui/material/Card';
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import Actionbutton from '../../components/Actionbutton'
import { apidelete, apiget } from '../../service/api';
import AddContact from './Add'
import EditContact from './Edit'
import DeleteModel from '../../components/Deletemodle'
import Lead from './Lead';
import Claim from '../../components/claim/Claim';
import Notes from '../../components/note/Note';
import Calls from '../../components/call/Call';
import Meetings from '../../components/meeting/Meeting';
import Emails from '../../components/email/Email';
import Task from '../../components/task/Task'
import Header from '../../components/Header';
import Overview from './Overview';
import Moreinformation from './Moreinformation';
import Other from './Other';
import Policy from './Policy'
import { CustomTabPanel, a11yProps } from '../../components/CustomTabPanel';

const View = () => {
    const [contactData, setContactData] = useState({});
    const [userAction, setUserAction] = useState(null);
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [opendelete, setOpendelete] = useState(false);
    const [value, setValue] = useState(0);
    const [isVisibleLead, setIsVisibleLead] = useState(false);
    const [isVisibleClaim, setIsVisibleClaim] = useState(false);
    const [isVisiblePolicy, setIsVisiblePolicy] = useState(false);
    const [isVisibleEvent, setIsVisibleEvent] = useState(false)
    const [isVisibleNotes, setIsVisibleNotes] = useState(false);
    const [isVisibleCall, setIsVisibleCall] = useState(false);
    const [isVisibleMeetings, setIsVisibleMeetings] = useState(false);
    const [isVisibleEmail, setIsVisibleEmail] = useState(false);
    const navigate = useNavigate()
    const params = useParams()

    // open add model
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // open Edit model
    const handleOpenEdit = () => setOpenEdit(true);
    const handleCloseEdit = () => setOpenEdit(false);

    // open delete model
    const handleOpenDelete = () => setOpendelete(true);
    const handleCloseDelete = () => setOpendelete(false);

    // tab
    const handleChange = (event, newValue) => setValue(newValue);

    // toggleButton
    const toggleVisibilityLead = () => setIsVisibleLead(!isVisibleLead);
    const toggleVisibilityEvent = () => setIsVisibleEvent(!isVisibleEvent)
    const toggleVisibilityClaim = () => setIsVisibleClaim(!isVisibleClaim);
    const toggleVisibilityPolicy = () => setIsVisiblePolicy(!isVisiblePolicy);
    const toggleVisibilityNotes = () => setIsVisibleNotes(!isVisibleNotes);
    const toggleVisibilityCall = () => setIsVisibleCall(!isVisibleCall);
    const toggleVisibilityMeeting = () => setIsVisibleMeetings(!isVisibleMeetings);
    const toggleVisibilityEmail = () => setIsVisibleEmail(!isVisibleEmail);



    const back = () => {
        navigate('/dashboard/contact')
    }


    // fetch api
    const fetchdata = async () => {
        const result = await apiget(`contact/view/${params.id}`)
        if (result && result.status === 200) {
            setContactData(result?.data[0])
        }
    }
    // delete api
    const deletedata = async () => {
        await apidelete(`contact/delete/${params.id}`)
        navigate('/dashboard/contact')
    }



    useEffect(() => {
        fetchdata();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userAction])

    // Export data in csv file
    const contactCsvData = [
        {
            firstName: contactData?.firstName,
            lastName: contactData?.lastName,
            dateOfBirth: dayjs(contactData?.dateOfBirth).format('DD-MM-YYYY'),
            gender: contactData?.gender,
            phoneNumber: contactData?.phoneNumber,
            emailAddress: contactData?.emailAddress,
            address: contactData?.address,
            alternatePhoneNumber: contactData?.alternatePhoneNumber,
            additionalEmailAddress: contactData?.additionalEmailAddress,
            instagramProfile: contactData?.instagramProfile,
            twitterProfile: contactData?.twitterProfile,
            preferredContactMethod: contactData?.preferredContactMethod,
            referralSource: contactData?.referralSource,
            referralContactName: contactData?.referralContactName,
            relationshipToReferrer: contactData?.relationshipToReferrer,
            preferencesForMarketingCommunications: contactData?.preferencesForMarketingCommunications,
            preferredLanguage: contactData?.preferredLanguage,
            createdOn: dayjs(contactData?.createdOn).format('DD-MM-YYYY HH:mm:ss'),
            modifiedOn: dayjs(contactData?.modifiedOn).format('DD-MM-YYYY HH:mm:ss'),
        },
    ];

    const handleExport = () => {
        const csvString = Papa.unparse(contactCsvData);
        const csvBlob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
        const csvUrl = URL.createObjectURL(csvBlob);
        const downloadLink = document.createElement("a");

        downloadLink.href = csvUrl;
        downloadLink.setAttribute(
            "download",
            `${contactData?.firstName} ${contactData?.lastName} Contact_Data.csv`
        );
        downloadLink.click();

        // handleCloseaction();
    };

    return (
        <div>
            {/* Add Contact Model */}
            <AddContact open={open} handleClose={handleClose} />

            {/* Add Edit Model */}
            <EditContact open={openEdit} handleClose={handleCloseEdit} id={params.id} fetchContact={fetchdata} />

            {/* open Delete Model */}
            <DeleteModel opendelete={opendelete} handleClosedelete={handleCloseDelete} deletedata={deletedata} id={params.id} />

            <Container>
                <Grid container display="flex" alignItems="center">
                    <Stack direction="row" alignItems="center" mb={3} justifyContent={"space-between"} width={"100%"}>
                        <Header
                            title={`${contactData?.firstName} ${contactData?.lastName}`}
                            subtitle="Contact Details"
                        />
                        <Stack direction="row" alignItems="center" justifyContent={"flex-end"} spacing={2}>
                            {/* Action Butoon */}
                            <Actionbutton
                                handleOpen={handleOpen}
                                handleOpenEdit={handleOpenEdit}
                                handleOpenDelete={handleOpenDelete}
                                handleExport={handleExport}
                                back={back}
                            />
                        </Stack>
                    </Stack>
                </Grid>

                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: "0px" }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="OVERVIEW" {...a11yProps(0)} />
                            <Tab label="MORE INFORMATION" {...a11yProps(1)} />
                            <Tab label="OTHER" {...a11yProps(2)} />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                        <Overview data={contactData} setUserAction={setUserAction} />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <Moreinformation data={contactData} />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={2}>
                        <Other data={contactData} />
                    </CustomTabPanel>
                </Box>


                {/* Policy Table */}
                <Card sx={{ marginTop: "50px" }}>
                    <Policy toggleVisibilityPolicy={toggleVisibilityPolicy} isVisiblePolicy={isVisiblePolicy} rows={contactData?.policies} setUserAction={setUserAction} _id={params.id} />
                </Card>

                {/* Claim Table */}
                <Card sx={{ marginTop: "20px" }}>
                    <Claim toggleVisibilityClaim={toggleVisibilityClaim} isVisibleClaim={isVisibleClaim} rows={contactData?.claims} setUserAction={setUserAction} _id={params.id} />
                </Card>

                {/* Lead Table */}
                <Card sx={{ marginTop: "20px" }}>
                    <Lead toggleVisibilityLead={toggleVisibilityLead} isVisibleLead={isVisibleLead} rows={contactData?.leads} setUserAction={setUserAction} _id={params.id} />
                </Card>


                {/* Notes Table */}
                <Card sx={{ marginTop: "50px" }}>
                    <Notes toggleVisibilityNotes={toggleVisibilityNotes} isVisibleNotes={isVisibleNotes} rows={contactData?.notes} setUserAction={setUserAction} _id={params.id} />
                </Card>

                {/* Task Table */}
                <Card sx={{ marginTop: "20px" }}>
                    <Task toggleVisibilityTask={toggleVisibilityEvent} isVisibleTask={isVisibleEvent} rows={contactData?.tasks} setUserAction={setUserAction} _id={params.id} />
                </Card>

                {/* Meetings Table */}
                <Card sx={{ marginTop: "20px" }}>
                    <Meetings toggleVisibilityMeeting={toggleVisibilityMeeting} isVisibleMeetings={isVisibleMeetings} rows={contactData?.meetings} setUserAction={setUserAction} _id={params.id} data={contactData} />
                </Card>

                {/* Calls Table */}
                <Card sx={{ marginTop: "20px" }}>
                    <Calls toggleVisibilityCall={toggleVisibilityCall} isVisibleCall={isVisibleCall} rows={contactData?.calls} setUserAction={setUserAction} _id={params.id} />
                </Card>

                {/* Emails Table */}
                <Card sx={{ marginTop: "20px" }}>
                    <Emails toggleVisibilityEmail={toggleVisibilityEmail} isVisibleEmail={isVisibleEmail} rows={contactData?.emails} setUserAction={setUserAction} _id={params.id} data={contactData} />
                </Card>
            </Container>


        </div >
    )
}

export default View
