/* eslint-disable react/prop-types */
import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import Palette from '../../../theme/palette'

const Other = ({ data }) => (
    <div>
        <Box mt="0px" style={{ borderTop: "1px solid", borderTopColor: Palette.grey[400] }} p={3}>
            <Grid container display="flex" spacing={4}>
                <Grid item xs={12} sm={6}>
                    <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
                        <Typography variant="body1">Create DateTime :</Typography>
                        <Typography variant="body2" color={Palette.grey[600]}>
                            {moment(data?.createdOn).format('lll')}
                        </Typography>
                    </Grid>
                    <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
                        <Typography variant="body1">Created by :</Typography>
                        <Typography variant="body2" color={Palette.grey[600]}>
                            {
                                <Link to={`/dashboard/user/view/${data?.createdBy?._id}`}>
                                    <Typography variant="body2" color={Palette.primary.main} textTransform={"capitalize"}>
                                        {`${data?.createdBy?.firstName} ${data?.createdBy?.lastName}`}
                                    </Typography>
                                </Link>
                            }

                        </Typography>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
                        <Typography variant="body1">Modified DateTime :</Typography>
                        <Typography variant="body2" color={Palette.grey[600]}>
                            {moment(data?.modifiedOn).format('lll')}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    </div>
)

export default Other
