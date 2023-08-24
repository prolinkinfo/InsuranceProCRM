/* eslint-disable react/prop-types */
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import ClearIcon from "@mui/icons-material/Clear";
import { useFormik } from "formik";
import * as yup from "yup";
import { useState, useEffect } from "react";
import { FiSave } from "react-icons/fi";
import { GiCancel } from "react-icons/gi";
import { Autocomplete, FormControl, FormHelperText, FormLabel, MenuItem, Select } from "@mui/material";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { apiget, apiput } from "../../service/api";

const Editmeetings = (props) => {

    const { handleClose, open, id, fetchMeeting } = props

    const [meetingDetails, setMeetingDetails] = useState({});
    const [leadData, setLeadData] = useState([])
    const [contactData, setContactData] = useState([])
    const params = useParams();

    const userid = localStorage.getItem('user_id')
    const userRole = localStorage.getItem("userRole");

    // -----------  validationSchema
    const validationSchema = yup.object({
        subject: yup.string().required("Subject is required"),
        status: yup.string().required("Status is required"),
        startDate: yup.string().required("Start Date is required"),
        endDate: yup.string().required("End Date Time is required"),
        location: yup.string().required("Location is required"),
        duration: yup.string().required("Duration is required"),
        relatedTo: yup.string().required("Related To is required"),
        note: yup.string().required("Note is required")
    });

    // -----------   initialValues
    const initialValues = {
        subject: meetingDetails.subject,
        status: meetingDetails.status,
        startDate: meetingDetails.startDate,
        endDate: meetingDetails.endDate,
        duration: meetingDetails.duration,
        location: meetingDetails.location,
        relatedTo: meetingDetails.relatedTo,
        note: meetingDetails.note,
        lead_id: meetingDetails.lead_id?._id,
        contact_id: meetingDetails.contact_id?._id,
        modifiedOn: ""

    };

    // fetch api
    const fetchdata = async () => {
        const result = await apiget(`meeting/view/${params.id}`)
        if (result && result.status === 200) {
            setMeetingDetails(result?.data?.meetings)
        }
    }

    // edit api
    const EditMeeting = async (values) => {
        const data = values;
        const result = await apiput(`meeting/edit/${id}`, data)
        if (result && result.status === 200) {
            handleClose();
            fetchMeeting();
        }
    }

    // lead api
    const fetchLeadData = async () => {
        const result = await apiget(userRole === 'admin' ? `lead/list` : `lead/list/?createdBy=${userid}`)
        if (result && result.status === 200) {
            setLeadData(result?.data?.result)
        }
    }

    // contact api
    const fetchContactData = async () => {
        const result = await apiget(userRole === 'admin' ? `contact/list` : `contact/list/?createdBy=${userid}`)
        if (result && result.status === 200) {
            setContactData(result?.data?.result)
        }
    }


    const formik = useFormik({
        initialValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            const meetingData = {
                subject: values.subject,
                status: values.status,
                startDate: values.startDate,
                endDate: values.endDate,
                duration: values.duration,
                location: values.location,
                relatedTo: values.relatedTo,
                note: values.note,
                lead_id: values.lead_id,
                contact_id: values.contact_id,
                modifiedOn: new Date()
            }
            EditMeeting(meetingData)
        },
    });

    useEffect(() => {
        fetchdata();
        fetchLeadData();
        fetchContactData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            <Dialog
                open={open}
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
                    <Typography variant="h6">Edit Meeting </Typography>
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
                            <Grid
                                container
                                rowSpacing={3}
                                columnSpacing={{ xs: 0, sm: 5, md: 4 }}
                            >
                                <Grid item xs={12} sm={6} md={6}>
                                    <FormLabel>Subject</FormLabel>
                                    <TextField
                                        id="subject"
                                        name="subject"
                                        size="small"
                                        maxRows={10}
                                        fullWidth
                                        value={formik.values.subject}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.subject &&
                                            Boolean(formik.errors.subject)
                                        }
                                        helperText={
                                            formik.touched.subject && formik.errors.subject
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <FormLabel>Status</FormLabel>
                                    <FormControl fullWidth>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id=""
                                            name="status"
                                            label=""
                                            size="small"
                                            value={formik.values.status || null}
                                            onChange={formik.handleChange}
                                            error={formik.touched.status && Boolean(formik.errors.status)}
                                        >
                                            <MenuItem value="Planned">Planned</MenuItem>
                                            <MenuItem value="Held">Held</MenuItem>
                                            <MenuItem value="Note Held">Note Held</MenuItem>
                                        </Select>
                                        <FormHelperText
                                            error={
                                                formik.touched.status && Boolean(formik.errors.status)
                                            }
                                        >
                                            {formik.touched.status && formik.errors.status}
                                        </FormHelperText>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} sm={6} md={6}>
                                    <FormLabel>Start Date</FormLabel>
                                    <TextField
                                        name='startDate'
                                        type={'datetime-local'}
                                        size='small'
                                        fullWidth
                                        value={dayjs(formik.values.startDate).format('YYYY-MM-DD HH:mm:ss')}
                                        onChange={formik.handleChange}
                                        error={formik.touched.startDate && Boolean(formik.errors.startDate)}
                                        helperText={formik.touched.startDate && formik.errors.startDate}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <FormLabel>End Date</FormLabel>
                                    <TextField
                                        name='endDate'
                                        type={'datetime-local'}
                                        size='small'
                                        fullWidth
                                        value={dayjs(formik.values.endDate).format('YYYY-MM-DD HH:mm:ss')}
                                        onChange={formik.handleChange}
                                        error={formik.touched.endDate && Boolean(formik.errors.endDate)}
                                        helperText={formik.touched.endDate && formik.errors.endDate}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormLabel>Duration</FormLabel>
                                    <FormControl fullWidth>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id=""
                                            name="duration"
                                            label=""
                                            size="small"
                                            value={formik.values.duration || null}
                                            onChange={formik.handleChange}
                                            error={formik.touched.duration && Boolean(formik.errors.duration)}
                                        >
                                            <MenuItem value="15 minutes">15 minutes</MenuItem>
                                            <MenuItem value="30 minutes">30 minutes</MenuItem>
                                            <MenuItem value="45 minutes">45 minutes</MenuItem>
                                            <MenuItem value="1 hour">1 hour</MenuItem>
                                            <MenuItem value="1.5 hours">1.5 hours</MenuItem>
                                            <MenuItem value="2 hours">2 hours</MenuItem>
                                            <MenuItem value="3 hours">3 hours</MenuItem>
                                        </Select>
                                        <FormHelperText
                                            error={
                                                formik.touched.duration && Boolean(formik.errors.duration)
                                            }
                                        >
                                            {formik.touched.duration && formik.errors.duration}
                                        </FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormLabel>Location</FormLabel>
                                    <TextField
                                        id="location"
                                        name="location"
                                        size="small"
                                        fullWidth
                                        value={formik.values.location}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.location &&
                                            Boolean(formik.errors.location)
                                        }
                                        helperText={
                                            formik.touched.location && formik.errors.location
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormLabel>Related To</FormLabel>
                                    <FormControl fullWidth>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id=""
                                            name="relatedTo"
                                            label=""
                                            size="small"
                                            value={formik.values.relatedTo || null}
                                            onChange={formik.handleChange}
                                            error={formik.touched.relatedTo && Boolean(formik.errors.relatedTo)}
                                        >
                                            <MenuItem value="Lead" selected>Lead</MenuItem>
                                            <MenuItem value="Contact">Contact</MenuItem>
                                        </Select>
                                        <FormHelperText
                                            error={
                                                formik.touched.relatedTo && Boolean(formik.errors.relatedTo)
                                            }
                                        >
                                            {formik.touched.relatedTo && formik.errors.relatedTo}
                                        </FormHelperText>
                                    </FormControl>
                                </Grid>
                                {
                                    formik.values.relatedTo === "Lead" &&
                                    <Grid item xs={12} sm={6}>
                                        <FormLabel>Lead</FormLabel>
                                        <Autocomplete
                                            id="lead-autocomplete"
                                            options={leadData}
                                            getOptionLabel={(lead) => `${lead.firstName} ${lead.lastName}`}
                                            value={leadData.find(lead => lead._id === formik.values.lead_id) || null}
                                            onChange={(event, newValue) => {
                                                formik.setFieldValue("lead_id", newValue ? newValue._id : "");
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    size="small"
                                                    error={formik.touched.lead_id && Boolean(formik.errors.lead_id)}
                                                    helperText={formik.touched.lead_id && formik.errors.lead_id}
                                                />
                                            )}
                                        />
                                    </Grid>
                                }

                                {
                                    formik.values.relatedTo === "Contact" &&
                                    <Grid item xs={12} sm={6}>
                                        <FormLabel>Contact</FormLabel>
                                        <Autocomplete
                                            id="contact-autocomplete"
                                            options={contactData}
                                            getOptionLabel={(contact) => `${contact.firstName} ${contact.lastName}`}
                                            value={contactData.find(contact => contact._id === formik.values.contact_id) || null}
                                            onChange={(event, newValue) => {
                                                formik.setFieldValue("contact_id", newValue ? newValue._id : "");
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    size="small"
                                                    error={formik.touched.contact_id && Boolean(formik.errors.contact_id)}
                                                    helperText={formik.touched.contact_id && formik.errors.contact_id}
                                                />
                                            )}
                                        />
                                    </Grid>
                                }

                                <Grid item xs={12} sm={12}>
                                    <FormLabel>Note</FormLabel>
                                    <TextField
                                        id="note"
                                        name="note"
                                        size="small"
                                        rows={5}
                                        multiline
                                        fullWidth
                                        value={formik.values.note}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.note &&
                                            Boolean(formik.errors.note)
                                        }
                                        helperText={
                                            formik.touched.note && formik.errors.note
                                        }
                                    />
                                </Grid>
                            </Grid>
                        </DialogContentText>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button
                        type="submit"
                        variant="contained"
                        onClick={formik.handleSubmit}
                        style={{ textTransform: "capitalize" }}
                        color="secondary"
                        startIcon={<FiSave />}
                    >
                        Save
                    </Button>
                    <Button
                        type="reset"
                        variant="outlined"
                        style={{ textTransform: "capitalize" }}
                        startIcon={<GiCancel />}
                        onClick={() => {
                            formik.resetForm()
                            handleClose()
                        }}
                        color="error"
                    >
                        Cancle
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Editmeetings