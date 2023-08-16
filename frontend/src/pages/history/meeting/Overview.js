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
              <Typography variant="body1">Meeting Agenda :</Typography>
              <Typography variant="body2" color={Palette.grey[600]}>{data?.meetingAgenda ? data?.meetingAgenda : "--"}</Typography>
            </Grid>
            <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400], }} py={2}>
              <Typography variant="body1">Meeting DateTime :</Typography>
              <Typography variant="body2" color={Palette.grey[600]}>
                {
                  data?.meetingDateTime ? moment(data?.meetingDateTime).format('lll') : "--"
                }
              </Typography>
            </Grid>
            <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
              <Typography variant="body1">Meeting Notes :</Typography>
              <Typography variant="body2" color={Palette.grey[600]}>{data?.meetingNotes ? data?.meetingNotes : "--"}</Typography>
            </Grid>

          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} pb={2}>
              <Typography variant="body1"> Meeting Attendes :</Typography>
              <Typography variant="body2" color={Palette.grey[600]}>{data?.meetingAttendes ? data?.meetingAttendes : "--"}</Typography>
            </Grid>
            <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
              <Typography variant="body1">Meeting Location :</Typography>
              <Typography variant="body2" color={Palette.grey[600]}>{data?.meetingLocation ? data?.meetingLocation : "--"}</Typography>
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

        </Grid>
      </Box>
    </div>
  )
}

export default Overview
