import React from 'react'
import '../assets/scss/_supportive.scss'


const WorkedOutComponent = (props) => {
    return (
        <div className="supportive">
            {/* <h4>{props.value.eg_no}</h4> */}
            <h1 style={{color:'brown'}}>Question : {props.value.eg_no}. {props.value.question}</h1>
            <h2>{props.value.sample_input}</h2>
            {/* <p>{props.value.sample_output}</p> */}
            <h4 style={{color:'tomato'}}>Expected output :</h4>
            <div dangerouslySetInnerHTML={{ __html:  props.value.sample_output }}></div>
            {props.value.ans && <iframe src={props.value.ans}
                    style={{width:'100%', height:'500px', border:'0', borderRadius: '4px', overflow:'hidden'}}
                    title="node-express-rest-template"
                    allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
                    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
                ></iframe>}
            

        </div>
    )
}

export default WorkedOutComponent