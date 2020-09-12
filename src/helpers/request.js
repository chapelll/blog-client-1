import axios from 'axios'
import { Message } from 'element-ui'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// post请求头，设置请求的类型
axios.defaults.baseURL = 'https://blog-server.hunger-valley.com'
// 线上url地址

//axios.defaults.withCredentials = true
// 跨域


export default function request(url, type = 'GET', data = {}) {
    // url是请求发送过去的地址，type是请求方式，data是请求的信息，如{username: 'hunger1', password: '123456'}
    return new Promise((resolve, reject) => {
        let option = {
            url,
            method: type
        }
        if (type.toLowerCase() === 'get') {
            option.params = data
            // 如果是get请求就data放在option.params中
        } else {
            option.data = data
            // 如果是post请求就data放在option.data中
        }
        // 将参数变成符合axios的类型


        if (localStorage.token) {
            // 如果本地有token，就将它带上
            axios.defaults.headers.common['Authorization'] = localStorage.token
            // token相当于一个需要手动带上的cookie
        }


        // axios发送请求
        axios(option).then(res => {
            console.log(res.data)
            if (res.data.status === 'ok') {
                if (res.data.token) {
                    localStorage.token = res.data.token
                    // 如果响应中带有token，就把它存在本地，下次发请求时带上
                }
                resolve(res.data)
                // Message.success(res.data.msg)
            } else {
                Message.error(res.data.msg)
                reject(res.data)
            }
        }).catch(err => {
            Message.error('网络异常')
            reject({ msg: '网络异常' })
            // catch是当请求都没有发成功时的报错
        })
    })
}

// // 测试代码
// // request('/auth/login', 'post', {username: 'hunger1', password: '123456'}).then(data=>{
// //     console.log(data);
// // })

// // request('/blog', 'post', {
// //     title: '2020.8.6',
// //     content: '2020.8.6',
// //     description: '简介'
// // }).then(data=>{
// //     console.log(data);
// // })

// // request('/blog').then(data=>{
// //     console.log(data);
// // })

// // import axios from 'axios'
// // import { Message } from 'element-ui'

// // axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// // axios.defaults.baseURL = 'http://blog-server.hunger-valley.com'
// // axios.defaults.withCredentials = true

// // export default function request(url, type = 'GET', data = {}) {
// //   return new Promise((resolve, reject) => {
// //     let option = {
// //       url,
// //       method: type
// //     }
// //     if(type.toLowerCase() === 'get') {
// //       option.params = data
// //     }else {
// //       option.data = data
// //     }
// //     axios(option).then(res => {
// //       console.log(res.data)
// //       if(res.data.status === 'ok') {
// //         resolve(res.data)
// //       }else{
// //         Message.error(res.data.msg)
// //         reject(res.data)
// //       }
// //     }).catch(err => {
// //       Message.error('网络异常')
// //       reject({ msg: '网络异常' })
// //     })
// //   })
// // }






