import { Card, CardContent } from '@mui/material'
import React from 'react'
import '../assets/scss/_supportive.scss'


const SupportiveComponent = (props) => {
    return (
        <Card>
            <CardContent>
            <div className="supportive" >
            <h1>{props.value.resource_num}</h1>
            <h4>{props.value.url}</h4>
            <iframe src={props.value.url} title="W3Schools Free Online Web Tutorials" height="400px" width="80%" >
            </iframe>
        </div>
            </CardContent>
        </Card>
    )
}

export default SupportiveComponent

