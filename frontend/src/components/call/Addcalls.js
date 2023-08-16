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
import { FormControl, FormHelperText, FormLabel, Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { toast } from "react-toastify";
import { apipost } from "../../service/api";

const Addcalls = (props) => {
    const { open, handleClose, _id, setUserAction } = props

    const userid = localStorage.getItem('user_id')

    // -----------  validationSchema
    const validationSchema = yup.object({
        callType: yup.string().required("Call Type is required"),
        callDuration: yup.string().required("Call Duration is required"),
        callOutcome: yup.string().required("Call Outcome is required"),
        callDateTime: yup.string().required("Call DateTime is required"),
        callerName: yup.string().required("Caller Name is required"),
        callNotes: yup.string().required("Call Notes is required"),

    });

    // -----------   initialValues
    const initialValues = {
        callType: "",
        callDuration: "",
        callOutcome: "",
        callDateTime: "",
        callerName: "",
        callNotes: "",
        createdBy: userid,
        lead_id: _id,
        contact_id: _id,
    };

    // add call api
    const addCall = async (values) => {
        const data = values;
        const result = await apipost('call/add', data)
        setUserAction(result)

        if (result && result.status === 201) {
            formik.resetForm();
            handleClose();
            toast.success(result.data.message)
        }
    }

    // formik
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            addCall(values)
            resetForm();
        },
    });

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
                    <Typography variant="h6">Add Call </Typography>
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
                                    <FormControl fullWidth>
                                        <FormLabel>Call Type</FormLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="callType"
                                            name="callType"
                                            size="small"
                                            value={formik.values.callType}
                                            onChange={formik.handleChange}
                                            error={formik.touched.callType && Boolean(formik.errors.callType)}
                                        >
                                            <MenuItem value="Incoming">Incoming</MenuItem>
                                            <MenuItem value="Outgoing">Outgoing</MenuItem>
                                        </Select>
                                        <FormHelperText
                                            error={
                                                formik.touched.callType && Boolean(formik.errors.callType)
                                            }
                                        >
                                            {formik.touched.callType && formik.errors.callType}
                                        </FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <FormControl fullWidth>
                                        <FormLabel>Call Duration</FormLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="callDuration"
                                            name="callDuration"
                                            size="small"
                                            value={formik.values.callDuration}
                                            onChange={formik.handleChange}
                                            error={formik.touched.callDuration && Boolean(formik.errors.callDuration)}
                                        >
                                            <MenuItem value="15 mini">15 min</MenuItem>
                                            <MenuItem value="30 mini">30 min</MenuItem>
                                            <MenuItem value="30 mini">45 min</MenuItem>
                                        </Select>
                                        <FormHelperText
                                            error={
                                                formik.touched.callDuration && Boolean(formik.errors.callDuration)
                                            }
                                        >
                                            {formik.touched.callDuration && formik.errors.callDuration}
                                        </FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormLabel>Call DateTime</FormLabel>
                                    <TextField
                                        id="callDateTime"
                                        name="callDateTime"
                                        size="small"
                                        type="datetime-local"
                                        fullWidth
                                        value={formik.values.callDateTime}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.callDateTime &&
                                            Boolean(formik.errors.callDateTime)
                                        }
                                        helperText={
                                            formik.touched.callDateTime && formik.errors.callDateTime
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormLabel>Caller Name</FormLabel>
                                    <TextField
                                        id="callerName"
                                        name="callerName"
                                        size="small"
                                        fullWidth
                                        value={formik.values.callerName}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.callerName &&
                                            Boolean(formik.errors.callerName)
                                        }
                                        helperText={
                                            formik.touched.callerName && formik.errors.callerName
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <FormLabel>Call Outcome</FormLabel>
                                    <TextField
                                        id="callOutcome"
                                        name="callOutcome"
                                        size="small"
                                        fullWidth
                                        rows={4}
                                        multiline
                                        value={formik.values.callOutcome}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.callOutcome &&
                                            Boolean(formik.errors.callOutcome)
                                        }
                                        helperText={
                                            formik.touched.callOutcome && formik.errors.callOutcome
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <FormLabel>Call Notes</FormLabel>
                                    <TextField
                                        id="callNotes"
                                        name="callNotes"
                                        size="small"
                                        fullWidth
                                        rows={4}
                                        multiline
                                        value={formik.values.callNotes}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.callNotes &&
                                            Boolean(formik.errors.callNotes)
                                        }
                                        helperText={
                                            formik.touched.callNotes && formik.errors.callNotes
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
        </div>
    );
}

export default Addcalls