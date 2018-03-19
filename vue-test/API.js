/**
 *
 * Created by aiyi on 2017/11/24.
 */
'use strict';
import Qs from 'qs';
import Axios from 'axios';

Axios.defaults.baseURL = 'http://api.yrcmall.com/';     // 配置接口地址
// POST传参序列化(添加请求拦截器)
Axios.interceptors.request.use((config) => {
    // 在发送请求之前做什么
    return config;
}, (error) => {
    console.log('错误的参数', 'fail');
});

Axios.interceptors.response.use((response) => {
    // 对相应数据做些事
    return response;
}, (error) => {
    console.log('网络异常', 'fail');
    return Promise.reject(error);
});

/**
 * 正常状态码
 * @param response
 * @returns {checkStatus}
 */
function checkStatus(response) {
    // 如果http状态码正常，则直接返回数据
    if (response && (response.status) === 200 || response.status === 304 || response.status === 400) {
        return response.data;
        // 如果不需要除了data之外的数据，可以直接response.data
    }
    return {
        status: -404,
        msg: '网络异常'
    }
}

/**
 * 返回错误
 * @param response
 * @returns {checkCode}
 */
function checkCode(response) {
    if (response.status === -404) {
        alert(response.Msg);
    }
    if (response.data && (!response.data.Success)) {
        alert(response.data.Msg);
    }
    return response;
}

export default {
    /**
     * POST
     * @param url
     * @param data
     * @returns {Promise.<save>}
     */
    save(url, data){
        return Axios({
            method: 'post',
            url: Axios.defaults.baseURL + url,
            data: qs.stringify(data),
            timeout: 30000,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }).then(checkStatus).then(checkCode)
    },
    /**
     * GET
     * @param url
     * @param params
     * @returns {Promise.<query>}
     */
    query(url, params){
        return Axios({
            method: 'GET',
            url: Axios.defaults.baseURL + url,
            timeout: 30000,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then(checkStatus).then(checkCode)
    }
}