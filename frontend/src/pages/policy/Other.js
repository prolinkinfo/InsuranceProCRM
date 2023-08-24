/* eslint-disable react/prop-types */
import { Box, Card, Grid, Typography } from '@mui/material'
import React from 'react'
import moment from 'moment'
import Palette from '../../theme/palette'

const Other = ({ data }) => (
    <div>
        <Card style={{ borderTopLeftRadius: "0px", borderTopRightRadius: "0px" }}>
            <Box p={3}>
                <Grid container display="flex" spacing={4}>
                    <Grid item xs={12} sm={6}>
                        <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} pb={2}>
                            <Typography variant="body1">Create Date :</Typography>
                            <Typography variant="body2" color={Palette.grey[600]}>
                                {moment(data?.createdOn).format('lll')}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} pb={2}>
                            <Typography variant="body1">Modified Date :</Typography>
                            <Typography variant="body2" color={Palette.grey[600]}>
                                {moment(data?.modifiedOn).format('lll')}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Card>
    </div>
)

export default Other
