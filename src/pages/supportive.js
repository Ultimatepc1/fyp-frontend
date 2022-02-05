import React, { useEffect, useState } from "react";
import list from '../api/mocks/supportive_60F9';
import SupportiveComponent from "../components/supportiveComponenet";
import { getSupportiveData } from '../api/supportive'
import Loader from "../components/common/loader";
import MuiErrorModal from "../components/common/muiErrorModal";

export default function Supportive(props) {
    const [state, setState] = useState({ loading: false, error: false, success: false });
    const [supportiveData, setSupportiveData] = useState([])
    const [error,setError] = useState();

    const getSupportiveApiData = async (id) => {
        setState(prevState => ({ ...prevState, loading: true }))
        var apiData = await getSupportiveData(id)
        console.log(apiData)
        if (apiData.error) {
            // set Error
            console.log("----")
            console.log(apiData.error.response.data);
            try{
                await setError(apiData.error.response.data);
            }
            catch(e){
                await setError({"message":"Some error occured","data":apiData.error});
            }
            await setState(prevState => ({ ...prevState, loading: false, error: true }))
        } else if (apiData.result) {
            if (apiData.result.data) {
                await setSupportiveData(apiData.result);
                setState(prevState => ({ ...prevState, loading: false, success: true }))
            } else {
                // set Error no worked out examples for this
                await setError({"message":"Not found","data":"No worked out examples for this"});
                setState(prevState => ({ ...prevState, loading: false, success: false, error: true }))
            }
        }
    }

    useEffect(() => {
        try {
            console.log(props.id)
            // id=props.match.params.id;
            getSupportiveApiData(props.id)
        } catch (e) {
            console.log('supportive page error in useeffect')
            console.log(e)
        }
    }, []);

    return (
        <>
            {state.loading &&  <Loader/>}
            {state.error && 
            <MuiErrorModal open={true} message={error.message} data={error.data}/>
            }
            {state.success &&
                <div data-aos="flip-down">{supportiveData.data.map((value) =>
                    <SupportiveComponent value={value} key={value._id} data-aos="flip-up"/>
                )}</div>
            }
        </>
    )
}