import config from 'Config'
import axios from 'axios'
import { pick } from 'lodash'

export async function base (params) {
  try {
    const { status, data } = await axios({
      baseURL: config.apiUrl,
      ...params
    })
    if (status >= 200 && status < 300) {
      return { data }
    }
    return { err: data }
  } catch (e) {
    return {
      err: pick(e.response, ['data', 'status', 'statusText'])
    }
  }
}

export function httpGet (url) {
  return base({
    url,
    withCredentials: true
  })
}

export function httpPost (url, form) {
  return base({
    url,
    withCredentials: true,
    method: 'post',
    data: JSON.stringify(form)
  })
}

export function httpPut (url, form) {
  return base({
    url,
    withCredentials: true,
    method: 'put',
    data: JSON.stringify(form)
  })
}
