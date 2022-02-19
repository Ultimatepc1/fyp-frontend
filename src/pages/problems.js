import React, { useEffect, useState } from "react";
// import data from '../api/mocks/completion_one_YFG5';
import '../assets/scss/_home.scss';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import sdk from '@stackblitz/sdk'
import axios from 'axios'
import Loader from '../components/common/loader';


import { getProblemData, saveSubmission } from '../api/problem'
import MuiErrorModal from "../components/common/muiErrorModal";
import IOMapping from "../components/ioMapping";
import { Card, CardContent } from "@mui/material";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Solution from "../components/solution";
import Submission from "../components/submission";
import { Zoom, Slide, Fade } from '@mui/material';

export default function Problems(props) {

    const [state, setState] = useState({ loading: false, error: false, success: false });
    const [question, setQuestion] = useState()
    const [ide, setIde] = useState({ open: false, vm: null, outputURL: "" })
    const [tab, setTab] = useState('question')

    const [error, setError] = useState();

    const handleTabChange = async (event, newValue) => {
        if(tab === 'question'){
            await setIde({...ide, open: false})
        }
        setTab(newValue);
    };
    const getProblemApiData = async (id) => {
        setState(prevState => ({ ...prevState, loading: true }))
        var apiData = await getProblemData(id)
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
            await setQuestion(apiData.result);
            setState(prevState => ({ ...prevState, loading: false, success: true }))
        }
    }

    useEffect(() => {
        try {
            getProblemApiData(props.id);
        } catch (e) {
            console.log('problems page error in useffect')
            console.log(e)
        }
    }, []);

    const embedIde = async (ide) => {
        if (!ide.open) {
            await setIde({ ...ide, open: true })
            try {
                sdk.embedGithubProject(
                    'problemIDE',
                    ide,
                    {
                        openFile: 'index.js',
                        height: 600,
                        hideNavigation: false,

                    }
                ).then(vm => {
                    // console.log(vm);
                    // var temp = vm.getFsSnapshot();
                    // console.log(temp)
                    setState(prevState => ({ ...prevState, vm: vm }))
                });
            } catch (e) {
                console.log(e)
            }
        }
    }

    const handleOutputURIChange = (event) => {
        setIde({ ...ide, outputURL: event.target.value })
    }

    const getResponseFromApi = () => {
        console.log(ide.outputURL)
        axios.get(ide.outputURL
            // , {
            //     headers: {
            //         'X-Id-Token': 'abc123abc123',
            //         'Content-Type': 'application/json',
            //         'Access-Control-Allow-Origin': '*',
            //         "sec-ch-ua": `"Microsoft Edge";v="95", "Chromium";v="95", ";Not A Brand";v="99"`,
            //         "sec-ch-ua-mobile": "?0",
            //         "sec-ch-ua-platform": `"Windows"`,
            //         "upgrade-insecure-requests": "1",
            //         "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36 Edg/95.0.1020.44"
            //     }
            // }
            , {
                mode: 'no-cors'
                // ,headers: {
                //     "sec-ch-ua": "\"Google Chrome\";v=\"95\", \"Chromium\";v=\"95\", \";Not A Brand\";v=\"99\"",
                //     "sec-ch-ua-mobile": "?0",
                //     "sec-ch-ua-platform": "\"Windows\"",
                //     "upgrade-insecure-requests": "1",
                //     "Referer": "https://stackblitz.com/",
                //     "Referrer-Policy": "strict-origin-when-cross-origin"
                // }
            }
        ).then(response => {
            console.log(response)
        }).catch(err => {
            console.log(err)
        })
    }

    const submitCode = async () => {
        if(!ide.open){
            return;
        }

        var temp = await state.vm.getFsSnapshot();
        console.log(temp);

        setState(prevState => ({ ...prevState, loading: true }))
        var apiData = await saveSubmission(/*problem_id*/props.id,/*user_id*/props.id,temp)
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
            setState(prevState => ({ ...prevState, loading: false, success: true }))
        }
    }

    return (
        <>
            {state.loading && <Loader />}
            {state.error &&
                <MuiErrorModal open={true} message={error.message} data={error.data} />

            }
            {state.success &&
                <div className="home">
                    <Box sx={{ width: '100%', typography: 'body', padding: 2 }}>
                        <TabContext value={tab}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>

                                <TabList
                                    onChange={handleTabChange}
                                    aria-label="lab API tabs example"
                                    variant="fullWidth"
                                    textColor="primary"
                                    indicatorColor="primary"
                                >
                                    <Tab label="Problem" value="question" sx={{ fontSize: 15, }} />
                                    <Tab label="Submissions" value="submission" sx={{ fontSize: 15 }} />
                                    <Tab label="Solution" value="soln" sx={{ fontSize: 15 }} />
                                </TabList>
                            </Box>
                            <TabPanel value="question" sx={{ margin: -3 }}>
                                {/* zoom out */}
                                <Zoom in={true} style={{ transitionDelay: '700ms' }}>
                                    <h2>{question.title}</h2>
                                </Zoom>
                                {/* zoom-left */}
                                <Slide
                                    direction="left"
                                    in={true}
                                    style={{ transitionDelay: '800ms' }}
                                    easing={{
                                        // enter: "cubic-bezier(0, 1.5, .8, 1)",
                                        enter: "cubic-bezier(0,.02,1,.94)",
                                        exit: "linear"
                                    }}>
                                    <Fade
                                        in={true}
                                        style={{ transitionDelay: '800ms' }}
                                    >
                                        <Card>
                                            <CardContent>
                                                <div dangerouslySetInnerHTML={{ __html: question.question }}></div>
                                            </CardContent>
                                        </Card>
                                    </Fade>
                                </Slide>
                                <div>
                                    <IOMapping data={question.example} />
                                </div>
                                {/* <iframe src={data.ide}
                    style={{width:'100%', height:'500px', border:'0', borderRadius: '4px', overflow:'hidden'}}
                    title="node-express-rest-template"
                    allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
                    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
                ></iframe> */}
                                {/* <iframe frameborder="0" width="100%" height="500px" src="https://replit.com/@PriyangChaurasi/tempognition?embed=true"></iframe> */}
                                {ide.open && <div id="problemIDE">
                                    {
                                        // sdk.embedProjectId(
                                        //     '<div></div>',
                                        //     'node-wdhbdf',
                                        //     {
                                        //         openFile: 'index.js',
                                        //         height: 500,
                                        //         width: 500
                                        //     }
                                        // )
                                        // sdk.embedGithubProject(
                                        //     'problemIDE',
                                        //     'gothinkster/angular-realworld-example-app',
                                        //     { height: 320 }
                                        // )
                                    }
                                </div>}
                                {/* <button onClick={embedIde} >Code</button> */}
                                {!ide.open && <Button variant="contained" onClick={() => embedIde(question.ide)}>Code</Button>}<br /><br />
                                {ide.open && <TextField
                                    hiddenLabel
                                    id="filled-hidden-label-small"
                                    variant="filled"
                                    size="small"
                                    placeholder="Enter Output URL"
                                    value={ide.outputURL}
                                    onChange={handleOutputURIChange}
                                />}<br /><br />
                                {ide.open && <Button variant="contained" onClick={() => getResponseFromApi()}>Run Test</Button>}<br /><br />
                                {ide.open && <Button variant="contained" onClick={() => submitCode()}>Submit</Button>}
                                {/* </div> */}
                            </TabPanel>
                            <TabPanel value="submission" sx={{ margin: -3 }}>
                                <br />
                                <Submission problem_id={props.id} user_id={props.id} />
                            </TabPanel>
                            <TabPanel value="soln" sx={{ margin: -3 }}>
                                <br />
                                <Solution data={question.soln} />
                            </TabPanel>
                        </TabContext>
                    </Box>
                </div>
            }
        </>
    )
}