import * as React from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Fade, Slide } from '@mui/material'

import { getSubmissions } from '../api/problem'

export default function Submission(props) {

    const [state, setState] = React.useState({ loading: false, error: false, success: false });
    const [submissions, setSubmissions] = React.useState([])

    const [error, setError] = React.useState();

    const getSubmissionsApiData = async () => {
        setState(prevState => ({ ...prevState, loading: true }))
        var apiData = await getSubmissions(props.user_id, props.problem_id)
        console.log(apiData)
        if (apiData.error) {
            console.log("----")
            
            try {
                console.log(apiData.error.response.data);
                await setError(apiData.error.response.data);
            }
            catch (e) {
                await setError({ "message": "Some error occured", "data": apiData.error });
            }
            await setState(prevState => ({ ...prevState, loading: false, error: true }))
        } else if (apiData.result) {
            await setSubmissions(apiData.result);
            setState(prevState => ({ ...prevState, loading: false, success: true }))
        }
    }

    React.useEffect(() => {
        try {
            getSubmissionsApiData();
        } catch (e) {
            console.log('problems page submission component error in useffect')
            console.log(e)
        }
    }, []);

    return (
        <div>
            List of submissions
        </div>
    );
}
