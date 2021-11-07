import React, { useEffect, useState } from "react";
import data from '../api/mocks/completion_one_YFG5';
import '../assets/scss/_home.scss';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import sdk from '@stackblitz/sdk'
import axios from 'axios'



export default function Problems(props) {

    const [state, setState] = useState({ invalid: true, id: null, outputURL: "" });
    const [question, setQuestion] = useState(data)

    const getId = async (id) => {
        setState(prevState => ({ ...prevState, id: id }))
        if (id === 'YFG5') {
            setState(prevState => ({ ...prevState, invalid: false }))
        }
        console.log(state.invalid);
    }

    useEffect(() => {
        try {
            // id=props.match.params.id;
            getId(props.id);
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
            console.log('workedout page error in useffect')
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
                    hideNavigation: false
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
        axios.get(state.outputURL, {
            headers: {
                'X-Id-Token': 'abc123abc123',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                "sec-ch-ua": `"Microsoft Edge";v="95", "Chromium";v="95", ";Not A Brand";v="99"`,
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": `"Windows"`,
                "upgrade-insecure-requests": "1"
            }
        }).then(response => {
            console.log(response)
        }).catch(err => {
            console.log(err)
        })
    }



    return (
        <>
            <h2>{data.title}</h2>
            {state.invalid ? <div>Invalid ID</div> : <div className="home">
                <h2>{question.title}</h2>
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
            </div>
            }
        </>
    )
}