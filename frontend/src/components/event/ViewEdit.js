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
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, Grid, MenuItem, Radio, RadioGroup, Select, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
// import { apipost } from "../../service/api";
import Typography from "@mui/material/Typography";
import ClearIcon from "@mui/icons-material/Clear";
import moment from "moment";
import dayjs from "dayjs";
import { apiget, apiput } from "../../service/api";

const ViewEdit = ({ open, handleClose, id, deletedata, lead, contact, setUserAction }) => {

    const [checked, setChecked] = useState(false);
    const [taskData, setTaskData] = useState({})
    const [user, setUser] = useState([])
    const [leadData, setLeadData] = useState([])
    const [contactData, setContactData] = useState([])

    const userid = localStorage.getItem('user_id')
    const userRole = localStorage.getItem("userRole");
    const userdata = JSON.parse(localStorage.getItem('user'));

    const validationSchema = yup.object({
        title: yup.string().required(),
        category: yup.string(),
        description: yup.string(),
        note: yup.string(),
        assignTo: yup.string().required(),
        reminder: yup.string(),
        start: yup.string().required(),
        end: yup.string(),
        backgroundColor: yup.string(),
        borderColor: yup.string(),
        textColor: yup.string(),
        display: yup.string(),
        url: yup.string(),
        createdBy: yup.string(),
    });

    const initialValues = {
        title: taskData?.title,
        category: taskData?.category,
        description: taskData?.description,
        start: moment(taskData?.start).format('MM-DD-YYYY'),
        end: taskData?.end,
        assignTo: taskData?.assignTo?._id,
        backgroundColor: taskData?.backgroundColor,
        textColor: taskData?.textColor,
        display: taskData?.display,
        url: taskData?.url,
        note: taskData?.note,
        lead_id: taskData?.lead_id?._id,
        contact_id: taskData?.contact_id?._id,
        modifiedOn: ""
    }


    const EditTask = async (values) => {
        const data = values;
        const result = await apiput(`task/edit/${id}`, data)
        if (result && result.status === 200) {
            handleClose();
        }
    }

    // formik
    const formik = useFormik({
        initialValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            const eventData = {
                title: values.title,
                category: values.category,
                description: values.description,
                start: values.start,
                end: values.end,
                assignTo: values.assignTo,
                backgroundColor: values.backgroundColor,
                textColor: values.textColor,
                display: values.display,
                url: values.url,
                note: values.note,
                lead_id: values.lead_id,
                contact_id: values.contact_id,
                modifiedOn: new Date()
            }
            EditTask(eventData)
        },
    });



    // task api
    const fetchdata = async () => {
        const result = await apiget(`task/view/${id}`)
        setUserAction(result)
        if (result && result.status === 200) {
            setTaskData(result?.data?.tasks)
        }
    }

    // user api
    const fetchUserData = async () => {
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
        fetchUserData();
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
                    <Typography variant="h6">View and Edit Task </Typography>
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
                                    <FormLabel id="demo-row-radio-buttons-group-label">Title</FormLabel>
                                    <TextField
                                        id="title"
                                        name="title"
                                        label=""
                                        fullWidth
                                        size="small"
                                        value={formik.values.title}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.title &&
                                            Boolean(formik.errors.title)
                                        }
                                        helperText={
                                            formik.touched.title && formik.errors.title
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <FormLabel id="demo-row-radio-buttons-group-label">Category</FormLabel>
                                    <FormControl fullWidth>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id=""
                                            name="category"
                                            label=""
                                            size="small"
                                            value={formik.values.category || null}
                                            onChange={formik.handleChange}
                                            error={formik.touched.category && Boolean(formik.errors.category)}
                                        >
                                            <MenuItem value="Selete category" disabled>Selete category</MenuItem>
                                            <MenuItem value="Anniversary">Anniversary</MenuItem>
                                            <MenuItem value="Meeting">Meeting</MenuItem>
                                            <MenuItem value="Phone Call">Phone Call</MenuItem>
                                            <MenuItem value="Task">Task</MenuItem>
                                            <MenuItem value="Birthday">Birthday</MenuItem>
                                        </Select>
                                        <FormHelperText
                                            error={
                                                formik.touched.category && Boolean(formik.errors.category)
                                            }
                                        >
                                            {formik.touched.category && formik.errors.category}
                                        </FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <FormLabel id="demo-row-radio-buttons-group-label">Description</FormLabel>

                                    <TextField
                                        id="Description"
                                        name="description"
                                        label=""
                                        fullWidth
                                        size="small"
                                        value={formik.values.description}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.description &&
                                            Boolean(formik.errors.description)
                                        }
                                        helperText={
                                            formik.touched.description && formik.errors.description
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <FormLabel id="demo-row-radio-buttons-group-label">Assign To</FormLabel>
                                    <FormControl fullWidth>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id=""
                                            name="assignmentTo"
                                            label=""
                                            size="small"
                                            value={formik.values.assignTo}
                                            onChange={formik.handleChange}
                                            error={formik.touched.assignmentTo && Boolean(formik.errors.assignTo)}
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
                                    lead &&
                                    <Grid item xs={12} sm={6} md={6}>
                                        <FormLabel id="demo-row-radio-buttons-group-label">Related To Lead</FormLabel>
                                        <FormControl fullWidth>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id=""
                                                name="lead_id"
                                                label=""
                                                size="small"
                                                value={formik.values.lead_id}
                                                onChange={formik.handleChange}
                                                error={formik.touched.lead_id && Boolean(formik.errors.lead_id)}
                                            >
                                                {
                                                    leadData.map((lead) => {
                                                        return (
                                                            <MenuItem key={lead._id} value={lead._id}>
                                                                {`${lead.firstName} ${lead.lastName}`}
                                                            </MenuItem>
                                                        );
                                                    })
                                                }
                                                {/* {
                                                    formik.values.lead_id && <Link to={`dashboard/lead/view/${lead._id}`}> <VisibilityIcon /></Link>
                                                } */}
                                            </Select>

                                        </FormControl>
                                    </Grid>
                                }
                                {
                                    contact &&
                                    <Grid item xs={12} sm={6} md={6}>
                                        <FormLabel id="demo-row-radio-buttons-group-label">Related To Contact</FormLabel>
                                        <FormControl fullWidth>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id=""
                                                name="contact_id"
                                                label=""
                                                size="small"
                                                value={formik.values.contact_id}
                                                onChange={formik.handleChange}
                                                error={formik.touched.contact_id && Boolean(formik.errors.contact_id)}
                                            >
                                                <MenuItem selected disabled>Selecte</MenuItem>
                                                {
                                                    contactData.map((contact) => {
                                                        return (
                                                            <MenuItem key={contact._id} value={contact._id}>
                                                                {`${contact.firstName} ${contact.lastName}`}
                                                            </MenuItem>
                                                        );
                                                    })
                                                }
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                }
                                <Grid item xs={12} sm={6} md={6}>
                                    <FormGroup>
                                        <FormControlLabel control={<Checkbox onChange={(e) => setChecked(e.target.checked)} checked={checked} />} label="all day ?" />
                                    </FormGroup>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6} >
                                    <FormLabel>all Day</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="display"
                                            value={formik.values.display}
                                            onChange={formik.handleChange}
                                        >
                                            <FormControlLabel value="background" control={<Radio />} label="Yes" />
                                            <FormControlLabel value="no" control={<Radio />} label="No" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} sm={6} md={6}>
                                    <FormLabel>Start Date</FormLabel>
                                    <TextField
                                        name='start'
                                        type={checked ? 'date' : 'datetime-local'}
                                        size='small'
                                        fullWidth
                                        value={checked ? dayjs(formik.values.start).format('YYYY-MM-DD') : dayjs(formik.values.start).format('YYYY-MM-DD HH:mm:ss')}
                                        onChange={formik.handleChange}
                                        error={formik.touched.start && Boolean(formik.errors.start)}
                                        helperText={formik.touched.start && formik.errors.start}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <FormLabel>End Date</FormLabel>
                                    <TextField
                                        name='end'
                                        type={checked ? 'date' : 'datetime-local'}
                                        size='small'
                                        fullWidth
                                        value={checked ? dayjs(formik.values.end).format('YYYY-MM-DD') : dayjs(formik.values.end).format('YYYY-MM-DD HH:mm:ss')}
                                        onChange={formik.handleChange}
                                        error={formik.touched.end && Boolean(formik.errors.end)}
                                        helperText={formik.touched.end && formik.errors.end}
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
                                    <FormLabel id="demo-row-radio-buttons-group-label">URL</FormLabel>

                                    <TextField
                                        id="url"
                                        name="url"
                                        label=""
                                        size="small"
                                        fullWidth
                                        value={formik.values.url}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.url &&
                                            Boolean(formik.errors.url)
                                        }
                                        helperText={
                                            formik.touched.url && formik.errors.url
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
                        Update
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        onClick={deletedata}
                        style={{ textTransform: "capitalize" }}
                        color="error"
                    >
                        Delete
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

export default ViewEdit
