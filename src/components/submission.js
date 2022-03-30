import * as React from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Button, Fade, Paper, Slide, CardActionArea } from '@mui/material'
import { useHistory, useLocation } from "react-router-dom";

import { getSubmissions } from '../api/problem'
import SubmissionComponent from './submissionComponent';
import MuiErrorModal from './common/muiErrorModal';
import Loader from './common/loader';
import ReactGA from 'react-ga';
import moment from 'moment'

export default function Submission(props) {

    const [state, setState] = React.useState({ loading: false, error: false, success: false });
    const [submissions, setSubmissions] = React.useState([])
    const [curCode, setCurCode] = React.useState({ id: "", code: null })
    const history = useHistory();
    const location = useLocation();
    /* {"index":0,"data":result[0]} */


    const [error, setError] = React.useState();

    const getSubmissionsApiData = async (token) => {
        setState(prevState => ({ ...prevState, loading: true }))
        let userid = localStorage.getItem('userId');
        try {
            var apiData = await getSubmissions(token, props.problem_id)
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
                            action: `Problems/${props.problem_id} page submission component apiCall error ${apiData.error.response.data}`,
                            value: 1
                        });
                    } else {
                        if (apiData.error.message) {
                            await setError({ "message": apiData.error.message, "data": "Error" });
                            ReactGA.event({
                                category: 'Error',
                                label: `UserId ${userid}`,
                                action: `Problems/${props.problem_id} page submission component apiCall error ${apiData.error.message}`,
                                value: 1
                            });
                        }
                    }
                } else if (apiData.error.message) {
                    await setError({ "message": apiData.error.message, "data": "Error" });
                    ReactGA.event({
                        category: 'Error',
                        label: `UserId ${userid}`,
                        action: `Problems/${props.problem_id} page submission component apiCall error ${apiData.error.message}`,
                        value: 1
                    });
                } else {
                    await setError({ "message": "Some error occured", "data": "Error" });
                    ReactGA.event({
                        category: 'Error',
                        label: `UserId ${userid}`,
                        action: `Problems/${props.problem_id} page submission component apiCall error`,
                        value: 1
                    });
                }
                await setState(prevState => ({ ...prevState, loading: false, error: true }))
            } else if (apiData.result) {
                console.log("-----------apiData.result--------------")
                console.log(apiData.result);
                await setSubmissions(apiData.result);
                // array
                // [] --> no submission
                // 
                console.log("-----------submissions--------------")
                console.log(submissions);
                // console.log(submissions[0]['data']);
                await setState(prevState => ({ ...prevState, loading: false, success: true }))

                if (location.state) {
                    if (location.state.submissionId && apiData.result.length > 0) {
                        var count = 0;
                        var submissionId = location.state.submissionId;
                        console.log("submission id location", submissionId)
                        console.log("submissions length", submissions.length)
                        var submission = apiData.result
                        for (count = 0; count < submission.length; count++) {
                            console.log("submission id count " + submission[count]._id, count)
                            if (submission[count]._id == submissionId) {
                                console.log("breaking at", count)
                                break;
                            }
                        }
                        console.log(submission.length - count)
                        setCurCode({ id: submissionId, code: submission.length - count })
                    }
                }
            }
        } catch (e) {
            ReactGA.event({
                category: 'Error',
                label: `UserId ${userid}`,
                action: `Problems/${props.problem_id} page submission component apiCall error ${e}`,
                value: 1
            });
        }
    }

    React.useEffect(() => {
        let userid = localStorage.getItem('userId');
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
            ReactGA.event({
                category: 'Error',
                label: `UserId ${userid}`,
                action: `Problems/${props.problem_id} page submission component useEffect error ${e}`,
                value: 1
            });
            console.log(e)
        }
    }, []);

    return (
        <div>



            {state.loading && <Loader />}
            {state.error &&
                <MuiErrorModal open={true} message={error.message} data={error.data} dissmisible={false} back={true} />
            }

            {state.success &&
                <div>
                    {submissions.length > 0 && <h1>All submissions</h1>}
                    {submissions.length == 0 && <h1>No submissions</h1>}
                    <div>{submissions.map(
                        (value, i) => {

                            return (<div key={value._id}>
                                <CardActionArea>
                                    <Paper onClick={() => {

                                        if (curCode.code != (submissions.length - i)) {
                                            setCurCode({ id: value._id, code: submissions.length - i })

                                            let userid = localStorage.getItem('userId');
                                            ReactGA.event({
                                                category: 'User',
                                                label: `UserId ${userid}`,
                                                action: `Submission ${value._id} clicked by user ${value.user_id} of problem ${value.problem_id}`,
                                                value: 1
                                            })
                                        }
                                    }
                                    }
                                    // sx={{
                                    //     display: 'flex',
                                    //     width: '100%',
                                    //     alignItems: 'center',
                                    //     justifyContent: 'center'
                                    // }}
                                    >
                                        {/* <SubmissionComponent value={value} id={submissions.length - i} /> */}
                                        <CardContent sx={{ boxShadow: "0px" }}>
                                            <h1>Submission {submissions.length - i} | Submitted on : {moment(new Date(value.createdAt).getTime()).format("DD-MM-YYYY h:mm:ss")}</h1>
                                        </CardContent>
                                    </Paper>
                                </CardActionArea><br />
                            </div>)
                        }
                    )
                    }</div>
                    {curCode.code &&
                        <div>
                            <h1>Submission {curCode.code} </h1><br />
                            <div>
                                {/* {submissions[curCode - 1].data['index.js']} */}
                                {Object.keys(submissions[submissions.length - curCode.code].data).map(function (key, index) {

                                    if (key != "package-lock.json") {

                                        return <div key={index}>
                                            <h1>{key}</h1>
                                            <p>
                                                {submissions[submissions.length - curCode.code].data[key]}
                                            </p>
                                        </div>
                                    }
                                })}

                            </div>

                        </div>}

                </div>


            }



        </div>
    );
}

