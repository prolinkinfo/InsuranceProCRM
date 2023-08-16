/* eslint-disable react/prop-types */
import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import Palette from '../../../theme/palette'


// eslint-disable-next-line arrow-body-style
const Overview = ({ data }) => {
  return (
    <div>
      <Box mt="0px" style={{ borderTop: "1px solid", borderTopColor: Palette.grey[400] }} p={3}>
        <Grid container display="flex" spacing={4}>
          <Grid item xs={12} sm={6}>
            <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} pb={2}>
              <Typography variant="body1">Call Type :</Typography>
              <Typography variant="body2" color={Palette.grey[600]} >{data?.callType}</Typography>
            </Grid>
            <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400], }} py={2}>
              <Typography variant="body1">Call Date/Time :</Typography>
              <Typography variant="body2" color={Palette.grey[600]} >
                {
                  data?.callDateTime ? moment(data?.callDateTime).format('lll') : "null"
                }
              </Typography>
            </Grid>
            <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
              <Typography variant="body1">Call Outcome :</Typography>
              <Typography variant="body2" color={Palette.grey[600]} >{data?.callOutcome}</Typography>
            </Grid>
            {
              <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
                <Typography variant="body1">Related To {data?.lead_id?._id ? 'Lead' : 'Contact'} :</Typography>
                {
                  data?.lead_id !== null ?
                    <Link to={`/dashboard/lead/view/${data?.lead_id?._id}`} style={{ textDecoration: "none" }}>
                      <Typography variant="body2" color={Palette.primary.main} textTransform={"capitalize"}>{`${data?.lead_id?.firstName} ${data?.lead_id?.lastName}`}</Typography>
                    </Link>
                    :
                    <Link to={`/dashboard/contact/view/${data?.contact_id?._id}`} style={{ textDecoration: "none" }}>
                      <Typography variant="body2" color={Palette.primary.main} textTransform={"capitalize"}>{`${data?.contact_id?.firstName} ${data?.contact_id?.lastName}`}</Typography>
                    </Link>
                }
              </Grid>
            }
          </Grid>

          <Grid item xs={12} sm={6}>
            <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} pb={2}>
              <Typography variant="body1">Call Duration :</Typography>
              <Typography variant="body2" color={Palette.grey[600]} >{data?.callDuration}</Typography>
            </Grid>
            <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
              <Typography variant="body1">Caller Name :</Typography>
              <Typography variant="body2" color={Palette.grey[600]} >{data?.callerName}</Typography>
            </Grid>
            <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
              <Typography variant="body1">Call Notes :</Typography>
              <Typography variant="body2" color={Palette.grey[600]} >{data?.callNotes}</Typography>
            </Grid>

          </Grid>
        </Grid>
      </Box>
    </div>
  )
}

export default Overview
