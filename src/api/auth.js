import axios from "axios";
export const signUp = (name,email,password) => {
    return axios
    .put(`http://localhost:8080/auth/signup`, {
        email: email,
        password: password,
        name: name
    })
    .then(res => {
        console.log(res)
        if(res.status != 201){
            const error = new Error('Status code not 201, some error occured');
            throw error
        }
        return res.data
    })
    .catch(err=> {
        console.log("signup api error in api folder "+err)
        return {error: err}
    })
}

export const loginApi = (email,password,remember) => {
    return axios
    .post(`http://localhost:8080/auth/login`, {
        email: email,
        password: password,
        remember: remember
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
        console.log("login api error in api folder "+err)
        return {error: err}
    })
}