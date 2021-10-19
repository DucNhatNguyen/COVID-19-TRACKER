import React, { useEffect, useState } from 'react'
import HighChartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts'
import moment from 'moment'
import 'moment/locale/vi'

moment.locale('vi')

const initOptions = {
  chart: {
    type: 'column'
  },
  title: {
    text: 'Thống kê Covid-19 trong nước'
  },
  xAxis: {
    categories: [
      'Ca nhiễm',
      'Đang điều trị',
      'Khỏi bệnh',
      'Tử vong'
    ],
    crosshair: true
  },
  yAxis: {
    min: 0,
    title: {
      text: ''
    }
  },
  tooltip: {
    headerFormat: '<span style="font-size:10px">{point.key}:</span><table>',
    pointFormat: '<tr>' +
        '<td style="padding:0"><b>{point.y} ca</b></td></tr>',
    footerFormat: '</table>',
    shared: true,
    useHTML: true
  },
  legend: {
    enabled: false
  },
  series: [{
    name: '',
    data: [49.9, 71.5, 106.4, 129.2]
  }]
}

function WorldOverview({ data }) {
  const [option, setOption] = useState(initOptions)

  useEffect(() => {
    let arrValue = []
    arrValue.push(data.cases)
    arrValue.push(parseInt(data.treating))
    arrValue.push(data.recovered)
    arrValue.push(parseInt(data.death))

    setOption({
      ...initOptions,
      subtitle: {
        text: `Tính đến: ${moment().format('LL')}`
      },
      series: [{
        data: arrValue
      }]
    })
  }, [data])

  return (
    <HighChartsReact
      highcharts={Highcharts}
      options={option}
    />
  )
}

export default WorldOverview