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
        let userid = localStorage.getItem('userId');
        try {
            var apiData = await getWorkedOutData(id, token)
            console.log(apiData)
            if (apiData.error) {
                // set Error
                console.log("----")
                
                if (apiData.error.response) {
                    if (apiData.error.response.data) {
                        await setError(apiData.error.response.data);
                        ReactGA.event({
                            category: 'Error',
                            label: `UserId ${userid}`,
                            action: `Workedout/${props.id} page apiCall error ${apiData.error.response.data}`,
                            value: 1
                        });
                    } else {
                        if (apiData.error.message) {
                            await setError({ "message": apiData.error.message, "data": "Error" });
                            ReactGA.event({
                                category: 'Error',
                                label: `UserId ${userid}`,
                                action: `Workedout/${props.id} page apiCall error ${apiData.error.message}`,
                                value: 1
                            });
                        }
                    }
                } else if (apiData.error.message) {
                    await setError({ "message": apiData.error.message, "data": "Error" });
                    ReactGA.event({
                        category: 'Error',
                        label: `UserId ${userid}`,
                        action: `Workedout/${props.id} page apiCall error ${apiData.error.mesage}`,
                        value: 1
                    });
                } else {
                    await setError({ "message": "Some error occured", "data": "Error" });
                    ReactGA.event({
                        category: 'Error',
                        label: `UserId ${userid}`,
                        action: `Workedout/${props.id} page apiCall error`,
                        value: 1
                    });
                }
                await setState(prevState => ({ ...prevState, loading: false, error: true }))
            } else if (apiData.result) {
                if (apiData.result.data) {
                    await setWorkedOutData(apiData.result);
                    setState(prevState => ({ ...prevState, loading: false, success: true }))
                } else {
                    // set Error no worked out examples for this
                    await setError({ "message": "Not found", "data": "No worked out examples for this" });
                    ReactGA.event({
                        category: 'Error',
                        label: `UserId ${userid}`,
                        action: `Workedout/${props.id} page : No worked out examples for this`,
                        value: 1
                    });

                    setState(prevState => ({ ...prevState, loading: false, success: false, error: true }))
                }
            }
        } catch (e) {
            console.log(e);
            await setError({ "message": "Some error occured", "data": "Error" });
            await setState(prevState => ({ ...prevState, loading: false, error: true }))
            ReactGA.event({
                category: 'Error',
                label: `UserId ${userid}`,
                action: `Supportive page apiCall error ${e}`,
                value: 1
            });
        }
    }

    useEffect(() => {
        try {
            // id=props.match.params.id;
            // getId(props.id);
            let temp = checkLogin();
            if (!temp) {
                props.changeLogin(false)
                localStorage.clear()
                history.replace({
                    pathname: 'login'
                });
            } else {
                ReactGA.initialize('UA-222140218-1', {
                    debug: false, gaOptions: {
                        userId: localStorage.getItem('userId')
                    }
                });
                ReactGA.pageview(window.location.pathname + window.location.search);
                props.changeLogin(true)
                let token = localStorage.getItem('token')
                getWorkedOutApiData(props.id, token);
            }
        } catch (e) {
            let userid = localStorage.getItem('userId');
            ReactGA.event({
                category: 'Error',
                label: `UserId ${userid}`,
                action: `Worekedout page useEffect error ${e}`,
                value: 1
            });
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