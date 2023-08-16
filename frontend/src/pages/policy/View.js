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
import { nbNO } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import Notes from '../../components/note/Note';
import Header from '../../components/Header';
import Overview from './Overview';
import Moreinformation from './Moreinformation';
import Other from './Other';

// eslint-disable-next-line arrow-body-style, no-unused-vars
import Palette from '../../theme/palette'
import Claim from '../../components/claim/Claim';
import DeleteModel from '../../components/Deletemodle'
import AddModel from './Add'
import EditModel from './Edit'
import PolicyDocuments from './policyDocument/policyDocuments'
import { apidelete, apiget } from '../../service/api';

// eslint-disable-next-line no-unused-vars
const View = () => {

    const [policyData, setPolicyData] = useState({});
    const [userAction, setUserAction] = useState(null);
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [opendelete, setOpendelete] = useState(false);
    const [isVisibleOverview, setIsVisibleOverview] = useState(true);
    const [isVisibleMoreinformation, setIsVisibleMoreinformation] = useState(false);
    const [isVisibleOther, setIsVisibleOther] = useState(false);
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


    // toggleButton
    const toggleVisibilityOverview = () => setIsVisibleOverview(!isVisibleOverview);
    const toggleVisibilityMoreinformation = () => setIsVisibleMoreinformation(!isVisibleMoreinformation);
    const toggleVisibilityOther = () => setIsVisibleOther(!isVisibleOther);
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
                    <Stack direction="row" alignItems="center" mb={5} justifyContent={"space-between"} width={"100%"}>
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
                    {isVisibleOverview && <Overview data={policyData} />}
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
                    {isVisibleMoreinformation && <Moreinformation data={policyData} />}
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
                    {isVisibleOther && <Other data={policyData} />}
                </Card>

                {/* Claim Table */}
                <Card sx={{ marginTop: "50px" }}>
                    <Claim toggleVisibilityClaim={toggleVisibilityClaim} isVisibleClaim={isVisibleClaim} rows={policyData?.claims} _id={params.id} setUserAction={setUserAction} />
                </Card>

                {/* Notes Table */}
                <Card sx={{ marginTop: "20px" }}>
                    <Notes toggleVisibilityNotes={toggleVisibilityNotes} isVisibleNotes={isVisibleNotes} rows={policyData?.notes} _id={params.id} setUserAction={setUserAction} />
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
