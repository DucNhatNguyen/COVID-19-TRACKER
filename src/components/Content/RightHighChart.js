import React, { useEffect, useState } from 'react'
import HighChartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts'


const initOptions = {
  chart: {
    type: 'bar'
  },
  title: {
    text: 'Tình hình dịch bệnh 7 ngày qua'
  },
  xAxis: {
    categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
  },
  yAxis: {
    min: 0,
    title: {
      text: ''
    }
  },
  legend: {
    reversed: true
  },
  plotOptions: {
    series: {
      stacking: 'normal'
    }
  },
  series: [{
    name: 'Ca nhiễm',
    data: [5, 3, 4, 7, 2]
  }, {
    name: 'Tử vong',
    data: [2, 2, 3, 2, 1]
  }, {
    name: 'Khỏi bệnh',
    data: [3, 4, 4, 2, 5]
  }]
}
function RightHighChart({ data }) {
  const [option, setOption] = useState(initOptions)

  useEffect(() => {
    let arrDate = []
    let arrCases = []
    let arrDeath = []
    let arrRecovered = []

    data.forEach(i => {
      arrDate.push(i.date)
      arrCases.push(i.cases)
      arrDeath.push(i.death)
      arrRecovered.push(i.recovered)
    })
    setOption({
      ...initOptions,
      xAxis: {
        categories: arrDate
      },
      series: [{
        name: 'Khỏi bệnh',
        data: arrRecovered
      }, {
        name: 'Tử vong',
        data: arrDeath
      }, {
        name: 'Ca nhiễm',
        data: arrCases
      } ]
    })
  }, [data])

  return (
    <HighChartsReact
      highcharts={Highcharts}
      options={option}
    />
  )
}

export default RightHighChart