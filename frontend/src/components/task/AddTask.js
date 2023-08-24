/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Autocomplete, FormControl, FormControlLabel, FormHelperText, FormLabel, Grid, MenuItem, Radio, RadioGroup, Select, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Typography from "@mui/material/Typography";
import ClearIcon from "@mui/icons-material/Clear";
import { toast } from "react-toastify";
import { apiget, apipost } from "../../service/api";


const AddEvent = ({ open, handleClose, setUserAction, _id }) => {

    const [user, setUser] = useState([])
    const [leadData, setLeadData] = useState([])
    const [contactData, setContactData] = useState([])
    const userid = localStorage.getItem('user_id')
    const userRole = localStorage.getItem("userRole");
    const userdata = JSON.parse(localStorage.getItem('user'));

    const validationSchema = yup.object({
        subject: yup.string().required("Subject is required"),
        status: yup.string().required("Status is required"),
        startDate: yup.string().required("Start Date is required"),
        endDate: yup.string().required("End date is required"),
        priority: yup.string().required("Priority is required"),
        assignTo: yup.string().required("Assign To is required"),
        relatedTo: yup.string().required("Related To is required"),
    });

    const initialValues = {
        subject: "",
        status: "",
        startDate: "",
        endDate: "",
        relatedTo: "",
        assignTo: "",
        backgroundColor: "",
        textColor: "",
        priority: "",
        note: "",
        lead_id: _id,
        contact_id: _id,
        createdBy: userid

    }
    const addTask = async (values) => {
        const data = values
        const result = await apipost('task/add', data)
        setUserAction(result)
        if (result && result.status === 201) {
            handleClose()
            formik.resetForm();
            toast.success(result?.data?.message)
        }
    }

    // formik
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            addTask(values)
        },
    });

    // user api
    const fetchdata = async () => {
        const result = await apiget('user/list')
        if (result && result.status === 200) {
            setUser(result?.data?.result)
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

    useEffect(() => {
        fetchdata();
        fetchLeadData();
        fetchContactData();
    }, [open])

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
                    <Typography variant="h6">Create Task </Typography>
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
                                    <FormLabel id="demo-row-radio-buttons-group-label">Subject</FormLabel>
                                    <TextField
                                        id="subject"
                                        name="subject"
                                        label=""
                                        fullWidth
                                        size="small"
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
                                    <FormControl>
                                        <FormLabel>Related To</FormLabel>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="relatedTo"
                                            value={formik.values.relatedTo}
                                            error={formik.touched.relatedTo && Boolean(formik.errors.relatedTo)}
                                            onChange={formik.handleChange}
                                        >
                                            <FormControlLabel value="Lead" control={<Radio />} label="Lead" />
                                            <FormControlLabel value="Contact" control={<Radio />} label="Contact" />
                                        </RadioGroup>
                                        <FormHelperText
                                            error={
                                                formik.touched.relatedTo && Boolean(formik.errors.relatedTo)
                                            }
                                        >
                                            {formik.touched.relatedTo && formik.errors.relatedTo}
                                        </FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4}>
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
                                            <MenuItem value="Note Started">Note Started</MenuItem>
                                            <MenuItem value="In Progress">In Progress</MenuItem>
                                            <MenuItem value="Completed">Completed</MenuItem>
                                            <MenuItem value="Pending Input">Pending Input</MenuItem>
                                            <MenuItem value="Deferred">Deferred</MenuItem>
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
                                <Grid item xs={12} sm={4}>
                                    <FormLabel>Priority</FormLabel>
                                    <FormControl fullWidth>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id=""
                                            name="priority"
                                            label=""
                                            size="small"
                                            value={formik.values.priority || null}
                                            onChange={formik.handleChange}
                                            error={formik.touched.priority && Boolean(formik.errors.priority)}
                                        >
                                            <MenuItem value="High">High</MenuItem>
                                            <MenuItem value="Medium">Medium</MenuItem>
                                            <MenuItem value="Low">Low</MenuItem>
                                        </Select>
                                        <FormHelperText
                                            error={
                                                formik.touched.priority && Boolean(formik.errors.priority)
                                            }
                                        >
                                            {formik.touched.priority && formik.errors.priority}
                                        </FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <FormLabel id="demo-row-radio-buttons-group-label">Assign To</FormLabel>
                                    <FormControl fullWidth>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id=""
                                            name="assignTo"
                                            label=""
                                            size="small"
                                            value={formik.values.assignTo}
                                            onChange={formik.handleChange}
                                            error={formik.touched.assignTo && Boolean(formik.errors.assignTo)}
                                        >
                                            {
                                                user.role === 'admin' ?
                                                    user.map((user) => {
                                                        if (user.role === 'admin') {
                                                            return (
                                                                <MenuItem key={user._id} value={user._id}>
                                                                    {`${user.firstName} ${user.lastName}`}
                                                                </MenuItem>
                                                            );
                                                        }
                                                        return null;
                                                    })
                                                    :
                                                    <MenuItem key={userdata._id} value={userdata._id}>
                                                        {`${userdata.firstName} ${userdata.lastName}`}
                                                    </MenuItem>
                                            }
                                        </Select>
                                        <FormHelperText
                                            error={
                                                formik.touched.assignTo && Boolean(formik.errors.assignTo)
                                            }
                                        >
                                            {formik.touched.assignTo && formik.errors.assignTo}
                                        </FormHelperText>
                                    </FormControl>
                                </Grid>
                                {
                                    formik.values.relatedTo === "Lead" &&
                                    <Grid item xs={12} sm={12} md={12}>
                                        <FormLabel id="demo-row-radio-buttons-group-label">Related To Lead</FormLabel>
                                        <FormControl fullWidth>
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
                                        </FormControl>
                                    </Grid>
                                }

                                {
                                    formik.values.relatedTo === "Contact" &&
                                    <Grid item xs={12} sm={12} md={12}>
                                        <FormLabel id="demo-row-radio-buttons-group-label">Related To Contact</FormLabel>
                                        <FormControl fullWidth>
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

                                        </FormControl>
                                    </Grid>
                                }

                                <Grid item xs={12} sm={6} md={6}>
                                    <FormLabel>Start Date</FormLabel>
                                    <TextField
                                        name='startDate'
                                        type={'datetime-local'}
                                        size='small'
                                        fullWidth
                                        value={formik.values.startDate}
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
                                        value={formik.values.endDate}
                                        onChange={formik.handleChange}
                                        error={formik.touched.endDate && Boolean(formik.errors.endDate)}
                                        helperText={formik.touched.endDate && formik.errors.endDate}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6} md={6}>
                                    <FormLabel id="demo-row-radio-buttons-group-label">Background Color</FormLabel>
                                    <TextField
                                        id=""
                                        name="backgroundColor"
                                        label=""
                                        type="color"
                                        size="small"
                                        fullWidth
                                        value={formik.values.backgroundColor}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.backgroundColor &&
                                            Boolean(formik.errors.backgroundColor)
                                        }
                                        helperText={
                                            formik.touched.backgroundColor && formik.errors.backgroundColor
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <FormLabel id="demo-row-radio-buttons-group-label">Text Color</FormLabel>
                                    <TextField
                                        id=""
                                        name="textColor"
                                        label=""
                                        type="color"
                                        size="small"
                                        fullWidth
                                        value={formik.values.textColor}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.textColor &&
                                            Boolean(formik.errors.textColor)
                                        }
                                        helperText={
                                            formik.touched.textColor && formik.errors.textColor
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <FormLabel id="demo-row-radio-buttons-group-label">Note</FormLabel>
                                    <TextField
                                        id="Note"
                                        name="note"
                                        label=""
                                        fullWidth
                                        rows={4}
                                        multiline
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
                    >
                        Save
                    </Button>
                    <Button
                        type="reset"
                        variant="outlined"
                        style={{ textTransform: "capitalize" }}
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
        </div >
    );
}

export default AddEvent
