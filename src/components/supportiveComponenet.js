import React from 'react'
import '../assets/scss/_supportive.scss'


const SupportiveComponent = (props) => {
    return (
        <div className="supportive">
            <h1>{props.value.id}</h1>
            <h4>{props.value.url}</h4>
        </div>
    )
}

export default SupportiveComponent
