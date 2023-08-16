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
              <Typography variant="body1">Title :</Typography>
              <Typography variant="body2" color={Palette.grey[600]} >{data?.title ? data?.title : "--"}</Typography>
            </Grid>
            <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400], }} py={2}>
              <Typography variant="body1">Start Date :</Typography>
              <Typography variant="body2" color={Palette.grey[600]} >
                {
                  data?.start ? moment(data?.start).format('lll') : "--"
                }
              </Typography>
            </Grid>
            <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
              <Typography variant="body1">Note :</Typography>
              <Typography variant="body2" color={Palette.grey[600]} >{data?.TaskNotes ? data?.TaskNotes : "--"}</Typography>
            </Grid>
            <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
              <Typography variant="body1"> Assign To:</Typography>
              <Typography variant="body2" color={Palette.primary.main} >
                <Link to={`/dashboard/user/view/${data?.assignTo?._id}`} style={{ textDecoration: "none" }}>
                  <Typography variant="body2" color={Palette.primary.main} textTransform={"capitalize"}>{`${data?.assignTo?.firstName} ${data?.assignTo?.lastName}`}</Typography>
                </Link>
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} pb={2}>
              <Typography variant="body1">Category :</Typography>
              <Typography variant="body2" color={Palette.grey[600]} >{data?.category ? data?.category : "--"}</Typography>
            </Grid>
            <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
              <Typography variant="body1">End Date :</Typography>
              <Typography variant="body2" color={Palette.grey[600]} >
                {
                  data?.end ? moment(data?.end).format('lll') : "--"
                }
              </Typography>
            </Grid>
            <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
              <Typography variant="body1">Description :</Typography>
              <Typography variant="body2" color={Palette.grey[600]} >{data?.description ? data?.description : "--"}</Typography>
            </Grid>
            {data?.lead_id && data?.contact_id !== null ?
              data?.lead_id && data?.contact_id !== null ?
                <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
                  <Typography variant="body1">
                    {
                      data?.contact_id && data?.lead_id ?
                        "Related To Lead and Contact"
                        : data?.lead_id ?
                          "Related To Lead"
                          : data?.contact_id ?
                            "Related To Contact"
                            :
                            "ji"
                    }
                  </Typography>
                  <Grid>
                    {
                      data?.lead_id &&
                      <Link Link to={`/dashboard/lead/view/${data?.lead_id?._id}`} style={{ textDecoration: "none" }}>
                        <Typography variant="body2" color={Palette.primary.main} textTransform={"capitalize"}>{`${data?.lead_id?.firstName} ${data?.lead_id?.lastName}`}</Typography>
                      </Link>
                    }
                    {
                      data?.contact_id &&
                      <Link to={`/dashboard/contact/view/${data?.contact_id?._id}`} style={{ textDecoration: "none" }}>
                        <Typography variant="body2" color={Palette.primary.main} textTransform={"capitalize"}>{`${data?.contact_id?.firstName} ${data?.contact_id?.lastName}`}</Typography>
                      </Link>
                    }
                  </Grid>
                </Grid> :
                <Grid Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
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
              :
              ""
            }

          </Grid>

        </Grid>
      </Box>
    </div >
  )
}

export default Overview
