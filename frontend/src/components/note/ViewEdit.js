/* eslint-disable react-hooks/exhaustive-deps */
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
import { DialogActions, DialogContent, FormLabel } from "@mui/material";
import { useEffect } from "react";
import { apidelete, apiget, apiput } from "../../service/api";



const ViewNote = (props) => {
    const { open, handleClose, setUserAction, id } = props

    const [notesData, setNotesData] = React.useState({})

    // -----------  validationSchema
    const validationSchema = yup.object({
        subject: yup.string().required("Subject is required"),
        note: yup.string().required("Note is required")
    });


    // -----------   initialValues
    const initialValues = {
        subject: notesData?.subject,
        note: notesData?.note,
        modifiedOn: ""
    };

    // edit api
    const EditNote = async (values) => {
        const data = values;
        const result = await apiput(`note/edit/${id}`, data)
        setUserAction(result)
        if (result && result.status === 200) {
            handleClose();
        }
    }

    // delete api
    const deletedata = async () => {
        const result = await apidelete(`note/delete/${id}`)
        setUserAction(result)
        handleClose();
    }

    // formik
    const formik = useFormik({
        initialValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            const noteData = {
                subject: values.subject,
                note: values.note,
                modifiedOn: new Date()
            }
            EditNote(noteData)
        },
    });


    // fetch api
    const fetchdata = async () => {
        if (id) {
            const result = await apiget(`note/view/${id}`)
            if (result && result.status === 200) {
                setNotesData(result?.data)
            }
        }
    }

    useEffect(() => {
        fetchdata();
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
                    <Typography variant="h6">View & Update Note</Typography>
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
                        color="error"
                        onClick={() => {
                            formik.resetForm()
                            handleClose()
                        }}
                    >
                        Cancle
                    </Button>
                </DialogActions>

            </Dialog>
        </div>
    );
}

export default ViewNote