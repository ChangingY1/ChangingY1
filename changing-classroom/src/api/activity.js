import request from '../util/request'


export const GetAllActivities = () => {
  return request({
    url: 'api/activity/getAllActivities',
    method: 'get'
  })
}

export const GetActivityInfo = (activityId) => {
  return request({
    url: 'api/activity/getActivitiyInfo/'+activityId,
    method: 'get',
  })
}

export const SignUp = (uaRelationDto) => {
  return request({
    url: 'api/activity/signUp',
    method: 'post',
    data: uaRelationDto
  })
}

export const GetMessageInfoByActivityId = (activityId) => {
  return request({
    url: 'api/activity/getMessageInfoByActivityId/'+activityId,
    method: 'get',
  })
}