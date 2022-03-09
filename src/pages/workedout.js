import React, { useEffect, useState } from "react";
// import data from '../api/mocks/workedout_78Y4';
import WorkedOutComponent from "../components/workedoutComponenet";
import { getWorkedOutData } from "../api/workedout"
import Loader from '../components/common/loader';
import MuiErrorModal from "../components/common/muiErrorModal";
import { useHistory } from "react-router-dom";
import { checkLogin } from "../api/auth";
import ReactGA from 'react-ga';

export default function WorkedOut(props) {

    const [state, setState] = useState({ loading: false, error: false, success: false });
    const [workedOutData, setWorkedOutData] = useState([])
    const [error, setError] = useState();
    const history = useHistory();

    // const getId =async (id) => {
    //     setState(prevState => ({ ...prevState, id: id }))
    //     if(id==='78Y4'){
    //         setState(prevState=>({...prevState,invalid:false}))
    //     }
    //     console.log(state.invalid);
    // }

    const getWorkedOutApiData = async (id, token) => {
        setState(prevState => ({ ...prevState, loading: true }))
        var apiData = await getWorkedOutData(id, token)
        console.log(apiData)
        if (apiData.error) {
            // set Error
            console.log("----")
            if (apiData.error.response) {
                if (apiData.error.response.data) {
                    await setError(apiData.error.response.data);
                } else {
                    if (apiData.error.message) {
                        await setError({ "message": apiData.error.message, "data": "Error" });
                    }
                }
            } else if (apiData.error.message) {
                await setError({ "message": apiData.error.message, "data": "Error" });
            } else {
                await setError({ "message": "Some error occured", "data": "Error" });
            }
            await setState(prevState => ({ ...prevState, loading: false, error: true }))
        } else if (apiData.result) {
            if (apiData.result.data) {
                await setWorkedOutData(apiData.result);
                setState(prevState => ({ ...prevState, loading: false, success: true }))
            } else {
                // set Error no worked out examples for this
                await setError({ "message": "Not found", "data": "No worked out examples for this" });

                setState(prevState => ({ ...prevState, loading: false, success: false, error: true }))
            }
        }
    }

    useEffect(() => {
        ReactGA.initialize('UA-222140218-1', { debug: true, gaOptions: {
            userId: localStorage.getItem('userId')
          } });
        ReactGA.pageview(window.location.pathname + window.location.search);
        try {
            // id=props.match.params.id;
            // getId(props.id);
            let temp = checkLogin();
            if (!temp) {
                localStorage.clear()
                history.replace({
                    pathname: 'login'
                });
            }else{
                let token = localStorage.getItem(token)
                getWorkedOutApiData(props.id, token);
            }
        } catch (e) {
            console.log('workedout page error in useffect')
            console.log(e)
        }
    }, []);

    return (
        <>
            {state.loading && <Loader />}
            {state.error &&
                <MuiErrorModal open={true} message={error.message} data={error.data} dissmisible={false} back={true} />
            }
            {state.success && <div>
                <h2>{workedOutData.title}</h2>
                <div>{workedOutData.data.map((value, index) =>
                    <WorkedOutComponent value={value} key={value._id} />
                )}</div></div>
            }
        </>
    )
} 