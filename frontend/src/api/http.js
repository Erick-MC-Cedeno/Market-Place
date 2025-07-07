import axios from 'axios'
axios.defaults.withCredentials = true

const baseApi = 'https://urban-pancake-x5wvwwxx69p2667p-4000.app.github.dev/secure/api'



// Endpoints usuario
const loginApi = `${baseApi}/user/login`
const logoutApi = `${baseApi}/user/logout`
const registerApi = `${baseApi}/user/register`
const userInfoApi = `${baseApi}/user/info`
const updateUserProfileApi = `${baseApi}/user/update-profile`
const changePasswordApi = `${baseApi}/user/change-password`;
const verifyTokenApi = `${baseApi}/user/verify-token`;
const updateTokenStatusApi = `${baseApi}/user/update-token-status`;
const resendTokenApi = `${baseApi}/user/resend-token`
const verifyEmailApi = `${baseApi}/user/verify-email`;
const sendVerificationEmailApi = `${baseApi}/user/send-verification-email`;
const isEmailVerifiedApi = `${baseApi}/user/is-email-verified`;



// Endpoints de Products
const createProductApi = `${baseApi}/products/create`;
const getProductsApi = `${baseApi}/products/all`;


async function get(url, body) {
    return await axios.get(url, {
        params: body || {}
    })
}

async function post(url, body) {
    return await axios.post(url, body)
}

async function patch(url, body) {
    return await axios.patch(url, body)
}

export {
    get,
    post,
    patch,
    loginApi,
    logoutApi,
    registerApi,
    userInfoApi,
    verifyTokenApi,
    changePasswordApi,
    updateTokenStatusApi,
    resendTokenApi,
    updateUserProfileApi,
    verifyEmailApi,
    sendVerificationEmailApi,
    isEmailVerifiedApi,
    createProductApi,
    getProductsApi,
};