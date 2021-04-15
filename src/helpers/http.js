import axios from 'axios'
import BaseModel from '@/services/model'
import services from '@/services'

const baseDomain = 'http://167.99.13.25:80'
const baseURL = `${baseDomain}/api/`

export const http = axios.create({baseURL})

export const api = new Proxy({http, baseURL, baseDomain}, {
  get(target, name) {
    let model = new BaseModel(name, http)

    if(name in services)
      model = services[name](http)

    return model
  }
})