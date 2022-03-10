import React, { useEffect, useState } from "react";
import { profileApi } from '../api/auth';
import Loader from "../components/common/loader";
import MuiErrorModal from "../components/common/muiErrorModal";
import { useHistory } from "react-router-dom";
import ReactGA from 'react-ga';
import { checkLogin } from "../api/auth";

export default function Profile(){
    const [state, setState] = useState({ loading: false, error: false, success: false });
    const [profileData, setProfileData] = useState([])
    const [error, setError] = useState();
    const history = useHistory();

    const getProfileApiData = async (token) => {
        setState(prevState => ({ ...prevState, loading: true }))
        var apiData = await profileApi(token)
        console.log(apiData)
        if (apiData.error) {
            console.log("----")
            try {
                // console.log(apiData.error.response.data);
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

            }
            catch (e) {
                await setError({ "message": "Some error occured", "data": "Error" });
            }
            await setState(prevState => ({ ...prevState, loading: false, error: true }))
        } else if (apiData.result) {
            await setProfileData(apiData.result);
            setState(prevState => ({ ...prevState, loading: false, success: true }))
        }
    }

    useEffect(() => {
        ReactGA.initialize('UA-222140218-1', {
            debug: false, gaOptions: {
                userId: localStorage.getItem('userId')
            }
        });
        ReactGA.pageview(window.location.pathname + window.location.search);
        try {
            let temp = checkLogin();
            if (!temp) {
                localStorage.clear()
                history.replace({
                    pathname: 'login'
                });
            } else {
                let token = localStorage.getItem('token')
                getProfileApiData(token);
            }
        } catch (e) {
            console.log('profile page error in useffect')
            console.log(e)
        }
    }, []);


    return(
        <>
        {state.loading && <Loader />}
            {state.error &&
                <MuiErrorModal open={true} message={error.message} data={error.data} dissmisible={false} back={true} />
            }
            {state.success &&
                <div>Profile Page</div>
            }
        </>
    );
}