import React, { useRef, useEffect, useState } from 'react'
import Highchart from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import highchartMap from 'highcharts/modules/map'
import { cloneDeep } from 'lodash'

highchartMap(Highchart)

const initOption = {
  chart: {
    height: '500'
  },
  colors: ['#cfdff8', '#aecaf2', '#8eb2ee', '#5d91e5', '#202d5c'],
  title: {
    text: null
  },
  mapNavigation: { // keo trong map
    enabled: false
  },
  colorAxis: {
    dataClassColor: 'category',
    dataClasses: [{
      from: 1,
      to: 100
    }, {
      from: 101,
      to: 500
    }, {
      from: 501,
      to: 1000
    }, {
      from: 1001,
      to: 10000
    }, {
      from: 100001
    }]
  },
  legend: {
    layout: 'vertical',
    align: 'left',
    verticalAlign: 'bottom',
    valueDecimals: 0,
    backgroundColor: 'pink',
    symbolRadius: 0,
    symbolHeight: 14
  },
  series: [
    {
      name: 'Dân số',
      joinBy: ['iso_3166_2', 'key']
    }
  ]
}

function HightMap({ mapData, data }) {
  const [options, setOptions] = useState(initOption)
  const chartRef = useRef(null)

  useEffect(() => {
    let array = []
    for (let index = 0; index < data.length; index++) {
      const element = data[index]
      for (let i = 0; i < element.length; i++) {
        const item = element[i]
        array.push(item)
      }
    }
    if (mapData && Object.keys(mapData).length) {
      const fakeData = array.map((feature) => ({
        key: feature.id,
        value: parseInt(feature.confirmed)
      }))

      setOptions({
        ...initOption,
        title:{
          text: ''
        },
        series: [
          {
            ...initOption.series[0],
            mapData: mapData,
            data: fakeData
          }
        ]
      })
    }

  }, [mapData, data])

  useEffect(() => {
    if (chartRef && chartRef.current) {
      chartRef.current.chart.series[0].update({
        mapData
      })
    }
  }, [options, mapData])

  return (
    <HighchartsReact
      highchart={Highchart}
      options={cloneDeep(options)}
      constructorType = {'mapChart'}
      ref={chartRef}
    />
  )
}

HightMap.defaultProps = {
  mapData: {}
}

export default React.memo(HightMap)