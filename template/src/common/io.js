/**
 * request 请求
 * 
 * @author JiM_Hao
 * 
 */

import moment from 'moment'
import MessageBox from 'components/message-box'

function toQueryString(params) {
  let query = []
  if (params) {
    for (let key in params) {
      query.push(`${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    }
  }
  return query.join('&')
}

function toFormData(params) {
  let body = new FormData()
  if (params) {
    for (let key in params) {
      if (typeof params[key] === 'object') {
        let contents = params[key]
        for (let index in contents) {
          body.append(key, contents[index])
        }
      } else {
        body.append(key, params[key])
      }
    }
  }
  return body
}

function processResponse(handleError) {
  return function (res) {
    if (res.code !== 0 && handleError) {
      return Promise.resolve(res)
    }
    if (res.status === 1 || res.code === 1) {
      return Promise.reject(res.message || '系统错误')
    } else if (res.status !== 0 && res.code !== 0) {
      return Promise.reject(res.message || '未知错误')
    } else {
      return Promise.resolve(res)
    }
  }
}

/**
 * fetch的封装, 直接处理后端请求状态码
 * @param {*} url         接口url
 * @param {*} params      请求参数
 * @param {*} headers     请求头
 * @param {*} handleError 错误处理状态码
 */
export function get(url, params = {}, headers = {}, handleError = 0) {
  let query = toQueryString(params)
  let fetchPromise = fetch(url + (query ? `?${query}` : ''), { headers, credentials: 'same-origin' })
  let timeoutPromise = new Promise(function (resolve, reject) {
    setTimeout(() => {
      reject('服务器开小差，请重试～')
    }, 30000)
  })
  return Promise.race([fetchPromise, timeoutPromise])
    .then((res) => {
      if (res.status !== 200) {
        return Promise.reject('矮油，服务器好像开小差了喂\n快召唤管理猿\n\n(把原因报告给攻城狮:' + res.status + ':' + res.statusText + ')')
      } else {
        return res.json()
      }
    })
    .then(processResponse(handleError))
    .catch(errInfo => {
      return MessageBox.alert(
        errInfo || '系统错误',
        '提示'
      ).then(() => {
        return Promise.reject(errInfo || '未知错误')
      })
    })
}

/**
 * get请求
 * @param {*} url         接口url
 * @param {*} params      请求参数
 * @param {*} headers     请求头
 * @param {*} handleError 错误处理状态码
 */
export function post(url, params = {}, headers = {}, handleError = 0) {
  let body = toFormData(params)
  let fetchPromise = fetch(url, { method: 'POST', body: body, headers, credentials: 'same-origin' })
  let timeoutPromise = new Promise(function (resolve, reject) {
    setTimeout(() => {
      reject('服务器开小差，请重试～')
    }, 30000)
  })
  return Promise.race([fetchPromise, timeoutPromise])
    .then((res) => {
      if (res.status !== 200) {
        return Promise.reject('矮油，服务器好像开小差了喂\n快召唤管理猿\n\n(把原因报告给攻城狮:' + res.status + ':' + res.statusText + ')')
      } else {
        return res.json()
      }
    })
    .then(processResponse(handleError))
    .catch(errInfo => {
      return MessageBox.alert(
        errInfo || '系统错误',
        '提示'
      ).then(() => {
        return Promise.reject(errInfo || '未知错误')
      })
    })
}

/**
 * post请求来下载文件
 * @param {*} url         接口url
 * @param {*} params      请求参数
 * @param {*} headers     请求头
 * @param {*} handleError 错误处理状态码
 */
export function download(url, params = {}, headers = {}, handleError = 0) {
  if (window.safari) {
    // 方法三 通用 但没有回调
    let input = document.getElementById('dataInput')
    let form = document.getElementById('submitForm')
    if (form && input) {
      input.value = JSON.stringify(params)
      form.action = url
      form.submit()
      return Promise.resolve()
    } else {
      return Promise.reject()
    }
  }
  let body = toFormData(params)
  let filename = moment().format('YYYY-MM-DD hh-mm-ss') + '.csv'
  return fetch(url, { method: 'POST', body: body, headers, credentials: 'same-origin' }) // omit/same-origin/include
    .then(res => {
      if (res.status === 201) {
        let disposition = res.headers.get('content-disposition')
        if (disposition && disposition.indexOf('filename=') !== -1) {
          filename = (disposition.split('filename=')[1]).replace(/"/g, '')
        }
        return res.blob()
      } else {
        return Promise.reject('下载失败！')
      }
    })
    .then(blob => {
      // 方法四 也不全, 还要加库
      let FileSaver = require('file-saver')
      FileSaver.saveAs(blob, filename)
      // 方法一 只支持chrome
      // let a = document.createElement('a')
      // let url = window.URL.createObjectURL(blob)
      // a.href = url
      // a.download = filename
      // a.click()
      // window.URL.revokeObjectURL(url)
      // 方法二 Safari下不支持filename
      // function readBlobAsDataURL (blob, callback) {
      //   let reader = new window.FileReader()
      //   reader.onload = function (e) {
      //     callback(e.target.result)
      //   }
      //   reader.readAsDataURL(blob)
      // }
      // readBlobAsDataURL(blob, function (dataurl) {
      //   let a = document.createElement('a')
      //   a.href = dataurl
      //   a.download = filename
      //   a.click()
      // })
    })
    .catch(errInfo => {
      return MessageBox.alert(
        errInfo || '系统错误',
        '提示'
      ).then(() => {
        return Promise.reject(errInfo || '未知错误')
      })
    })
}
