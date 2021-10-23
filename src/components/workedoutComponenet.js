import React from 'react'
import '../assets/scss/_supportive.scss'


const WorkedOutComponent = (props) => {
    return (
        <div className="supportive">
            <h1>{props.value.question}</h1>
            <h2>{props.value.sample_input}</h2>
            <h2>{props.value.sample_output}</h2>
            <h2>{props.value.ans}</h2>
        </div>
    )
}

export default WorkedOutComponent