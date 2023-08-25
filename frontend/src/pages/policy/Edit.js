/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { FormControl, FormHelperText, FormLabel, Grid, MenuItem, Select, TextField } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import ClearIcon from "@mui/icons-material/Clear";
import { useFormik } from 'formik';
import * as yup from "yup";
import dayjs from 'dayjs';
import { useState, useEffect } from 'react';
import { apiget, apiput } from '../../service/api';
import Palette from '../../theme/palette';


const Edit = (props) => {
    const { open, handleClose, setUserAction, id, fetchPolicy } = props

    const [policyData, setPolicyData] = useState({})


    const userid = localStorage.getItem('user_id')

    // -----------  validationSchema
    const validationSchema = yup.object({
        policyType: yup.string().required("Policy Type is required"),
        policyStartDate: yup.date().required("Policy Start Date is required"),
        policyEndDate: yup.date().required("Policy End Date is required"),
        policyStatus: yup.string().required("Policy Status is required"),
        coverageAmounts: yup.number().required("Coverage Amounts is required"),
        deductibles: yup.number().required("Deductions is required"),
        limits: yup.number().required("Limits is required"),
        insuredPersonName: yup.string().required("Person Name is required"),
        insuredPersonDateOfBirth: yup.date().required("Date of Birth is required"),
        relationshipToTheInsured: yup.string().required("Relationship To The Insured is required"),
        phoneNumber: yup.string().matches(/^[0-9]{10}$/, 'Phone number is invalid').required('Phone number is required'),
        emailAddress: yup.string().email('Invalid email').required("Email is required"),
        additionalPhoneNumber: yup.string().matches(/^[0-9]{10}$/, 'Phone number is invalid'),
        additionalEmailAddress: yup.string().email('Invalid email'),
        underwriterPhone: yup.string().matches(/^[0-9]{10}$/, 'Phone number is invalid'),
        underwriterEmail: yup.string().email('Invalid email')
    });

    // -----------   initialValues
    const initialValues = {
        policyType: policyData?.policyType,
        policyStartDate: policyData?.policyStartDate,
        policyEndDate: policyData?.policyEndDate,
        policyStatus: policyData?.policyStatus,
        coverageAmounts: policyData?.coverageAmounts,
        deductibles: policyData?.deductibles,
        limits: policyData?.limits,
        insuredPersonName: policyData?.contact_id ? `${policyData?.contact_id?.firstName} ${policyData?.contact_id?.lastName}` : policyData?.insuredPersonName,
        insuredPersonDateOfBirth: policyData?.insuredPersonDateOfBirth,
        phoneNumber: policyData?.phoneNumber,
        emailAddress: policyData?.emailAddress,
        instagramProfile: policyData?.instagramProfile,
        twitterProfile: policyData?.twitterProfile,
        relationshipToTheInsured: policyData?.relationshipToTheInsured,
        additionalInsuredPersonName: policyData?.additionalInsuredPersonName,
        additionalInsuredDateOfBirth: policyData?.additionalInsuredDateOfBirth,
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
        assigned_agent: userid
    };

    // policy View api
    const fetchdata = async () => {
        const result = await apiget(`policy/view/${id}`)
        if (result && result.status === 200) {
            setPolicyData(result?.data?.policy[0])
        }
    }

    // edit Policy api
    const editPolicy = async (values) => {
        const data = values;
        const result = await apiput(`policy/edit/${id}`, data)
        setUserAction(result)
        if (result && result.status === 200) {
            handleClose();
            fetchPolicy();
        }
    }


    // formik
    const formik = useFormik({
        initialValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            const policyData = {
                policyType: values.policyType,
                policyStartDate: values.policyStartDate,
                policyEndDate: values.policyEndDate,
                policyStatus: values.policyStatus,
                coverageAmounts: values.coverageAmounts,
                deductibles: values.deductibles,
                limits: values.limits,
                insuredPersonName: values.insuredPersonName,
                insuredPersonDateOfBirth: values.insuredPersonDateOfBirth,
                phoneNumber: values.phoneNumber,
                emailAddress: values.emailAddress,
                instagramProfile: values.instagramProfile,
                twitterProfile: values.twitterProfile,
                relationshipToTheInsured: values.relationshipToTheInsured,
                additionalInsuredPersonName: values.additionalInsuredPersonName,
                additionalInsuredDateOfBirth: values.additionalInsuredDateOfBirth,
                additionalRelationshipToTheInsured: values.additionalRelationshipToTheInsured,
                additionalPhoneNumber: values.additionalPhoneNumber,
                additionalEmailAddress: values.additionalEmailAddress,
                additionalInstagramProfile: values.additionalInstagramProfile,
                additionalTwitterProfile: values.additionalTwitterProfile,
                premiumAmount: values.premiumAmount,
                FrequencyOfPremiumPayments: values.FrequencyOfPremiumPayments,
                underwriterName: values.underwriterName,
                underwriterPhone: values.underwriterPhone,
                underwriterEmail: values.underwriterEmail,
                underwriterDecisions: values.underwriterDecisions,
                modifiedOn: new Date()
            }
            editPolicy(policyData)
        },
    });

    useEffect(() => {
        fetchdata();
    }, [])

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle
                    id="scroll-dialog-title"
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        // backgroundColor: "#2b4054",
                        // color: "white",
                    }}
                >
                    <Typography variant="h6">Edit</Typography>
                    <Typography>
                        <ClearIcon
                            onClick={handleClose}
                            style={{ cursor: "pointer" }}
                        />
                    </Typography>
                </DialogTitle>
                <DialogContent dividers>
                    <form>
                        <DialogContentText
                            id="scroll-dialog-description"
                            tabIndex={-1}
                        >
                            <Typography style={{ marginBottom: "15px" }} variant="h6">
                                Policy Details
                            </Typography>
                            <Grid
                                container
                                rowSpacing={3}
                                columnSpacing={{ xs: 0, sm: 5, md: 4 }}
                            >
                                <Grid item xs={12} sm={6} md={6}>
                                    <FormControl fullWidth>
                                        <FormLabel>Policy type</FormLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="policyType"
                                            name="policyType"
                                            size='small'
                                            fullWidth
                                            value={formik.values.policyType}
                                            onChange={formik.handleChange}
                                            error={
                                                formik.touched.policyType &&
                                                Boolean(formik.errors.policyType)
                                            }
                                            helperText={
                                                formik.touched.policyType && formik.errors.policyType
                                            }
                                        >
                                            <MenuItem value="Auto Insurance">Auto Insurance</MenuItem>
                                            <MenuItem value="Health Insurance">Health Insurance </MenuItem>
                                            <MenuItem value="Home Insurance">Home Insurance </MenuItem>
                                            <MenuItem value="Life Insurance">Life Insurance </MenuItem>
                                        </Select>
                                        <FormHelperText style={{ color: Palette.error.main }}>{formik.touched.policyType && formik.errors.policyType}</FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <FormLabel>Policy Start Date</FormLabel>
                                    <TextField
                                        name='policyStartDate'
                                        type='date'
                                        size='small'
                                        fullWidth
                                        value={dayjs(formik.values.policyStartDate).format('YYYY-MM-DD')}
                                        onChange={formik.handleChange}
                                        error={formik.touched.policyStartDate && Boolean(formik.errors.policyStartDate)}
                                        helperText={formik.touched.policyStartDate && formik.errors.policyStartDate}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <FormLabel>Policy End Date</FormLabel>
                                    <TextField
                                        name='policyEndDate'
                                        type='date'
                                        size='small'
                                        fullWidth
                                        value={dayjs(formik.values.policyEndDate).format('YYYY-MM-DD')}
                                        onChange={formik.handleChange}
                                        error={formik.touched.policyEndDate && Boolean(formik.errors.policyEndDate)}
                                        helperText={formik.touched.policyEndDate && formik.errors.policyEndDate}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <FormControl fullWidth>
                                        <FormLabel>Policy status</FormLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="policyStatus"
                                            name="policyStatus"
                                            size='small'
                                            fullWidth
                                            value={formik.values.policyStatus}
                                            onChange={formik.handleChange}
                                            error={
                                                formik.touched.policyStatus &&
                                                Boolean(formik.errors.policyStatus)
                                            }
                                            helperText={
                                                formik.touched.policyStatus && formik.errors.policyStatus
                                            }
                                        >
                                            <MenuItem value="Active">Active</MenuItem>
                                            <MenuItem value="InActive">InActive </MenuItem>
                                            <MenuItem value="Canceled">Canceled </MenuItem>
                                        </Select>
                                        <FormHelperText style={{ color: Palette.error.main }}>{formik.touched.policyStatus && formik.errors.policyStatus}</FormHelperText>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Typography
                                style={{ marginBottom: "15px", marginTop: "15px" }}
                                variant="h6"
                            >
                                Policy Coverage Details
                            </Typography>
                            <Grid
                                container
                                rowSpacing={3}
                                columnSpacing={{ xs: 0, sm: 5, md: 4 }}
                            >
                                <Grid item xs={12} sm={6} md={6}>
                                    <FormLabel>Coverage Amounts</FormLabel>
                                    <TextField
                                        id="coverageAmounts"
                                        name="coverageAmounts"
                                        size='small'
                                        fullWidth
                                        value={formik.values.coverageAmounts}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.coverageAmounts &&
                                            Boolean(formik.errors.coverageAmounts)
                                        }
                                        helperText={
                                            formik.touched.coverageAmounts && formik.errors.coverageAmounts
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <FormLabel>Deductibles</FormLabel>
                                    <TextField
                                        id="deductibles"
                                        name="deductibles"
                                        size='small'
                                        fullWidth
                                        value={formik.values.deductibles}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.deductibles &&
                                            Boolean(formik.errors.deductibles)
                                        }
                                        helperText={
                                            formik.touched.deductibles && formik.errors.deductibles
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                    <FormLabel>Limits</FormLabel>
                                    <TextField
                                        id="limits"
                                        name="limits"
                                        size='small'
                                        fullWidth
                                        value={formik.values.limits}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.limits &&
                                            Boolean(formik.errors.limits)
                                        }
                                        helperText={
                                            formik.touched.limits && formik.errors.limits
                                        }
                                    />
                                </Grid>
                            </Grid>
                            <Typography
                                style={{ marginBottom: "15px", marginTop: "15px" }}
                                variant="h6"
                            >
                                Insured Details
                            </Typography>
                            <Grid
                                container
                                rowSpacing={3}
                                columnSpacing={{ xs: 0, sm: 5, md: 4 }}
                            >
                                <Grid item xs={12} sm={6} md={6}>
                                    <FormLabel>Insured Person Name</FormLabel>
                                    <TextField
                                        id="insuredPersonName"
                                        name="insuredPersonName"
                                        size='small'
                                        fullWidth
                                        value={formik.values.insuredPersonName}
                                        onChange={formik.handleChange}
                                        error={formik.touched.insuredPersonName && Boolean(formik.errors.insuredPersonName)}
                                        helperText={formik.touched.insuredPersonName && formik.errors.insuredPersonName}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <FormLabel>Date Of Birth</FormLabel>
                                    <TextField
                                        name='insuredPersonDateOfBirth'
                                        type='date'
                                        size='small'
                                        fullWidth
                                        value={dayjs(formik.values.insuredPersonDateOfBirth).format('YYYY-MM-DD')}
                                        onChange={formik.handleChange}
                                        error={formik.touched.insuredPersonDateOfBirth && Boolean(formik.errors.insuredPersonDateOfBirth)}
                                        helperText={formik.touched.insuredPersonDateOfBirth && formik.errors.insuredPersonDateOfBirth}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                    <FormLabel>Relationship to the insured</FormLabel>
                                    <TextField
                                        id="relationshipToTheInsured"
                                        name="relationshipToTheInsured"
                                        size='small'
                                        fullWidth
                                        value={formik.values.relationshipToTheInsured}
                                        onChange={formik.handleChange}
                                        error={formik.touched.relationshipToTheInsured && Boolean(formik.errors.relationshipToTheInsured)}
                                        helperText={formik.touched.relationshipToTheInsured && formik.errors.relationshipToTheInsured}
                                    />
                                </Grid>
                            </Grid>
                            <Typography
                                style={{ marginBottom: "15px", marginTop: "15px" }}
                                variant="h6"
                            >
                                Insured person's contact information
                            </Typography>
                            <Grid
                                container
                                rowSpacing={3}
                                columnSpacing={{ xs: 0, sm: 5, md: 4 }}
                            >
                                <Grid item xs={12} sm={6} md={6}>
                                    <FormLabel>Phone Number</FormLabel>
                                    <TextField
                                        id=""
                                        name="phoneNumber"
                                        type="number"
                                        size='small'
                                        fullWidth
                                        value={formik.values.phoneNumber}
                                        onChange={formik.handleChange}
                                        error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                                        helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <FormLabel>Email Address</FormLabel>
                                    <TextField
                                        id="emailAddress"
                                        name="emailAddress"
                                        type="email"
                                        size='small'
                                        fullWidth
                                        value={formik.values.emailAddress}
                                        onChange={formik.handleChange}
                                        error={formik.touched.emailAddress && Boolean(formik.errors.emailAddress)}
                                        helperText={formik.touched.emailAddress && formik.errors.emailAddress}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <FormLabel>Instagram Profile</FormLabel>
                                    <TextField
                                        id="instagramProfile"
                                        name="instagramProfile"
                                        type=""
                                        size='small'
                                        fullWidth
                                        value={formik.values.instagramProfile}
                                        onChange={(e) => formik.setFieldValue('instagramProfile', `${e.target.value}`)}
                                    />
                                    {formik.values.instagramProfile && <a href={`https://www.instagram.com/${formik.values.instagramProfile}`} target="_blank" rel="noreferrer">Link</a>}
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <FormLabel>Twitter profile</FormLabel>
                                    <TextField
                                        id="twitterProfile"
                                        name="twitterProfile"
                                        type=""
                                        size='small'
                                        fullWidth
                                        value={formik.values.twitterProfile}
                                        onChange={(e) => formik.setFieldValue('twitterProfile', `${e.target.value}`)}
                                    />
                                    {formik.values.twitterProfile && <a href={`https://twitter.com/${formik.values.twitterProfile}`} target="_blank" rel="noreferrer">Link</a>}
                                </Grid>
                            </Grid>
                            <Typography
                                style={{ marginBottom: "15px", marginTop: "15px" }}
                                variant="h6"
                            >
                                Additional Insured
                            </Typography>
                            <Grid
                                container
                                rowSpacing={3}
                                columnSpacing={{ xs: 0, sm: 5, md: 4 }}
                            >
                                <Grid item xs={12} sm={6} md={6}>
                                    <FormLabel>Person Name</FormLabel>
                                    <TextField
                                        id="additionalInsuredPersonName"
                                        name="additionalInsuredPersonName"
                                        size='small'
                                        fullWidth
                                        value={formik.values.additionalInsuredPersonName}
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <FormLabel>Date Of Birth</FormLabel>
                                    <TextField
                                        name='additionalInsuredDateOfBirth'
                                        type='date'
                                        size='small'
                                        fullWidth
                                        value={formik.values.additionalInsuredDateOfBirth}
                                        onChange={formik.handleChange}
                                        error={formik.touched.additionalInsuredDateOfBirth && Boolean(formik.errors.additionalInsuredDateOfBirth)}
                                        helperText={formik.touched.additionalInsuredDateOfBirth && formik.errors.additionalInsuredDateOfBirth}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={12} md={12}>
                                    <FormLabel>Relationship to the insured</FormLabel>
                                    <TextField
                                        id="additionalRelationshipToTheInsured"
                                        name="additionalRelationshipToTheInsured"
                                        size='small'
                                        fullWidth
                                        value={formik.values.additionalRelationshipToTheInsured}
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                            </Grid>
                            <Typography
                                style={{ marginBottom: "15px", marginTop: "15px" }}
                                variant="h6"
                            >
                                Additional insured person's contact information
                            </Typography>
                            <Grid
                                container
                                rowSpacing={3}
                                columnSpacing={{ xs: 0, sm: 5, md: 4 }}
                            >
                                <Grid item xs={12} sm={6} md={6}>
                                    <FormLabel>Phone Number</FormLabel>
                                    <TextField
                                        id="additionalPhoneNumber"
                                        name="additionalPhoneNumber"
                                        type="number"
                                        size='small'
                                        fullWidth
                                        value={formik.values.additionalPhoneNumber}
                                        onChange={formik.handleChange}
                                        error={formik.touched.additionalPhoneNumber && Boolean(formik.errors.additionalPhoneNumber)}
                                        helperText={formik.touched.additionalPhoneNumber && formik.errors.additionalPhoneNumber}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <FormLabel>Email</FormLabel>
                                    <TextField
                                        id="additionalEmailAddress"
                                        name="additionalEmailAddress"
                                        type="email"
                                        size='small'
                                        fullWidth
                                        value={formik.values.additionalEmailAddress}
                                        onChange={formik.handleChange}
                                        error={formik.touched.additionalEmailAddress && Boolean(formik.errors.additionalEmailAddress)}
                                        helperText={formik.touched.additionalEmailAddress && formik.errors.additionalEmailAddress}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <FormLabel>Instagram profile</FormLabel>
                                    <TextField
                                        id="additionalInstagramProfile"
                                        name="additionalInstagramProfile"
                                        type=""
                                        size='small'
                                        fullWidth
                                        value={formik.values.additionalInstagramProfile}
                                        onChange={(e) => formik.setFieldValue('additionalInstagramProfile', `${e.target.value}`)}
                                    />
                                    {formik.values.additionalInstagramProfile && <a href={`https://www.instagram.com/${formik.values.additionalInstagramProfile}`} target="_blank" rel="noreferrer">Link</a>}
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <FormLabel>Twitter profile</FormLabel>
                                    <TextField
                                        id="additionalTwitterProfile"
                                        name="additionalTwitterProfile"
                                        type=""
                                        size='small'
                                        fullWidth
                                        value={formik.values.additionalTwitterProfile}
                                        onChange={(e) => formik.setFieldValue('additionalTwitterProfile', `${e.target.value}`)}
                                    />
                                    {formik.values.additionalTwitterProfile && <a href={`https://twitter.com/${formik.values.additionalTwitterProfile}`} target="_blank" rel="noreferrer">Link</a>}
                                </Grid>
                            </Grid>
                            <Typography
                                style={{ marginBottom: "15px", marginTop: "15px" }}
                                variant="h6"
                            >
                                Policy Premiums and Payments
                            </Typography>
                            <Grid
                                container
                                rowSpacing={3}
                                columnSpacing={{ xs: 0, sm: 5, md: 4 }}
                            >
                                <Grid item xs={12} sm={6} md={6}>
                                    <FormLabel>Premium Amount</FormLabel>
                                    <TextField
                                        id="premiumAmount"
                                        name="premiumAmount"
                                        type="number"
                                        size='small'
                                        fullWidth
                                        value={formik.values.premiumAmount}
                                        onChange={formik.handleChange}

                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <FormControl fullWidth>
                                        <FormLabel>Premium Payments</FormLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="FrequencyOfPremiumPayments"
                                            name="FrequencyOfPremiumPayments"
                                            label=""
                                            size='small'
                                            value={formik.values.FrequencyOfPremiumPayments}
                                            onChange={formik.handleChange}
                                        >
                                            <MenuItem value="Monthly">Monthly</MenuItem>
                                            <MenuItem value="Annually">Annually </MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>

                            <Typography
                                style={{ marginBottom: "15px", marginTop: "15px" }}
                                variant="h6"
                            >
                                Underwriting Information
                            </Typography>
                            <Grid
                                container
                                rowSpacing={3}
                                columnSpacing={{ xs: 0, sm: 5, md: 4 }}
                            >
                                <Grid item xs={12} sm={6} md={6}>
                                    <FormLabel>Name</FormLabel>
                                    <TextField
                                        id=""
                                        name="underwriterName"
                                        type=""
                                        fullWidth
                                        size='small'
                                        value={formik.values.underwriterName}
                                        onChange={formik.handleChange}

                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <FormLabel>Phone</FormLabel>
                                    <TextField
                                        id=""
                                        name="underwriterPhone"
                                        type=""
                                        fullWidth
                                        size='small'
                                        value={formik.values.underwriterPhone}
                                        onChange={formik.handleChange}
                                        error={formik.touched.underwriterPhone && Boolean(formik.errors.underwriterPhone)}
                                        helperText={formik.touched.underwriterPhone && formik.errors.underwriterPhone}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <FormLabel>Email</FormLabel>
                                    <TextField
                                        id=""
                                        name="underwriterEmail"
                                        type=""
                                        fullWidth
                                        size='small'
                                        value={formik.values.underwriterEmail}
                                        onChange={formik.handleChange}
                                        error={formik.touched.underwriterEmail && Boolean(formik.errors.underwriterEmail)}
                                        helperText={formik.touched.underwriterEmail && formik.errors.underwriterEmail}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <FormControl fullWidth>
                                        <FormLabel>Underwriter Remarks</FormLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="underwriterDecisions"
                                            name="underwriterDecisions"
                                            label=""
                                            size='small'
                                            value={formik.values.underwriterDecisions}
                                            onChange={formik.handleChange}
                                        >
                                            <MenuItem value="Policyholder has a clean driving record">Policyholder has a clean driving record</MenuItem>
                                            <MenuItem value="Policyholder's property located in a low-risk area">Policyholder's property located in a low-risk area </MenuItem>
                                            <MenuItem value="Underwriter consulted with the claims department to assess potential risks.">Underwriter consulted with the claims department to assess potential risks. </MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>

                        </DialogContentText>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={formik.handleSubmit} variant='contained' color='primary'>Save</Button>
                    <Button onClick={() => {
                        formik.resetForm()
                        handleClose()
                    }} variant='outlined' color='error'>Cancle</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Edit