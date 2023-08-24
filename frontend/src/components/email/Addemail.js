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
// eslint-disable-next-line import/no-unresolved
import { apipost } from "src/service/api";
import { toast } from "react-toastify";
import { FormLabel } from "@mui/material";

const Addemail = (props) => {
    const { open, handleClose, _id, setUserAction, receiver } = props

    const user = JSON.parse(localStorage.getItem('user'))

    // -----------  validationSchema
    const validationSchema = yup.object({
        subject: yup.string().required("Subject is required"),
        receiver: yup.string().email().required("Receiver is required"),
        message: yup.string().required("Message is required"),
    });

    // -----------   initialValues
    const initialValues = {
        sender: user?.emailAddress,
        subject: "",
        receiver: receiver?.emailAddress,
        message: "",
        lead_id: _id,
        contact_id: _id,
        createdBy: user?._id,
        policy_id: _id

    };

    // add claim api
    const addClaim = async (values) => {
        const data = values;
        const result = await apipost('email/add', data)
        setUserAction(result)

        if (result && result.status === 201) {
            handleClose();
            formik.resetForm();
            toast.success(result.data.message)
        }
    }
    // formik
    const formik = useFormik({
        initialValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit: async (values, { resetForm }) => {
            addClaim(values)
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
                    <Typography variant="h6">Email </Typography>
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
                                <Grid item xs={12} sm={12}>
                                    <FormLabel>Receiver</FormLabel>
                                    <TextField
                                        id="receiver"
                                        name="receiver"
                                        size="small"
                                        fullWidth
                                        value={formik.values.receiver}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.receiver &&
                                            Boolean(formik.errors.receiver)
                                        }
                                        helperText={
                                            formik.touched.receiver && formik.errors.receiver
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                    <FormLabel>Subject</FormLabel>
                                    <TextField
                                        id="subject"
                                        name="subject"
                                        size="small"
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


                                <Grid item xs={12} sm={12}>
                                    <FormLabel>Message</FormLabel>
                                    <TextField
                                        id="message"
                                        name="message"
                                        size="small"
                                        fullWidth
                                        rows={4}
                                        multiline
                                        value={formik.values.message}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.message &&
                                            Boolean(formik.errors.message)
                                        }
                                        helperText={
                                            formik.touched.message && formik.errors.message
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

export default Addemail