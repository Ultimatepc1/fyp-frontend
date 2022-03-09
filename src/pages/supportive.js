import React, { useEffect, useState } from "react";
import list from '../api/mocks/supportive_60F9';
import SupportiveComponent from "../components/supportiveComponenet";
import { getSupportiveData } from '../api/supportive'
import Loader from "../components/common/loader";
import MuiErrorModal from "../components/common/muiErrorModal";
import { useHistory } from "react-router-dom";
import ReactGA from 'react-ga';

export default function Supportive(props) {
    const [state, setState] = useState({ loading: false, error: false, success: false });
    const [supportiveData, setSupportiveData] = useState([])
    const [error, setError] = useState();
    const history = useHistory();

    const getSupportiveApiData = async (id, token) => {
        setState(prevState => ({ ...prevState, loading: true }))
        var apiData = await getSupportiveData(id, token)
        console.log(apiData)
        if (apiData.error) {
            // set Error
            console.log("----")
            
            if(apiData.error.response){
                if(apiData.error.response.data){
                    await setError(apiData.error.response.data);
                }else{
                    if(apiData.error.message){
                        await setError({ "message": apiData.error.message, "data": "Error" });
                    }
                }
            }else if(apiData.error.message){
                await setError({ "message": apiData.error.message, "data": "Error" });
            }else{
                await setError({ "message": "Some error occured", "data": "Error"});
            }
            await setState(prevState => ({ ...prevState, loading: false, error: true }))
        } else if (apiData.result) {
            if (apiData.result.data) {
                await setSupportiveData(apiData.result);
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
            console.log(props.id)
            // id=props.match.params.id;
            let temp = localStorage.getItem('isLoggedIn')
            let token = localStorage.getItem('token')
            if (temp != "true") {
                localStorage.clear();
                history.replace({
                    pathname: 'login'
                });
            }
            if (!token) {
                localStorage.clear();
                history.replace({
                    pathname: 'login'
                });
            }
            getSupportiveApiData(props.id, token)
        } catch (e) {
            console.log('supportive page error in useeffect')
            console.log(e)
        }
    }, []);

    return (
        <>
            {state.loading && <Loader />}
            {state.error &&
                <MuiErrorModal open={true} message={error.message} data={error.data} dissmisible={false} back={true}/>
            }
            {state.success &&
                <div>{supportiveData.data.map((value) =>
                    <SupportiveComponent value={value} key={value._id} />
                )}</div>
            }
        </>
    )
}