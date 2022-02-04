import React, { useEffect, useState } from "react";
// import data from '../api/mocks/workedout_78Y4';
import WorkedOutComponent from "../components/workedoutComponenet";
import { getWorkedOutData } from "../api/workedout"


export default function WorkedOut(props) {

    const [state, setState] = useState({ loading: false, error: false, success: false });
    const [workedOutData, setWorkedOutData] = useState([])

    // const getId =async (id) => {
    //     setState(prevState => ({ ...prevState, id: id }))
    //     if(id==='78Y4'){
    //         setState(prevState=>({...prevState,invalid:false}))
    //     }
    //     console.log(state.invalid);
    // }

    const getWorkedOutApiData = async (id) => {
        setState(prevState => ({ ...prevState, loading: true }))
        var apiData = await getWorkedOutData(id)
        console.log(apiData)
        if (apiData.error) {
            await setState(prevState => ({ ...prevState, loading: false, error: true }))
        } else if (apiData.result) {
            if (apiData.result.data) {
                await setWorkedOutData(apiData.result);
                setState(prevState => ({ ...prevState, loading: false, success: true }))
            } else {
                setState(prevState => ({ ...prevState, loading: false, success: false, error: true }))
            }
        }
    }

    useEffect(() => {
        try {
            // id=props.match.params.id;
            // getId(props.id);
            getWorkedOutApiData(props.id);
        } catch (e) {
            console.log('workedout page error in useffect')
            console.log(e)
        }
    }, []);

    return (
        <>
            {state.error && <div>Invalid ID</div>}
            {state.success && <div>
                <h2>{workedOutData.title}</h2>
                <div>{workedOutData.data.map((value, index) =>
                <WorkedOutComponent value={value} key={value._id} />
            )}</div></div>
            }
        </>
    )
} 