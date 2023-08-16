/* eslint-disable react/prop-types */
import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import moment from 'moment/moment'
import Palette from '../../theme/palette'

// eslint-disable-next-line arrow-body-style, react/prop-types
const Overview = ({ data }) => {

  return (
    <div>
      <Box mt="0px" style={{ borderTop: "1px solid", borderTopColor: Palette.grey[400] }} p={3}>
        <Grid container display="flex" spacing={4}>
          <Grid item xs={12} sm={6}>
            <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} pb={2}>
              <Typography variant="body1">First Name :</Typography>
              <Typography variant="body2" color={Palette.grey[600]}>{data?.firstName ? data?.firstName : "---"}</Typography>
            </Grid>
            <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
              <Typography variant="body1">Email :</Typography>
              <Typography variant="body2" color={Palette.grey[600]}>{data?.emailAddress ? data?.emailAddress : "---"}</Typography>
            </Grid>
            <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
              <Typography variant="body1">CreatedOn :</Typography>
              <Typography variant="body2" color={Palette.grey[600]}>
                {moment(data?.createdOn).format('lll')}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} pb={2}>
              <Typography variant="body1">Last Name :</Typography>
              <Typography variant="body2" color={Palette.grey[600]}>{data?.lastName ? data?.lastName : "---"}</Typography>
            </Grid>
            <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
              <Typography variant="body1">Role :</Typography>
              <Typography variant="body2" color={Palette.grey[600]}>{data?.role ? data?.role : "---"}</Typography>
            </Grid>
            <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
              <Typography variant="body1">ModifiedOn :</Typography>
              <Typography variant="body2" color={Palette.grey[600]}>
                {moment(data?.modifiedOn).format('lll')}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}

export default Overview
