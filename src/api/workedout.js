import axios from 'axios'

export const getWorkedOutData = (workedout_id, token) => {
    return axios
    .get(`http://localhost:8080/workedout/getWorked/${workedout_id}`, {
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
        console.log("get workedout data error "+err)
        return {error: err}
    })
}