/**
 * 项目配置文件
 * 
 * @author JiM_Hao
 * 
 */

import moment from 'moment'
import { comma, decimal, change } from './number'

let config = {
  format: {
    formatCreateTime(row, column) {
      return moment(row.update_time).format('YYYY-MM-DD HH:mm')
    },
    formatDayBudget(row, column) {
      return row.dayBudget > 0 ? row.dayBudget : '不限'
    },
    commaNumber(row, col) {
      return row[col.property] === -1 ? '-' : comma(row[col.property])
    },
    decimalNumber(row, col) {
      return row[col.property] === -1 ? '-' : decimal(row[col.property])
    },
    accurateTwo(row, col) {
      return row[col.property] === -1 ? '-' : change(row[col.property], 0.01, 2)
    }
  }
}

export default config
