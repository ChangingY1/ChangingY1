import request from '../util/request'

// 登录
export const Login = (userLoginDto) => {
  return request({
    url: 'api/user/login',
    method: 'post',
    data: userLoginDto
  })
}
export const GetUserInfo = () => {
  return request({
    url: 'api/user/getuserinfo',
    method: 'get',
  })
}

// 注册
export const Register = (userRegisterDto) => {
  return request({
    url: 'api/user/register',
    method: 'post',
    data: userRegisterDto
  })
}
// 发送验证码
export const GetPhoneMessage = (phoneNumber) => {
  return request({
    url: 'api/user/sms/sendCode/'+phoneNumber,
    method: 'get',
  })
}


