import axios from 'axios'

export const getProblemData = (problem_id) => {
    return axios
    .get(`http://localhost:8080/problem/getProblem/${problem_id}`, {
        // headers: {
        // 'Authorization': `Bearer ${token}`
        // }
    })
    .then(res => {
        console.log(res)
        if(res.status != 200){
            const error = new Error('Status code not 200, some error occured');
            throw error
        }
        return res.data
    })
    .catch(err=> {
        console.log("get problem data error "+err)
        return {error: err}
    })
}

// export const register = newUser=>{
//     return axios
//     .post('users/register', {
//         name: newUser.name,
//         email: newUser.email,
//         password: newUser.password,
//         phoneno: newUser.phoneno
//     })
//     .then(res => {
//         console.log(res)
//         return res.data.result
//     })
//     .catch(err=> {
//         console.log("registererror "+err)
//     })
// }

// export const login = newUser=>{
//     return axios
//     .post('/jwtauth/gettoken', {
//         username: newUser.email,
//         password: newUser.password
//     })
//     .then(res => {
//         if(res.data.error==null){
//             localStorage.setItem('usertoken',res.data.token)
//         }
//         console.log(res)
//         return res.data
//     })
//     .catch(err=> {
//         console.log("loginerror "+err)
//     })
// }

// export const getProfile = token=>{
//     return axios
//     .get('users/profile', {
//         headers: {
//         'Authorization': `Bearer ${token}`
//         }
//     })
//     .then(res => {
//         console.log(res)
//         return res.data
//     })
//     .catch(err=> {
//         console.log("getprofile error "+err)
//     })
// }

// export const getSingleData = myparams => {
//     return axios
//     .get(`api/data?${myparams}`, {
//         // headers: {
//         // 'Authorization': `Bearer ${token}`
//         // }
//     })
//     .then(res => {
//         console.log(res)
//         return res.data
//     })
//     .catch(err=> {
//         console.log("getprofile error "+err)
//     })
// }

// export const getCategoriesList = () => {
//     return axios
//     .get('api/columns', {
//         // headers: {
//         // 'Authorization': `Bearer ${token}`
//         // }
//     })
//     .then(res => {
//         console.log(res)
//         return res.data
//     })
//     .catch(err=> {
//         console.log("getprofile error "+err)
//     })
// }