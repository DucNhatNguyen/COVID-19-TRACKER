import React, { useEffect, useState } from 'react'
import Header from './components/Header/Header'
import Content from './components/Content/Content'
import Footer from './components/Footer/Footer'
import Box from '@mui/material/Box'
import { FetchSumarryData, FetchData } from 'api/api'
import Grid from '@mui/material/Grid'

import './App.css'
import { forEach } from 'lodash'
import InjectedData from './dataExample/injectionData.json'

function App() {
  const [data, setData] = useState({})
  const [sum, setSum] = useState({})
  const [dataGrid, setDataGrid] = useState()
  const [dataHighChart, setDataHighChart] = useState([])
  const [dataPieChart, setDataPoeChart] = useState({})

  useEffect(() => {
    FetchData().then(data => {
      let array = []
      forEach(data.list, function(item) {
        var value = pushDataInArray(item)
        array.push(value)
      })
      setData(array)
    })

    FetchSumarryData().then(sum => {
      setSum(sum.total.world)
      setDataGrid(sum.locations)
      setDataHighChart(sum.overview)
      setDataPoeChart(sum.total.internal)
    })
  }, [])

  const pushDataInArray = (list) => {
    let array = []
    list.data.forEach(element => {
      array.push(element)
    })
    return array
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Header data={sum}/>
        <Content data={data}
          dataGrid={dataGrid}
          dataHighChart={dataHighChart}
          dataPieChart={dataPieChart}
          dataLineChart={InjectedData}
        />
        <Footer />
      </Grid>
    </Box>
  )
}

export default App
