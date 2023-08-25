/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Container, Grid, Stack, Tab, Tabs } from '@mui/material'
import React, { useEffect, useState } from 'react'
// eslint-disable-next-line import/no-unresolved
import Actionbutton from 'src/components/Actionbutton'
// eslint-disable-next-line import/no-unresolved
import Card from '@mui/material/Card';
// eslint-disable-next-line arrow-body-style
import { useNavigate, useParams } from 'react-router-dom';
import Papa from "papaparse";
import dayjs from 'dayjs';
import Notes from '../../components/note/Note';
import Header from '../../components/Header';
import Overview from './Overview';
import Moreinformation from './Moreinformation';
import Other from './Other';
// eslint-disable-next-line arrow-body-style, no-unused-vars
import Claim from '../../components/claim/Claim';
import DeleteModel from '../../components/Deletemodle'
import AddModel from './Add'
import EditModel from './Edit'
import PolicyDocuments from './policyDocument/policyDocuments'
import { apidelete, apiget } from '../../service/api';
import { CustomTabPanel, a11yProps } from '../../components/CustomTabPanel';

// eslint-disable-next-line no-unused-vars
const View = () => {

    const [policyData, setPolicyData] = useState({});
    const [userAction, setUserAction] = useState(null);
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [opendelete, setOpendelete] = useState(false);
    const [value, setValue] = useState(0);
    const [isVisibleClaim, setIsVisibleClaim] = useState(false);
    const [isVisibleNotes, setIsVisibleNotes] = useState(false);
    const [isVisiblePolicyDoc, setIsVisiblePolicyDoc] = useState(false);
    const params = useParams()
    const navigate = useNavigate()

    // open add model
    const handleOpenAdd = () => setOpenAdd(true);
    const handleCloseAdd = () => setOpenAdd(false);

    // open add model
    const handleOpenEdit = () => setOpenEdit(true);
    const handleCloseEdit = () => setOpenEdit(false);

    // open delete model
    const handleOpenDelete = () => setOpendelete(true);
    const handleCloseDelete = () => setOpendelete(false);

    // tab
    const handleChange = (event, newValue) => setValue(newValue);

    // toggleButton
    const toggleVisibilityClaim = () => setIsVisibleClaim(!isVisibleClaim);
    const toggleVisibilityNotes = () => setIsVisibleNotes(!isVisibleNotes);
    const toggleVisibilityPolicyDoc = () => setIsVisiblePolicyDoc(!isVisiblePolicyDoc);



    const back = () => {
        navigate('/dashboard/policy')
    }


    // fetch api
    const fetchdata = async () => {
        const result = await apiget(`policy/view/${params.id}`)
        if (result && result.status === 200) {
            setPolicyData(result?.data?.policy[0])
        }
    }

    // delete api
    const deletedata = async () => {
        await apidelete(`policy/delete/${params.id}`)
        navigate('/dashboard/policy')
    }



    useEffect(() => {
        fetchdata();
    }, [userAction])

    // Export data in csv file
    const policyCsvData = [
        {
            policyType: policyData?.policyType,
            policyStartDate: dayjs(policyData?.policyStartDate).format('DD-MM-YYYY'),
            policyEndDate: dayjs(policyData?.policyEndDate).format('DD-MM-YYYY'),
            policyStatus: policyData?.policyStatus,
            coverageAmounts: policyData?.coverageAmounts,
            deductibles: policyData?.deductibles,
            limits: policyData?.limits,
            insuredPersonName: `${policyData?.contact_id?.firstName} ${policyData?.contact_id?.lastName}`,
            insuredPersonDateOfBirth: dayjs(policyData?.insuredPersonDateOfBirth).format('DD-MM-YYYY'),
            phoneNumber: policyData?.phoneNumber,
            emailAddress: policyData?.emailAddress,
            instagramProfile: policyData?.instagramProfile,
            twitterProfile: policyData?.twitterProfile,
            relationshipToTheInsured: policyData?.relationshipToTheInsured,
            additionalInsuredPersonName: policyData?.additionalInsuredPersonName,
            additionalInsuredDateOfBirth: dayjs(policyData?.additionalInsuredDateOfBirth).format('DD-MM-YYYY'),
            additionalRelationshipToTheInsured: policyData?.additionalRelationshipToTheInsured,
            additionalPhoneNumber: policyData?.additionalPhoneNumber,
            additionalEmailAddress: policyData?.additionalEmailAddress,
            additionalInstagramProfile: policyData?.additionalInstagramProfile,
            additionalTwitterProfile: policyData?.additionalTwitterProfile,
            premiumAmount: policyData?.premiumAmount,
            FrequencyOfPremiumPayments: policyData?.FrequencyOfPremiumPayments,
            underwriterName: policyData?.underwriterName,
            underwriterPhone: policyData?.underwriterPhone,
            underwriterEmail: policyData?.underwriterEmail,
            underwriterDecisions: policyData?.underwriterDecisions,
            assigned_agent: `${policyData?.assigned_agent?.firstName} ${policyData?.assigned_agent?.lastName}`,
            createdOn: dayjs(policyData?.createdOn).format('DD-MM-YYYY HH:mm:ss'),
            modifiedOn: dayjs(policyData?.modifiedOn).format('DD-MM-YYYY HH:mm:ss'),
        },
    ];
    const handleExport = () => {
        const csvString = Papa.unparse(policyCsvData);
        const csvBlob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
        const csvUrl = URL.createObjectURL(csvBlob);
        const downloadLink = document.createElement("a");

        downloadLink.href = csvUrl;
        downloadLink.setAttribute(
            "download",
            `Policy_Data.csv`
        );
        downloadLink.click();

        // handleCloseaction();
    };
    return (
        <div>
            {/* Add Model */}
            <AddModel open={openAdd} handleClose={handleCloseAdd} setUserAction={setUserAction} />

            {/* Edit Mode */}
            <EditModel open={openEdit} handleClose={handleCloseEdit} setUserAction={setUserAction} id={params.id} fetchPolicy={fetchdata} />

            {/* open Delete Model */}
            <DeleteModel opendelete={opendelete} handleClosedelete={handleCloseDelete} deletedata={deletedata} id={params.id} />

            <Container>
                <Grid container display="flex" alignItems="center">
                    <Stack direction="row" alignItems="center" mb={3} justifyContent={"space-between"} width={"100%"}>
                        {
                            policyData?.contact_id ?
                                <Header
                                    title={`${policyData?.contact_id?.firstName} ${policyData?.contact_id?.lastName}`}
                                    subtitle="Policy Details"
                                />
                                :
                                <Header
                                    title={policyData?.insuredPersonName}
                                    subtitle="Policy Details"
                                />
                        }
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
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: "0px" }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="OVERVIEW" {...a11yProps(0)} />
                            <Tab label="MORE INFORMATION" {...a11yProps(1)} />
                            <Tab label="OTHER" {...a11yProps(2)} />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                        <Overview data={policyData} setUserAction={setUserAction} />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <Moreinformation data={policyData} />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={2}>
                        <Other data={policyData} />
                    </CustomTabPanel>
                </Box>
           

                {/* Notes Table */}
                <Card sx={{ marginTop: "50px" }}>
                    <Notes toggleVisibilityNotes={toggleVisibilityNotes} isVisibleNotes={isVisibleNotes} rows={policyData?.notes} _id={params.id} setUserAction={setUserAction} />
                </Card>

                {/* Claim Table */}
                <Card sx={{ marginTop: "20px" }}>
                    <Claim toggleVisibilityClaim={toggleVisibilityClaim} isVisibleClaim={isVisibleClaim} rows={policyData?.claims} _id={params.id} setUserAction={setUserAction} />
                </Card>

                {/* PolicyDoc Table */}
                <Card sx={{ marginTop: "20px" }}>
                    <PolicyDocuments toggleVisibilityPolicyDoc={toggleVisibilityPolicyDoc} isVisiblePolicyDoc={isVisiblePolicyDoc} rows={policyData?.policydocuments} _id={params.id} setUserAction={setUserAction} />
                </Card>

            </Container>


        </div >
    )
}

export default View
