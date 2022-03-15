import { Card, CardContent } from '@mui/material'
import React from 'react'
import moment from 'moment'

const SubmissionComponent = (props) => {

    
    console.log("--------data------");
    console.log(props.value.data);
    var curSubmissionDate=new Date(props.value.createdAt)
    return (
        <div>
            <Card>
                <CardContent sx={{boxShadow:"0px"}}>
                    <h1>Submission {props.id} | Submitted on : {moment(curSubmissionDate.getTime()).format("DD-MM-YYYY h:mm:ss")}</h1>
                    {/* <h4>index.js</h4><br/> */}
                    {/* <SubSubmissionComponent data={props.value.data}/> */}
                    {/* <p>{props.value.data['index.js']}</p> */}
                </CardContent>
            </Card>
            <br/>
        </div>
    )
}

export default SubmissionComponent

const SubSubmissionComponent = (props) => {
    return (
        <div>
            {props.data.map((data)=>{
                return <h1>{data}</h1>
            })}
        </div>
    )
}