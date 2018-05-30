// 全局共用api
import * as io from 'io'

// 这是一个🌰，剩下的你来
let GET_INFORM = '/api/xx/xx'
export function getData(body, header) {
  return io.get(GET_INFORM, body, header)
    .then((data) => {
      return data.data
    })
}
