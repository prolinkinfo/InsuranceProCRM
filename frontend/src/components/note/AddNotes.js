/* eslint-disable react/prop-types */
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import ClearIcon from "@mui/icons-material/Clear";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { DialogActions, DialogContent, FormLabel } from "@mui/material";
import { apipost } from "../../service/api";



const Addnotes = (props) => {
    const { open, handleClose, _id, setUserAction } = props

    // -----------  validationSchema
    const validationSchema = yup.object({
        subject: yup.string().required("Subject is required"),
        note: yup.string().required("Note is required")
    });

    // -----------   initialValues
    const initialValues = {
        subject: "",
        note: "",
        lead_id: _id,
        contact_id: _id,
        policy_id: _id
    };

    // add note api
    const addNote = async (values) => {
        const data = values;
        const result = await apipost('note/add', data)
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
            addNote(values)
            resetForm(values);
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
                    <Typography variant="h6">Create Note </Typography>
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
                                <Grid item xs={12} sm={12} md={12}>
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

export default Addnotes