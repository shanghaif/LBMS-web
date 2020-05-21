import { LBMSaxios } from '@/utils/LBMSrequest'
import Qs from 'qs'

const api = {
}

export default api


export function getUserDetails () {
  return LBMSaxios({
    url: 'user',
    method: 'get'
  })
}

export function changeUserDetails (parameters) {
  return LBMSaxios({
    url: 'user',
    method: 'put',
    data: Qs.stringify(parameters)
  })
}

export function changePassword (parameters) {
  return LBMSaxios({
    url: 'user/password',
    method: 'post',
    data: Qs.stringify(parameters)
  })
}

export function getTotalOnlineData(parameters) {
  return LBMSaxios({
    url: '/totalData/online',
    method: 'get',
    params: parameters
  })
}

export function getBranchRank () {
  return LBMSaxios({
    url: 'totalData/onlineRank',
    method: 'get'
  })
}

export function getBranchHistoryRank (parameters) {
  return LBMSaxios({
    url: 'totalData/historyRank',
    method: 'get',
    params: parameters
  })
}

export function getLastTotalOnlineData () {
  return LBMSaxios({
    url: 'totalData/lastOnlineData',
    method: 'get'
  })
}

export function getTotalHistoryData (parameters) {
  return LBMSaxios({
    url: 'totalData/historys',
    method: 'get',
    params: parameters
  })
}

export function getAlertList (parameters) {
  return LBMSaxios({
    url: '/alarm/',
    method: 'get',
    params: parameters
  })
}

export function getAlertOverView () {
  return LBMSaxios({
    url: '/alarm/overview',
    method: 'get'
  })
}

export function updateAlert (parameters) {
  return LBMSaxios({
    url: '/alarm/',
    method: 'post',
    data: Qs.stringify(parameters)
  })
}

export function deleteAlert (parameters) {
  return LBMSaxios({
    url: '/alarm/delete',
    method: 'post',
    data: Qs.stringify(parameters)
  })
}

export function getBranchList () {
  return LBMSaxios({
    url: '/branch/list',
    method: 'get'
  })
}
