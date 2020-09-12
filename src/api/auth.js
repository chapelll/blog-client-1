import request from '@/helpers/request.js'
// 将我们和后端约定的url写好
let URL = {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    GET_INFO: '/auth'
}
// 导出方法，主要是调用封装好的axios(request 函数)
export default {
    register({username, password}) {
        return request(URL.REGISTER, 'POST', { username, password})
    },
    
    login({username, password}) {
        return request(URL.LOGIN, 'POST', { username, password})
    },

    logout() {
        return request(URL.LOGOUT)
    },

    getInfo() {
        return request(URL.GET_INFO)
    },
}