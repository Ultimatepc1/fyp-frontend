import axios from "axios";
export const signUp = (name, email, password) => {
    return axios
        .put(`https://teach-apidev-backend.herokuapp.com/auth/signup`, {
            email: email,
            password: password,
            name: name
        })
        .then(res => {
            console.log(res)
            if (res.status != 201) {
                const error = new Error('Status code not 201, some error occured');
                throw error
            }
            return res.data
        })
        .catch(err => {
            console.log("signup api error in api folder " + err)
            return { error: err }
        })
}

export const loginApi = (email, password, remember) => {
    return axios
        .post(`https://teach-apidev-backend.herokuapp.com/auth/login`, {
            email: email,
            password: password,
            remember: remember
        })
        .then(res => {
            console.log(res)
            if (res.status != 200) {
                const error = new Error('Status code not 200, some error occured');
                throw error
            }
            return res.data
        })
        .catch(err => {
            console.log("login api error in api folder " + err)
            return { error: err }
        })
}

function getPayload(jwt) {
    // A JWT has 3 parts separated by '.'
    // The middle part is a base64 encoded JSON
    // decode the base64 
    return JSON.parse(atob(jwt.split(".")[1]))
}

export const checkLogin = () => {
    let temp = localStorage.getItem('isLoggedIn')
    let token = localStorage.getItem('token')
    let userId = localStorage.getItem('userId')
    if (temp != "true") {
        // localStorage.clear();
        // history.replace({
        //     pathname: 'login'
        // });
        return false
    }
    if (!token) {
        return false
    }
    if (!userId) {
        return false
    }

    const payload = getPayload(token);

    const expiration = new Date(payload.exp);
    const now = new Date();

    console.log(payload)
    console.log(expiration.getTime())
    console.log(now.getTime())
    if ((expiration.getTime()*1000) < now.getTime()) {
        console.log("JWT has expired");
        return false
    } else {
        console.log("JWT is valid");
        return true;
    }
}