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
// eslint-disable-next-line import/no-unresolved
import { apipost } from "src/service/api";
import { toast } from "react-toastify";

const Addclaim = (props) => {
    const { open, handleClose, _id, setUserAction } = props

    // -----------  validationSchema
    const validationSchema = yup.object({
        policyNumber: yup.string().required("Policy Number is required"), 
        claimType: yup.string().required("Claim Type is required"),
        claimAmount: yup.string().required("Claim Amount is required"),
        claimDate: yup.string().required("Claim Date is required"),
        claimStatus: yup.string().required("Claim Status is required"),
        claimNotes: yup.string().required("Claim Notes is required"),

    });

    // -----------   initialValues
    const initialValues = {
        policyNumber: "",
        claimType: "",
        claimAmount: "",
        claimDate: "",
        claimStatus: "",
        claimNotes: "",
        contact_id: _id,
        policy_id: _id
    };

    // add claim api
    const addClaim = async (values) => {
        const data = values;
        const result = await apipost('claim/add', data)
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
                    <Typography variant="h6">Add Claim </Typography>
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
                                    <FormLabel>Policy Number</FormLabel>
                                    <TextField
                                        id="policyNumber"
                                        name="policyNumber"
                                        size="small"
                                        type="number"
                                        fullWidth
                                        value={formik.values.policyNumber}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.policyNumber &&
                                            Boolean(formik.errors.policyNumber)
                                        }
                                        helperText={
                                            formik.touched.policyNumber && formik.errors.policyNumber
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <FormControl fullWidth>
                                        <FormLabel>Claim Type</FormLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="claimType"
                                            name="claimType"
                                            size="small"
                                            value={formik.values.claimType}
                                            onChange={formik.handleChange}
                                            error={formik.touched.claimType && Boolean(formik.errors.claimType)}
                                        >
                                            <MenuItem value="Auto Insurance ">Auto Insurance </MenuItem>
                                            <MenuItem value="Health Insurance ">Health Insurance </MenuItem>
                                            <MenuItem value="Life Insurance ">Life Insurance </MenuItem>
                                            <MenuItem value="Home Insurance ">Home Insurance </MenuItem>
                                        </Select>
                                        <FormHelperText
                                            error={
                                                formik.touched.claimType && Boolean(formik.errors.claimType)
                                            }
                                        >
                                            {formik.touched.claimType && formik.errors.claimType}
                                        </FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormLabel>Claim Date</FormLabel>
                                    <TextField
                                        id="claimDate"
                                        name="claimDate"
                                        size="small"
                                        type="date"
                                        fullWidth
                                        value={formik.values.claimDate}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.claimDate &&
                                            Boolean(formik.errors.claimDate)
                                        }
                                        helperText={
                                            formik.touched.claimDate && formik.errors.claimDate
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormLabel>Claim Amount</FormLabel>
                                    <TextField
                                        id="claimAmount"
                                        name="claimAmount"
                                        size="small"
                                        type="number"
                                        fullWidth
                                        value={formik.values.claimAmount}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.claimAmount &&
                                            Boolean(formik.errors.claimAmount)
                                        }
                                        helperText={
                                            formik.touched.claimAmount && formik.errors.claimAmount
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <FormControl fullWidth>
                                        <FormLabel>Claim Status</FormLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="claimStatus"
                                            name="claimStatus"
                                            size="small"
                                            value={formik.values.claimStatus}
                                            onChange={formik.handleChange}
                                            error={formik.touched.claimStatus && Boolean(formik.errors.claimStatus)}
                                        >
                                            <MenuItem value="Pending">Pending</MenuItem>
                                            <MenuItem value="Under Investigation">Under Investigation</MenuItem>
                                            <MenuItem value="Approved">Approved</MenuItem>
                                            <MenuItem value="Denied">Denied</MenuItem>
                                        </Select>
                                        <FormHelperText
                                            error={
                                                formik.touched.claimStatus && Boolean(formik.errors.claimStatus)
                                            }
                                        >
                                            {formik.touched.claimStatus && formik.errors.claimStatus}
                                        </FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <FormLabel>Claim Notes</FormLabel>
                                    <TextField
                                        id="claimNotes"
                                        name="claimNotes"
                                        size="small"
                                        fullWidth
                                        rows={4}
                                        multiline
                                        value={formik.values.claimNotes}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.claimNotes &&
                                            Boolean(formik.errors.claimNotes)
                                        }
                                        helperText={
                                            formik.touched.claimNotes && formik.errors.claimNotes
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

export default Addclaim