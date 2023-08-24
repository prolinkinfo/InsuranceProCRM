/* eslint-disable react/prop-types */
import styled from '@emotion/styled';
import { Button, Menu, Stack, alpha } from '@mui/material'
import React, { useState } from 'react'
import MenuItem from "@mui/material/MenuItem";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from "@mui/icons-material/Edit";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
        }}
        transformOrigin={{
            vertical: "top",
            horizontal: "right",
        }}
        {...props}
    />
))(({ theme }) => ({
    "& .MuiPaper-root": {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 100,
        boxShadow:
            "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
        "& .MuiMenu-list": {
            padding: "4px 0",
        },
        "& .MuiMenuItem-root": {
            "& .MuiSvgIcon-root": {

                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            "&:active": {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity
                ),
            },
        },
    },
}));

const Actionbutton = (props) => {
    // opne action dropdown button
    const [anchorEl, setAnchorEl] = useState(null);
    const openaction = Boolean(anchorEl);
    const handleClickaction = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseaction = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Stack direction="row" spacing={2} justifyContent="flex-end">
                <Button
                    id="action"
                    aria-controls={openaction ? "action" : undefined}
                    aria-haspopup="true"
                    aria-expanded={openaction ? "true" : undefined}
                    variant="contained"
                    color="secondary"
                    disableElevation
                    onClick={handleClickaction}
                    endIcon={<KeyboardArrowDownIcon />}
                >
                    Actions
                </Button>
                <StyledMenu
                    id="demo-customized-menu"
                    MenuListProps={{
                        "aria-labelledby": "action",
                    }}
                    anchorEl={anchorEl}
                    open={openaction}
                    onClose={handleCloseaction}
                >

                    {
                        props.handleOpen &&
                        <MenuItem onClick={props.handleOpen} disableRipple>
                            <AddIcon />
                            Add
                        </MenuItem>
                    }
                    {
                        props.handleOpenEdit &&
                        <MenuItem onClick={props.handleOpenEdit} disableRipple>
                            <EditIcon />
                            Edit
                        </MenuItem>
                    }

                    {/* <Divider sx={{ my: 0.5 }} /> */}

                    {
                        props.handleOpenDelete &&
                        <MenuItem onClick={props.handleOpenDelete} disableRipple >
                            <DeleteIcon />
                            Delete
                        </MenuItem>
                    }

                    {
                        props.handleExport && <MenuItem disableRipple onClick={props.handleExport}>
                            <SaveAltIcon />
                            Export CSV
                        </MenuItem>
                    }
                </StyledMenu>
                <Button variant="contained" color="secondary" onClick={props.back} startIcon={<ArrowBackIosIcon />}>
                    Back
                </Button>
            </Stack>
        </div>
    )
}

export default Actionbutton
