import * as React from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Button, Fade, Slide } from '@mui/material'
import { useHistory } from "react-router-dom";

import { getSubmissions } from '../api/problem'
import SubmissionComponent from './submissionComponent';
import MuiErrorModal from './common/muiErrorModal';
import Loader from './common/loader';

export default function Submission(props) {

    const [state, setState] = React.useState({ loading: false, error: false, success: false });
    const [submissions, setSubmissions] = React.useState([])
    const [curCode, setCurCode] = React.useState(null)
    const history = useHistory();
    /* {"index":0,"data":result[0]} */


    const [error, setError] = React.useState();

    const getSubmissionsApiData = async (token) => {
        setState(prevState => ({ ...prevState, loading: true }))
        var apiData = await getSubmissions(token, props.problem_id)
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
            await setSubmissions(apiData.result);
            // array
            // [] --> no submission
            // 
            console.log("-----------apiData.result--------------")
            console.log(apiData.result);
            // console.log(submissions[0]['data']);
            setState(prevState => ({ ...prevState, loading: false, success: true }))
        }
    }

    React.useEffect(() => {
        try {
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
            getSubmissionsApiData(token);
        } catch (e) {
            console.log('problems page submission component error in useffect')
            console.log(e)
        }
    }, []);

    return (
        <div>

            

            {state.loading && <Loader/>}
            {state.error &&
                <MuiErrorModal open={true} message={error.message} data={error.data} dissmisible={false} back={true} />
            }

            {state.success &&
            <div>
            {submissions.length>0 && <h1>All submissions</h1>}
            {submissions.length==0 && <h1>No submissions</h1>}
            <div>{submissions.map(
                (value, i) =>

                    <div key={value._id}>
                        <Button onClick={() => setCurCode(submissions.length - i)} sx={{
                            display: 'flex',
                            width: '100%',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <SubmissionComponent value={value} id={submissions.length - i} />
                        </Button><br />
                    </div>
            )
            }</div>
            {curCode &&
                <div>
                    <h1>Submission {curCode} </h1><br />
                    <p>
                        {/* {submissions[curCode - 1].data['index.js']} */}
                        {Object.keys(submissions[curCode - 1].data).map(function (key, index) {

                            if (key != "package-lock.json") {

                                return <div>
                                    <h1>{key}</h1>
                                    <p>
                                        {submissions[curCode - 1].data[key]}
                                    </p>
                                </div>
                            }
                        })}

                    </p>

                </div>}
                
            </div>

            
            }


            
        </div>
    );
}

