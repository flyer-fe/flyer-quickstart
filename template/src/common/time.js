/**
 * 时间处理工具库
 * 
 * @author JiM_Hao
 * 
 */

import moment from 'moment'

export function getDate(date1, date2) {
  let startDate = moment().subtract(date1, 'd').format('YYYY-MM-DD')
  let endDate = moment().subtract(date2, 'd').format('YYYY-MM-DD')
  return [startDate, endDate]
}

export function getLastMonth() {
  let end = new Date()
  let yy = end.getFullYear()
  let dd = end.getDate()
  let mm = end.getMonth() ? end.getMonth() - 1 : 11
  if (mm === 11) {
    yy = yy - 1
  }
  let start = new Date(yy, mm, 1)
  end.setTime(end.getTime() - 3600 * 1000 * 24 * dd)
  return [start, end]
}

export function getQuarter() {
  let end = new Date()
  let start = new Date()
  const yy = end.getFullYear()
  const month = end.getMonth()
  switch (month) {
    case 0:
    case 1:
    case 2:
      start = new Date(yy - 1, 9, 1)
      end = new Date(yy - 1, 11, 31)
      break
    case 3:
    case 4:
    case 5:
      start = new Date(yy, 0, 1)
      end = new Date(yy, 2, 31)
      break
    case 6:
    case 7:
    case 8:
      start = new Date(yy, 3, 1)
      end = new Date(yy, 5, 30)
      break
    case 9:
    case 10:
    case 11:
      start = new Date(yy, 6, 1)
      end = new Date(yy, 8, 30)
      break
    default:
      break
  }
  return [start, end]
}
