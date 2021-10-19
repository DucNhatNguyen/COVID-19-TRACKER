import React from 'react'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import PublicIcon from '@mui/icons-material/Public'


const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  height: 50
}))

function formatAmount(n) {
  return n.toFixed().replace(/./g, function(c, i, a) {
    return i > 0 && c !== '.' && (a.length - i) % 3 === 0 ? '.' + c : c
  })
}

function Header({ data }) {
  return (
    <>
      <Grid item xs={7.5} >
        <Item style={{ textAlign: 'center' }}>
          <span className='header-left-title'><h2>COVID-19 TRACKER</h2></span>
          <span>Nguồn: WHO, CDC & Bộ Y Tế Việt Nam. </span>
        </Item>
      </Grid>
      <Grid item xs={1.5}>
        <Item>
          <div className='header-flex infected'>
            <div className='infected-flex-title'>Số người nhiễm <PublicIcon sx={{ fontSize: 15 }} /></div>
            <div className='infected-flex-value'>{ formatAmount(parseInt(data.cases)) }</div>
          </div>
        </Item>
      </Grid>
      <Grid item xs={1.5}>
        <Item>
          <div className='header-flex dead'>
            <div className='dead-flex-title'>Số ca tử vong <PublicIcon sx={{ fontSize: 15 }} /></div>
            <div className='dead-flex-value'>{ formatAmount(parseInt(data.death)) }</div>
          </div>
        </Item>
      </Grid>
      <Grid item xs={1.5}>
        <Item>
          <div className='header-flex recover'>
            <div className='recover-flex-title'>Số ca bình phục <PublicIcon sx={{ fontSize: 15 }} /></div>
            <div className='recover-flex-value'>{ formatAmount(parseInt(data.recovered)) }</div>
          </div>
        </Item>
      </Grid>
    </>
  )
}

export default Header