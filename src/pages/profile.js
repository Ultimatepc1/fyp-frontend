import React, { useEffect, useState } from "react";
import { profileApi } from '../api/auth';
import Loader from "../components/common/loader";
import MuiErrorModal from "../components/common/muiErrorModal";
import { useHistory } from "react-router-dom";
import ReactGA from 'react-ga';
import { checkLogin } from "../api/auth";
import {
    Avatar,
    Paper,
    Grid,
    Divider,
    Typography,
    Card,
    CardActionArea,
    CardContent,
    Button,
    Box
} from "@mui/material";
import moment from 'moment';

export default function Profile(props) {
    const [state, setState] = useState({ loading: false, error: false, success: false });
    const [profileData, setProfileData] = useState([])
    const [error, setError] = useState();
    const history = useHistory();

    const getProfileApiData = async (token) => {
        setState(prevState => ({ ...prevState, loading: true }))
        var apiData = await profileApi(token)
        console.log("*****************");
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
                "userId": localStorage.getItem('userId')
            }
        });
        ReactGA.set({ userId: localStorage.getItem('userId'), });
        ReactGA.pageview(window.location.pathname + window.location.search);
        try {
            let temp = checkLogin();
            if (!temp) {
                props.changeLogin(false)
                localStorage.clear()
                history.replace({
                    pathname: 'login'
                });
            } else {
                props.changeLogin(true)
                let token = localStorage.getItem('token')
                getProfileApiData(token);
            }
        } catch (e) {
            console.log('profile page error in useffect')
            let userid = localStorage.getItem('userId');
            ReactGA.event({
                category: 'Error',
                label: `UserId ${userid}`,
                action: `Profile page useEffect error`,
                value: 1
            });
            console.log(e)
        }
    }, []);


    const getDateDiff = (createdAt) => {

        var Difference_In_Time = (new Date(Date.now())).getTime() - (new Date(createdAt)).getTime();
        var Difference_In_Days = Math.floor(Difference_In_Time / (1000 * 3600 * 24));
        var Difference_In_Hours = Math.floor((Difference_In_Time / (1000 * 3600)) / (24 * Difference_In_Days));
        return <>
            {Difference_In_Days > 0 && <h1>Last Submission made {Difference_In_Days} days {Difference_In_Hours} hours ago</h1>}
            {Difference_In_Days == 0 && <h1>Last Submission made {Math.floor(Difference_In_Time / (1000 * 3600))} hours ago</h1>}
        </>
    }

    return (
        <>
            {state.loading && <Loader />}
            {state.error &&
                <MuiErrorModal open={true} message={error.message} data={error.data} dissmisible={false} back={true} />
            }
            {state.success &&
                <>
                    <div style={{ marginTop: '100px', marginLeft: '5%', marginRight: '0%' }}>
                        {console.log("In state.success")}
                        {console.log(profileData)}
                        {/* <Avatar alt="" src="../../public/profile.jpg" sx={{ width: 200, height: 200 }} /> */}
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={4} lg={2} sx={{ height: '100%' }}>
                                {/* <h1>Hello</h1> */}
                                <Avatar alt="" src="../../public/profile.jpg" sx={{ width: '100%', height: '50%' }} /><br />
                                <h4>Name : {profileData.user.name}</h4>
                                <h4>Email : <br />{profileData.user.email}</h4>
                                <h4>Created At :<br />{moment((new Date(profileData.user.createdAt)).getTime()).format("DD-MM-YYYY h:mm:ss")}</h4>
                                <br />
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <Button
                                        variant="contained"
                                        sx={{ borderRadius: '10px' }}
                                        onClick={() => {
                                            history.push('edit-password')
                                        }}
                                    >
                                        Edit Password
                                    </Button>
                                </Box>
                            </Grid>
                            <Grid item xs={0} lg={1} md={1}>
                            </Grid>
                            <Divider orientation="vertical" flexItem>
                            </Divider>
                            <Grid item xs={12} lg={8} md={6} sx={{
                                paddingRight: "16px"
                            }}>
                                <h1>Total submissions : {profileData.submissions.length}</h1>
                                {/* {profileData.submissions.length>0 && <h1>Last submission made {moment(Date.now()).format("YYYY")-moment(profileData.submissions[0].createdAt).format("YYYY")} years {moment(Date.now()).format("MM")-moment(profileData.submissions[0].createdAt).format("MM")} months {moment(Date.now()).format("DD")-moment(profileData.submissions[0].createdAt).format("DD")} days {moment(Date.now()).format("h")-moment(profileData.submissions[0].createdAt).format("h")} hours ago</h1>} */}
                                {profileData.submissions.length > 0 && getDateDiff(profileData.submissions[0].createdAt)}
                                {profileData.submissions.length > 0 && <h1>All Submissions</h1>}
                                {profileData.submissions.length > 0 && profileData.submissions.map((submission, index) => {
                                    var curSubmissionDate = new Date(submission.createdAt)

                                    return <div key={submission._id}>

                                        <Card
                                            style={{ backgroundColor: "#F3F7F7" }}
                                            onClick={() => {

                                                let userid = localStorage.getItem('userId');
                                                ReactGA.event({
                                                    category: 'User',
                                                    label: `UserId ${userid}`,
                                                    action: `Submission ${submission._id} clicked by user ${submission.user_id} of problem ${submission.problem_id} on profile page `,
                                                    value: 1
                                                });

                                                history.push({
                                                    pathname: `problems/${submission.problem_id}`,
                                                    state: {
                                                        fromProfile: true,
                                                        submissionId: submission._id
                                                    }
                                                });
                                            }}
                                        >
                                            <CardActionArea>
                                                <CardContent>
                                                    <h1>Problem ID : {submission.problem_id}</h1>
                                                    <h1>Submitted on : {moment(curSubmissionDate.getTime()).format("DD-MM-YYYY h:mm:ss")}</h1>
                                                </CardContent>
                                            </CardActionArea>
                                        </Card><br />
                                    </div>
                                })}
                                {profileData.submissions.length == 0 && <h1>No submissions found !</h1>}
                            </Grid>
                            <Divider orientation="vertical" flexItem>
                            </Divider>

                        </Grid>
                        <br />
                        {/* <Grid container spacing={2}>
                            <Grid item xs={12} md={2} lg={2}>
                                <h4>Name : {profileData.user.name}</h4>
                                <h4>Email : <br />{profileData.user.email}</h4>
                                <h4>Created At :<br />{profileData.user.createdAt}</h4>
                            </Grid>
                            <Grid item xs={2}>
                            </Grid>
                            
                            
                            <Grid item xs={8}>
                               
                                <h1>
                                In the real world, there are many types of objects, all with specific functions and features. For example, a bicycle is a commonly used object that has 2 wheels, gears, handlebars, brakes and a seat. These are all common properties of a bicycle. While riding a bicycle, you might apply the brakes, shift gears or pedal. Creating a bicycle requires a blueprint to make sure it is built properly, to the correct specifications.

In the programming world, we also make use of "blueprints" or "templates" to build objects. These templates are called classes, and they specify the certain actions (more commonly known as methods) and properties an object has. When we create a new object using a class, we say we are "instantiating an object." We'll often refer to this object as an instance of the class.
                                </h1>
                            </Grid>
                        </Grid> */}
                    </div>
                </>
            }
        </>
    );
}