import React, { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import HightMap from './HightMap'
//import MapVnData from '@highcharts/map-collection/countries/vn/vn-all.geo.json'
import MapVnData from '../../mapData.json'
import { DataGrid } from '@mui/x-data-grid'
import { forEach } from 'lodash'
import { makeStyles } from '@mui/styles'
import RightHighChart from 'components/Content/RightHighChart'
import WorldOverview from './WorldOverview'
import LineChart from './LineChart'

const styleItemCustomDataGrid = {
  boxShadow: 'none',
  borderRadius: '4px 0 0 4px'
}

const styleItemCustomMap = {
  boxShadow: 'none',
  borderRadius: '0 4px 4px 0'
}

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}))

const useStyles = makeStyles({
  root: {
    '& .death-style': {
      color: 'red'
    }
  }
})

const columnsField = [
  { field: 'city', headerName: 'Tỉnh/Thành phố', width: 145, sortable: false },
  { field: 'totalcases', headerName: 'Tổng ca nhiễm', width: 130, sortable: false },
  { field: 'today',
    headerName: 'Hôm nay',
    width: 100,
    valueFormatter: (params) => {
      return `+ ${params.value}`
    }
    , sortable: false
  },
  { field: 'deaths', headerName: 'Tử vong', width: 90, cellClassName: 'death-style', sortable: false }
]
function Content({ data, dataGrid, dataHighChart, dataPieChart, dataLineChart }) {
  const classes = useStyles()

  const [mapData, setMapData] = useState()
  const [dataRow, setDataRow] = useState([])

  useEffect(() => {
    setMapData(MapVnData)

    let listDataRow = []
    forEach(dataGrid, function(i, index) {
      listDataRow.push({
        id: index,
        city: i.name,
        totalcases: i.cases,
        today: i.casesToday,
        deaths: i.death
      })
    })
    setDataRow(listDataRow)
  }, [dataGrid])

  return (
    <>
      <Grid item xs={4}>
        <Item>
          <div>
            <WorldOverview data={dataPieChart}/>
          </div>
        </Item>
        <Item style={{ marginTop:'16px' }}>
          <div style={{ height:'400px' }}>
            <RightHighChart data={dataHighChart}/>
          </div>
        </Item>
        <Grid container columns={4} style={{ marginTop:'16px' }}>
          <Grid item xs={2}>
            <Item style={{ borderRadius: '4px 0 0 4px' }}>
              <div style={{ height: '91px' }}>
                <div style={{ fontSize: 19, color: 'black' }}>Số mũi đã tiêm Toàn quốc</div>
                <div style={{ fontSize: 35, fontWeight: 'bold', color: 'black' }}>65,733,258 <span style={{ fontSize: 13 }}>(mũi)</span></div>
              </div>
            </Item>
          </Grid>
          <Grid item xs={2}>
            <Item style={{ borderRadius: '0 4px 4px 0' }}>
              <div style={{ height: '91px' }}>
                <div style={{ fontSize: 19, color: 'black' }}>Số mũi đã tiêm hôm qua</div>
                <div style={{ fontSize: 35, fontWeight: 'bold', color: 'black' }}>1,616,899 <span style={{ fontSize: 13 }}>(mũi)</span></div>
              </div>
            </Item>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={8}>
        <Grid container columns={16}>
          <Grid item xs={8}>
            <Item style={styleItemCustomDataGrid}>
              <span style={{ fontSize: 20, color: 'black' }}>Thống kê chi tiết dịch Covid-19 tại Việt Nam</span>
              <div style={{ height: 500, width: '100%' }} className={classes.root}>
                <DataGrid
                  columns={columnsField}
                  rows={dataRow}
                  disableColumnFilter
                  disableColumnMenu={true}
                  disableSelectionOnClick={true}
                  disableMultipleSelection={true}
                  hideFooterPagination={true}
                  rowsPerPageOptions={[100]}
                  hideFooter={true}
                  pageSize={100}
                />
              </div>
            </Item>
          </Grid>
          <Grid item xs={8}>
            <Item style={styleItemCustomMap}>
              <div style={{ height: 528, width: '100%' }} className={classes.root}>
                <HightMap mapData={mapData} data={data}/>
              </div>
            </Item>
          </Grid>
          <Grid item xs={16} style={{ marginTop: 10 }}>
            <Item>
              <LineChart data={dataLineChart}/>
            </Item>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default Content