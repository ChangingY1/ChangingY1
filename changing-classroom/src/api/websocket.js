import request from '../util/request'


export const GetOnlineUser = (activityId) => {
  return request({
    url: 'api/websocket/getOnlineUser/'+activityId,
    method: 'get',
  })
}
