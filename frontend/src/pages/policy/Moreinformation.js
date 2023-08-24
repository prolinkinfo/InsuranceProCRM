/* eslint-disable react/prop-types */
import { Box, Card, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import Palette from '../../theme/palette'
import Addemail from '../../components/email/Addemail'

const Moreinformation = ({ data }) => {

    const [open, setOpen] = useState(false)

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    // open instagram
    const handleInsta = (link) => {
        const url = `https://www.instagram.com/${link}`
        window.open(url)
    }

    // open Twitter
    const handleTwitter = (link) => {
        const url = `https://twitter.com/${link}`
        window.open(url)
    }

    // dfgdfg
    return (
        <div>
            {/* Add Email Model */}
            <Addemail open={open} handleClose={handleClose} _id={data?._id} receiver={data} />

            <Card style={{ borderTopLeftRadius: "0px", borderTopRightRadius: "0px" }}>
                <Box p={3}>
                    <Grid container display="flex" spacing={4}>
                        <Grid item xs={12} sm={6} >
                            <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} pb={2}>
                                <Typography variant="h4" pb={2} >Insured Details :-</Typography>
                                <Typography variant="body1">Insured person's name :</Typography>
                                {
                                    data?.contact_id ?
                                        <Link to={`/dashboard/contact/view/${data?.contact_id?._id}`} style={{textDecoration:"none"}}>
                                            <Typography variant="body2" color={Palette.primary.main} textTransform={"capitalize"}>{`${data?.contact_id?.firstName} ${data?.contact_id?.lastName}`}</Typography>
                                        </Link>
                                        :
                                        <Typography variant="body2" color={Palette.grey[600]} textTransform={"capitalize"}>{data?.insuredPersonName}</Typography>
                                }
                            </Grid>
                            <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
                                <Typography variant="body1">Insured person's date of birth :</Typography>
                                <Typography variant="body2" color={Palette.grey[600]}>
                                    {
                                        data?.insuredPersonDateOfBirth ? dayjs(data?.insuredPersonDateOfBirth).format('MM/DD/YYYY') : "--"
                                    }
                                </Typography>
                            </Grid>
                            <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
                                <Typography variant="body1"> Relationship to the insured (if applicable) :</Typography>
                                <Typography variant="body2" color={Palette.grey[600]}>{data?.relationshipToTheInsured ? data?.relationshipToTheInsured : "--"}</Typography>
                            </Grid>
                            <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
                                <Typography variant="h4" py={2} >Additional Insured :-</Typography>
                                <Typography variant="body1">Additional insured person's name :</Typography>
                                <Typography variant="body2" color={Palette.grey[600]} textTransform={"capitalize"}>{data?.additionalInsuredPersonName ? data?.additionalInsuredPersonName : "--"}</Typography>
                            </Grid>
                            <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
                                <Typography variant="body1">Additional Insured person's date of birth :</Typography>
                                <Typography variant="body2" color={Palette.grey[600]}>
                                    {
                                        data?.additionalInsuredDateOfBirth ? dayjs(data?.additionalInsuredDateOfBirth).format('MM/DD/YYYY') : "--"
                                    }
                                </Typography>
                            </Grid>
                            <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
                                <Typography variant="body1"> Relationship to the insured (if applicable) : </Typography>
                                <Typography variant="body2" color={Palette.grey[600]}>{data?.additionalRelationshipToTheInsured ? data?.additionalRelationshipToTheInsured : "--"}</Typography>
                            </Grid>

                            <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
                                <Typography variant="h4" py={2} >Underwriting Information :-</Typography>
                                <Typography variant="body1">Name :</Typography>
                                <Typography variant="body2" color={Palette.grey[600]} textTransform={"capitalize"}>{data?.underwriterName ? data?.underwriterName : "--"}</Typography>
                            </Grid>
                            <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
                                <Typography variant="body1">Email :</Typography>
                                <Typography variant="body2" color={Palette.grey[600]}>{data?.underwriterEmail ? data?.underwriterEmail : "--"}</Typography>
                            </Grid>
                            <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
                                <Typography variant="body1">Phone :</Typography>
                                <Typography variant="body2" color={Palette.grey[600]}>{data?.underwriterPhone ? data?.underwriterPhone : "--"}</Typography>
                            </Grid>
                            <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
                                <Typography variant="body1">Decisions Or Remark:</Typography>
                                <Typography variant="body2" color={Palette.grey[600]}>{data?.underwriterDecisions ? data?.underwriterDecisions : "--"}</Typography>
                            </Grid>

                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} pb={2}>
                                <Typography variant="h4" pb={2} >Insured person's contact information :-</Typography>
                                <Typography variant="body1"> Phone Number :</Typography>
                                <Typography variant="body2" color={Palette.grey[600]}>{data?.phoneNumber ? data?.phoneNumber : "--"}</Typography>
                            </Grid>
                            <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
                                <Typography variant="body1">Email :</Typography>
                                <Typography variant="body2" color={Palette.primary.main} onClick={handleOpen} style={{ cursor: "pointer" }}>{data?.emailAddress ? data?.emailAddress : "--"}</Typography>
                            </Grid>
                            <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2} display={"flex"}>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="body1">Instagram Profile :</Typography>
                                    <Typography variant="body2" color={Palette.grey[600]} onClick={() => data?.instagramProfile ? handleInsta(data?.instagramProfile) : "--"} style={{ cursor: "pointer", textDecoration: "none", color: Palette.primary.main }}>
                                        {data?.instagramProfile ? data?.instagramProfile : "--"}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="body1"> Twitter Profile :</Typography>
                                    <Typography variant="body2" color={Palette.grey[600]} onClick={() => data?.twitterProfile ? handleTwitter(data?.twitterProfile) : "--"} style={{ cursor: "pointer", textDecoration: "none", color: Palette.primary.main }}>
                                        {data?.twitterProfile ? data?.twitterProfile : "--"}
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
                                <Typography variant="h4" py={2} >Additional Insured contact information :-</Typography>
                                <Typography variant="body1"> Phone Number :</Typography>
                                <Typography variant="body2" color={Palette.grey[600]}>{data?.additionalPhoneNumber ? data?.additionalPhoneNumber : "--"}</Typography>
                            </Grid>
                            <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
                                <Typography variant="body1">Email :</Typography>
                                <Typography variant="body2" color={Palette.grey[600]}>{data?.additionalEmailAddress ? data?.additionalEmailAddress : "--"}</Typography>
                            </Grid>
                            <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2} display={"flex"}>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="body1">Instagram Profile :</Typography>
                                    <Typography variant="body2" color={Palette.grey[600]} onClick={() => data?.additionalInstagramProfile ? handleInsta(data?.additionalInstagramProfile) : "--"} style={{ cursor: "pointer", textDecoration: "none", color: Palette.primary.main }}>
                                        {data?.additionalInstagramProfile ? data?.additionalInstagramProfile : "--"}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="body1"> Twitter Profile :</Typography>
                                    <Typography variant="body2" color={Palette.grey[600]} onClick={() => data?.additionalTwitterProfile ? handleTwitter(data?.additionalTwitterProfile) : "--"} style={{ cursor: "pointer", textDecoration: "none", color: Palette.primary.main }}>
                                        {data?.additionalTwitterProfile ? data?.additionalTwitterProfile : "--"}
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
                                <Typography variant="h4" py={2} >Policy Premiums and Payments :-</Typography>
                                <Typography variant="body1">Premium amount :</Typography>
                                <Typography variant="body2" color={Palette.grey[600]}>{data?.premiumAmount ? data?.premiumAmount : "--"}</Typography>
                            </Grid>
                            <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
                                <Typography variant="body1">Frequency of premium payments :</Typography>
                                <Typography variant="body2" color={Palette.grey[600]}>{data?.FrequencyOfPremiumPayments ? data?.FrequencyOfPremiumPayments : "--"}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Card>
        </div>
    )
}

export default Moreinformation
