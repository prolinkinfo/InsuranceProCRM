/* eslint-disable react/prop-types */
import { Box, Card, Grid, Typography } from '@mui/material'
import React from 'react'
import Palette from '../../theme/palette'

const Moreinformation = ({ data }) => {


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

    return (
        <div>
            <Card style={{ borderTopLeftRadius: "0px", borderTopRightRadius: "0px" }}>
                <Box p={3}>
                    <Grid container display="flex" spacing={4}>
                        <Grid item xs={12} sm={12}>
                            <Typography variant="h4">Additional Contact Details :-</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} >
                            <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} pb={2}>
                                <Typography variant="body1">Alternate Phone Number  :</Typography>
                                <Typography variant="body2" color={Palette.grey[600]}>{data?.alternatePhoneNumber ? data?.alternatePhoneNumber : "--"}</Typography>
                            </Grid>
                            <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
                                <Typography variant="body1">Instagram Profile :</Typography>
                                <Typography variant="body2" color={Palette.grey[600]} onClick={() => data?.instagramProfile ? handleInsta(data?.instagramProfile) : "--"} style={{ cursor: "pointer", textDecoration: "none", color: Palette.primary.main }}>
                                    {data?.instagramProfile ? data?.instagramProfile : "--"}
                                </Typography>
                            </Grid>
                            <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
                                <Typography variant="body1">Preferred Contact Method :</Typography>
                                <Typography variant="body2" color={Palette.grey[600]} >{data?.preferredContactMethod ? data?.preferredContactMethod : "--"}</Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={6} >
                            <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} pb={2}>
                                <Typography variant="body1">Additional Email :</Typography>
                                <Typography variant="body2" color={Palette.grey[600]}>{data?.additionalEmailAddress ? data?.additionalEmailAddress : "--"}</Typography>
                            </Grid>
                            <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
                                <Typography variant="body1">Twitter Profile :</Typography>
                                <Typography variant="body2" color={Palette.grey[600]} onClick={() => data?.twitterProfile ? handleTwitter(data?.twitterProfile) : "--"} style={{ cursor: "pointer", textDecoration: "none", color: Palette.primary.main }}>
                                    {data?.twitterProfile ? data?.twitterProfile : "--"}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={6} >
                            <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} pb={2}>
                                <Typography variant="h4" pb={2}>Referral Information :-</Typography>
                                <Typography variant="body1">Referral source (if applicable):</Typography>
                                <Typography variant="body2" color={Palette.grey[600]}>{data?.referralSource ? data?.referralSource : "--"}</Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="h4" pb={2}>Referral details :-</Typography>
                            <Grid container display="flex" spacing={4}>
                                <Grid item xs={12} sm={6}>
                                    <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} pb={2}>
                                        <Typography variant="body1">Referral Contact Name:</Typography>
                                        <Typography variant="body2" color={Palette.grey[600]}>{data?.referralContactName ? data?.referralContactName : "--"}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} pb={2}>
                                        <Typography variant="body1">Relationship to Referrer:</Typography>
                                        <Typography variant="body2" color={Palette.grey[600]}>{data?.relationshipToReferrer ? data?.relationshipToReferrer : "--"}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Typography variant="h4">Communication Preferences :-</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} >
                            <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} pb={2}>
                                <Typography variant="body1">Preferences For Marketing Communications :</Typography>
                                <Typography variant="body2" color={Palette.grey[600]}>{data?.preferencesForMarketingCommunications ? data?.preferencesForMarketingCommunications : "--"}</Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={6} >
                            <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} pb={2}>
                                <Typography variant="body1">Preferred Language For Communication :</Typography>
                                <Typography variant="body2" color={Palette.grey[600]}>{data?.preferredLanguage ? data?.preferredLanguage : "--"}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Card>
        </div >
    )
}

export default Moreinformation
