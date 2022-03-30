import React, { useEffect, useState } from "react";
import list from '../api/mocks/supportive_60F9';
import SupportiveComponent from "../components/supportiveComponenet";
import { getSupportiveData } from '../api/supportive'
import Loader from "../components/common/loader";
import MuiErrorModal from "../components/common/muiErrorModal";
import { useHistory } from "react-router-dom";
import ReactGA from 'react-ga';
import { checkLogin } from "../api/auth";

export default function Supportive(props) {
    const [state, setState] = useState({ loading: false, error: false, success: false });
    const [supportiveData, setSupportiveData] = useState([])
    const [error, setError] = useState();
    const history = useHistory();

    const getSupportiveApiData = async (id, token) => {
        setState(prevState => ({ ...prevState, loading: true }))
        let userid = localStorage.getItem('userId');
        try {

            var apiData = await getSupportiveData(id, token)
            console.log(apiData)
            if (apiData.error) {
                // set Error
                console.log("----")

                if (apiData.error.response) {
                    if (JSON.stringify(apiData.error.response.data)) {
                        await setError(JSON.stringify(apiData.error.response.data));
                        ReactGA.event({
                            category: 'Error',
                            label: `UserId ${userid}`,
                            action: `Supportive/${props.id} page apiCall error ${JSON.stringify(apiData.error.response.data)}`,
                            value: 1
                        });
                    } else {
                        if (apiData.error.message) {
                            await setError({ "message": apiData.error.message, "data": "Error" });
                            ReactGA.event({
                                category: 'Error',
                                label: `UserId ${userid}`,
                                action: `Supportive/${props.id} page apiCall error ${apiData.error.message}`,
                                value: 1
                            });
                        }
                    }
                } else if (apiData.error.message) {
                    await setError({ "message": apiData.error.message, "data": "Error" });
                    ReactGA.event({
                        category: 'Error',
                        label: `UserId ${userid}`,
                        action: `Supportive/${props.id} page apiCall error ${apiData.error.mesage}`,
                        value: 1
                    });
                } else {
                    await setError({ "message": "Some error occured", "data": "Error" });
                    ReactGA.event({
                        category: 'Error',
                        label: `UserId ${userid}`,
                        action: `Supportive/${props.id} page apiCall error`,
                        value: 1
                    });
                }
                await setState(prevState => ({ ...prevState, loading: false, error: true }))
            } else if (apiData.result) {
                if (apiData.result.data) {
                    await setSupportiveData(apiData.result);
                    setState(prevState => ({ ...prevState, loading: false, success: true }))
                } else {
                    // set Error no worked out examples for this
                    await setError({ "message": "Not found", "data": "No supportive examples for this" });
                    ReactGA.event({
                        category: 'Error',
                        label: `UserId ${userid}`,
                        action: `Supportive/${props.id} page error, no supportive documents exist`,
                        value: 1
                    });
                    setState(prevState => ({ ...prevState, loading: false, success: false, error: true }))
                }
            }

        } catch (e) {
            await setError({ "message": "Some error occured", "data": "Error" });
            await setState(prevState => ({ ...prevState, loading: false, error: true }));
            ReactGA.event({
                category: 'Error',
                label: `UserId ${userid}`,
                action: `Supportive/${props.id} page apiCall error ${e.message}`,
                value: 1
            });
        }
    }

    useEffect(() => {
        try {
            console.log(props.id)
            // id=props.match.params.id;
            let temp = checkLogin();
            if (!temp) {
                localStorage.clear()
                props.changeLogin(false)
                history.replace({
                    pathname: 'login'
                });
            } else {
                props.changeLogin(true)
                ReactGA.initialize('UA-222140218-1', {
                    debug: false, gaOptions: {
                        userId: localStorage.getItem('userId')
                    }
                });
                ReactGA.pageview(window.location.pathname + window.location.search);
                let token = localStorage.getItem('token')
                getSupportiveApiData(props.id, token)
            }
        } catch (e) {
            let userid = localStorage.getItem('userId');
            ReactGA.event({
                category: 'Error',
                label: `UserId ${userid}`,
                action: `Supportive page useEffect error ${e.message}`,
                value: 1
            });
            console.log('supportive page error in useeffect')
            console.log(e)
        }
    }, []);

    return (
        <>
            {state.loading && <Loader />}
            {state.error &&
                <MuiErrorModal open={true} message={error.message} data={error.data} dissmisible={false} back={true} />
            }
            {state.success &&
                <div>{supportiveData.data.map((value) =>
                    <SupportiveComponent value={value} key={value._id} />
                )}</div>
            }
        </>
    )
}