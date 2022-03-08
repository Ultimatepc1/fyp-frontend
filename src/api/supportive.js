import axios from 'axios'

export const getSupportiveData = (supportive_id, token) => {
    return axios
    .get(`http://localhost:8080/supportive/getSupp/${supportive_id}`, {
        headers: {
        'Authorization': `Bearer ${token}`
        }
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
        console.log("get supportive data error "+err)
        return {error: err}
    })
}