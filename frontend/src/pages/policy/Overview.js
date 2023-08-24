/* eslint-disable react/prop-types */
import { Box, Card, Grid, Typography } from '@mui/material'
import dayjs from 'dayjs'
import React from 'react'
import Palette from '../../theme/palette'


// eslint-disable-next-line arrow-body-style
const Overview = ({ data }) => {
  return (
    <div>
      <Card style={{ borderTopLeftRadius: "0px", borderTopRightRadius: "0px" }}>
        <Box p={3}>
          <Grid container display="flex" spacing={4}>
            <Grid item xs={12} sm={6}>
              <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} pb={2}>
                <Typography variant="body1">Policy number :</Typography>
                <Typography variant="body2" color={Palette.grey[600]}>{data?.policyNumber ? data?.policyNumber : "--"}</Typography>
              </Grid>
              <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400], }} py={2}>
                <Typography variant="body1">Policy type :</Typography>
                <Typography variant="body2" color={Palette.grey[600]} >{data?.policyType ? data?.policyType : "--"}</Typography>
              </Grid>
              <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
                <Typography variant="body1">Policy start date :</Typography>
                <Typography variant="body2" color={Palette.grey[600]} >
                  {
                    data?.policyStartDate ? dayjs(data?.policyStartDate).format("DD/MM/YYYY") : "--"
                  }
                </Typography>
              </Grid>
              <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400], }} py={2}>
                <Typography variant="body1">Deductibles :</Typography>
                <Typography variant="body2" color={Palette.grey[600]} >{data?.deductibles ? data?.deductibles : "--"}</Typography>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} pb={2}>
                <Typography variant="body1">Policy end date :</Typography>
                <Typography variant="body2" color={Palette.grey[600]} >
                  {
                    data?.policyEndDate ? dayjs(data?.policyEndDate).format("DD/MM/YYYY") : "--"
                  }
                </Typography>
              </Grid>
              <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
                <Typography variant="body1">Policy status :</Typography>
                <Typography variant="body2" color={Palette.grey[600]} >{data?.policyStatus ? data?.policyStatus : "--"}</Typography>
              </Grid>
              <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
                <Typography variant="body1">Coverage Amounts  :</Typography>
                <Typography variant="body2" color={Palette.grey[600]} >{data?.coverageAmounts ? data?.coverageAmounts : "--"}</Typography>
              </Grid>
              <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
                <Typography variant="body1">Limits  :</Typography>
                <Typography variant="body2" color={Palette.grey[600]} >{data?.limits ? data?.limits : "--"}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </div>
  )
}

export default Overview
