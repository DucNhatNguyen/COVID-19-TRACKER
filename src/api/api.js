import axios from 'axios'

export const GetDataOnMap = async () => {
  const request = await axios.post('https://emag.thanhnien.vn/covid19/home/getProvincesMap')
  return request.data
}

export const FetchData = async () => {
  const response = await fetch('https://emag.thanhnien.vn/covid19/home/getProvincesMap', {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer'
  })
  return response.json()
}

export const FetchDataByContry = async () => {
  const request = await axios.get('https://api.covid19api.com/dayone/country/vietnam')
  return request.data
}

export const FetchSumarryData = async () => {
  const request = await axios.get('https://static.pipezero.com/covid/data.json') //https://api.coronatracker.com/v3/stats/worldometer/global
  return request.data
}
