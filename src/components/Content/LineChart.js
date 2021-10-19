import React, { useState, useEffect } from 'react'
import HighChartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts'
import moment from 'moment'
import 'moment/locale/vi'

moment.locale('vi')

const initOptions = {
  title: {
    text: 'Dữ liệu tiêm vaccine theo ngày (tính đến: )'
  },
  yAxis: {
    title: {
      text: ''
    }
  },

  xAxis: {
    categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
  },

  legend: {
    layout: 'vertical',
    align: 'right',
    verticalAlign: 'middle'
  },

  series: [{
    name: 'Đã tiêm',
    data: [43934, 52503, 57177, 69658, 97031]
  }],

  responsive: {
    rules: [{
      condition: {
        maxWidth: 500
      },
      chartOptions: {
        legend: {
          layout: 'horizontal',
          align: 'center',
          verticalAlign: 'bottom'
        }
      }
    }]
  }

}

function LineChart({ data }) {
  const [option, setOption] = useState(initOptions)

  useEffect(() => {
    let date = []
    let value = []

    data.forEach(i => {
      date.push(moment(i.reportedDate).format('DD/MM'))
      value.push(i.totalInjected)
    })
    setOption({
      ...initOptions,
      title: {
        text: `Dữ liệu tiêm vaccine theo ngày (tính đến: ${moment().format('DD/MM/YYYY')})`
      },
      xAxis: {
        categories: date
      },
      subtitle: {
        text: 'Nguồn: tiemchungcovid19.gov.vn'
      },
      series: [{
        name: 'Đã tiêm',
        data: value
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

export default LineChart