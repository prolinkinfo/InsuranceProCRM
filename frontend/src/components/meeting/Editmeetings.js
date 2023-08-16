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
import { useEffect } from "react";
import { FiSave } from "react-icons/fi";
import { GiCancel } from "react-icons/gi";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { FormControl, FormHelperText, FormLabel } from "@mui/material";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { apiget, apiput } from "../../service/api";
import Palette from "../../theme/palette";

const Editmeetings = (props) => {

    const { handleClose, open, id, fetchMeeting } = props

    const [meetingDetails, setMeetingDetails] = React.useState({});
    const params = useParams();

    const userid = localStorage.getItem('user_id')

    // -----------  validationSchema
    const validationSchema = yup.object({
        meetingAgenda: yup.string().required("Meeting Agenda is required"),
        meetingAttendes: yup.string().required("Meeting Attendees is required"),
        meetingLocation: yup.string().required("Meeting Location is required"),
        meetingDateTime: yup.string().required("Meeting Date Time is required"),
        meetingNotes: yup.string().required("Meeting Notes is required"),
    });

    // -----------   initialValues
    const initialValues = {
        meetingAgenda: meetingDetails?.meetingAgenda,
        meetingAttendes: meetingDetails?.meetingAttendes,
        meetingLocation: meetingDetails?.meetingLocation,
        meetingDateTime: meetingDetails?.meetingDateTime,
        meetingNotes: meetingDetails?.meetingNotes,
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

    const formik = useFormik({
        initialValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            const meetingData = {
                meetingAgenda: values.meetingAgenda,
                meetingAttendes: values.meetingAttendes,
                meetingLocation: values.meetingLocation,
                meetingDateTime: values.meetingDateTime,
                meetingNotes: values.meetingNotes,
                modifiedOn: new Date()
            }
            EditMeeting(meetingData)
        },
    });

    useEffect(() => {
        fetchdata();
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
                                    <FormLabel>Meetin Agenda</FormLabel>
                                    <TextField
                                        id="meetingAgenda"
                                        name="meetingAgenda"
                                        size="small"
                                        maxRows={10}
                                        fullWidth
                                        value={formik.values.meetingAgenda}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.meetingAgenda &&
                                            Boolean(formik.errors.meetingAgenda)
                                        }
                                        helperText={
                                            formik.touched.meetingAgenda && formik.errors.meetingAgenda
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <FormLabel>Meeting Attendes</FormLabel>
                                    <TextField
                                        id="meetingAttendes"
                                        name="meetingAttendes"
                                        size="small"
                                        maxRows={10}
                                        fullWidth
                                        value={formik.values.meetingAttendes}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.meetingAttendes &&
                                            Boolean(formik.errors.meetingAttendes)
                                        }
                                        helperText={
                                            formik.touched.meetingAttendes && formik.errors.meetingAttendes
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormLabel>Meeting Location</FormLabel>
                                    <TextField
                                        id="meetingLocation"
                                        name="meetingLocation"
                                        size="small"
                                        fullWidth
                                        value={formik.values.meetingLocation}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.meetingLocation &&
                                            Boolean(formik.errors.meetingLocation)
                                        }
                                        helperText={
                                            formik.touched.meetingLocation && formik.errors.meetingLocation
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormLabel>Meeting DateTime</FormLabel>
                                    <TextField
                                        id="meetingDateTime"
                                        name="meetingDateTime"
                                        size="small"
                                        type="datetime-local"
                                        fullWidth
                                        value={formik.values.meetingDateTime}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.meetingDateTime &&
                                            Boolean(formik.errors.meetingDateTime)
                                        }
                                        helperText={
                                            formik.touched.meetingDateTime && formik.errors.meetingDateTime
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <FormLabel>Meeting Notes</FormLabel>
                                    <TextField
                                        id="meetingNotes"
                                        name="meetingNotes"
                                        size="small"
                                        rows={5}
                                        multiline
                                        fullWidth
                                        value={formik.values.meetingNotes}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.meetingNotes &&
                                            Boolean(formik.errors.meetingNotes)
                                        }
                                        helperText={
                                            formik.touched.meetingNotes && formik.errors.meetingNotes
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