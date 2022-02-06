import React, { useEffect, useState } from "react";
import data from '../api/mocks/completion_one_YFG5';
import '../assets/scss/_home.scss';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import sdk from '@stackblitz/sdk'
import axios from 'axios'
import Loader from '../components/common/loader';


import { getProblemData } from '../api/problem'
import MuiErrorModal from "../components/common/muiErrorModal";
import Sampleio from "../components/sampleio";
import IOMapping from "../components/ioMapping";
import { Card, CardContent } from "@mui/material";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Solution from "../components/solution";

export default function Problems(props) {

    const [state, setState] = useState({ outputURL: "", loading: false, error: false, success: false });
    const [question, setQuestion] = useState()
    const [tab, setTab] = useState('question')

    const [error, setError] = useState();


    // const getId = async (id) => {
    //     setState(prevState => ({ ...prevState, id: id }))
    //     if (id === 'YFG5') {
    //         setState(prevState => ({ ...prevState, invalid: false }))
    //     }
    //     console.log(state.invalid);
    // }
    const handleTabChange = (event, newValue) => {
        setTab(newValue);
    };
    const getProblemApiData = async (id) => {
        setState(prevState => ({ ...prevState, loading: true }))
        var apiData = await getProblemData(id)
        console.log(apiData)
        if (apiData.error) {
            console.log("----")
            console.log(apiData.error.response.data);
            try {
                await setError(apiData.error.response.data);
            }
            catch (e) {
                await setError({ "message": "Some error occured", "data": apiData.error });
            }
            await setState(prevState => ({ ...prevState, loading: false, error: true }))
        } else if (apiData.result) {
            await setQuestion(apiData.result);
            setState(prevState => ({ ...prevState, loading: true, success: false }))
        }
    }

    useEffect(() => {
        try {
            // id=props.match.params.id;
            // getId(props.id);
            getProblemApiData(props.id);
            // sdk.embedProjectId(
            //     'problemIDE',
            //     'node-wdhbdf',
            //     {
            //         openFile: 'index.js',
            //         height: 500,
            //         width: 500
            //     }
            // )
        } catch (e) {
            console.log('problems page error in useffect')
            console.log(e)
        }
    }, []);

    const embedIde = (ide) => {
        try {
            // sdk.embedProjectId(
            //     'problemIDE',
            //     'node-wdhbdf',
            //     {
            //         openFile: 'index.js',
            //         // height: 500,
            //         // width: 500
            //     }
            // )
            // console.log(ide)
            // console.log(question)
            sdk.embedGithubProject(
                'problemIDE',
                ide,
                {
                    openFile: 'index.js',
                    height: 600,
                    hideNavigation: false,

                }
            );
        } catch (e) {
            console.log(e)
        }
    }

    const handleOutputURIChange = (event) => {
        setState({ ...state, outputURL: event.target.value })
    }

    const getResponseFromApi = () => {
        console.log(state.outputURL)
        axios.get(state.outputURL
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



    return (
        <>
            {state.loading && <Loader />}
            {state.error &&
                <MuiErrorModal open={true} message={error.message} data={error.data} />

            }
            {state.success &&
                <div className="home">
                    <Box sx={{ width: '100%', typography: 'body', padding:2 }}>
                        <TabContext value={tab}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>

                                <TabList
                                    onChange={handleTabChange}
                                    aria-label="lab API tabs example"
                                    variant="fullWidth"
                                    textColor="primary"
                                    indicatorColor="primary"
                                >
                                    <Tab label="Problem" value="question" sx={{fontSize:15,}} />
                                    <Tab label="Solution" value="soln" sx={{fontSize:15}} />
                                </TabList>
                            </Box>
                            <TabPanel value="question" sx={{margin:-3}} >
                                {/* <div className="home"> */}
                                <h2>{question.title}</h2>
                                <Card>
                                    <CardContent>
                                        <div dangerouslySetInnerHTML={{ __html: question.question }}></div>
                                    </CardContent>
                                </Card>
                                {/* <div>
                    {question.example.map((value,index)=>
                        <Sampleio data={value} key={value._id}/>
                    )}
                </div> */}
                                <div>
                                    <IOMapping data={question.example}  />
                                </div>
                                {/* <iframe src={data.ide}
                    style={{width:'100%', height:'500px', border:'0', borderRadius: '4px', overflow:'hidden'}}
                    title="node-express-rest-template"
                    allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
                    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
                ></iframe> */}
                                {/* <iframe frameborder="0" width="100%" height="500px" src="https://replit.com/@PriyangChaurasi/tempognition?embed=true"></iframe> */}
                                <div id="problemIDE">
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
                                </div>
                                {/* <button onClick={embedIde} >Code</button> */}
                                <Button variant="contained" onClick={() => embedIde(question.ide)}>Code</Button><br /><br />
                                <TextField
                                    hiddenLabel
                                    id="filled-hidden-label-small"
                                    variant="filled"
                                    size="small"
                                    placeholder="Enter Output URL"
                                    value={state.outputURL}
                                    onChange={handleOutputURIChange}
                                /><br /><br />
                                <Button variant="contained" onClick={() => getResponseFromApi()}>Run Test</Button><br /><br />
                                {/* </div> */}
                            </TabPanel>
                            <TabPanel value="soln" sx={{margin:-3}}>
                                <br/>
                                <Solution data={question.soln} />
                            </TabPanel>
                        </TabContext>
                    </Box>
                </div>
            }
        </>
    )
}