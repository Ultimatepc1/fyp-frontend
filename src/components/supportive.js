import React from 'react'
import '../assets/scss/_supportive.scss'


const SupportiveComponent = (props) => {
    return (
        <div className="supportive">
            <h1>{props.value.id}</h1>
            <h2>{props.value.url}</h2>
        </div>
    )
}

export default SupportiveComponent
