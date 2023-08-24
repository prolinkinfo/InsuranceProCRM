/* eslint-disable react/prop-types */
import { Box, Card, Grid, Typography } from '@mui/material'
import dayjs from 'dayjs'
import React, { useState } from 'react'
import Palette from '../../theme/palette'
import Addemail from '../../components/email/Addemail'

const Overview = ({ data, setUserAction }) => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  return (
    <div>
      {/* Add Email Model */}
      <Addemail open={open} handleClose={handleClose} _id={data?._id} receiver={data} setUserAction={setUserAction} />

      <Card style={{borderTopLeftRadius:"0px",borderTopRightRadius:"0px"}}>
        <Box p={3}>
          <Grid container display="flex" spacing={4}>
            <Grid item xs={12} sm={6}>
              <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} pb={2}>
                <Typography variant="body1">Name :</Typography>
                <Typography variant="body2" color={Palette.grey[600]} textTransform={"capitalize"}>{`${data?.title} ${data?.firstName} ${data?.lastName}`}</Typography>
              </Grid>
              <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400], }} py={2}>
                <Typography variant="body1">Date Of Birth :</Typography>
                <Typography variant="body2" color={Palette.grey[600]}>
                  {
                    data?.dateOfBirth ? dayjs(data?.dateOfBirth).format("DD/MM/YYYY") : "null"
                  }
                </Typography>
              </Grid>
              <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
                <Typography variant="body1">Gender :</Typography>
                <Typography variant="body2" color={Palette.grey[600]}>{data?.gender ? data?.gender : "null"}</Typography>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} pb={2}>
                <Typography variant="body1">Phone Number :</Typography>
                <Typography variant="body2" color={Palette.grey[600]}>{data?.phoneNumber ? data?.phoneNumber : "null"}</Typography>
              </Grid>
              <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
                <Typography variant="body1">Email :</Typography>
                <Typography variant="body2" color={Palette.primary.main} onClick={handleOpen} style={{ cursor: "pointer" }}>{data?.emailAddress ? data?.emailAddress : "null"}</Typography>
              </Grid>
              <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
                <Typography variant="body1">Address :</Typography>
                <Typography variant="body2" color={Palette.grey[600]}>{data?.address ? data?.address : "null"}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </div>
  )
}

export default Overview
