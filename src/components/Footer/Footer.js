import React from 'react'
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  backgroundColor: '#00FFFF'
}))

function Footer() {
  return (
    <>
      <Grid item xs={12}>
        <Item >
          <div className='banner-footer'>
              Copyright (©) 2021 - Nhật Nguyễn ** Đây là dự án phục vụ cho mục đích học tập và thực hành, không vì mục đích lợi nhuận.
          </div>
        </Item>
      </Grid>
    </>
  )
}

export default Footer