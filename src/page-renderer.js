import React from 'react'
import { useRouteMatch } from 'react-router-dom'

const generatePage = (page, isLoggedIn, changeLogin) =>{
    const component = () => require(`./pages/${page}`).default

    try{
        return React.createElement(component(), {isLoggedIn, changeLogin})
    }catch(err){
        console.warn(err)
        return React.createElement(() => 404)
    }
}
export default function PageRenderer(props){
    const{
        params : { page }
    } = useRouteMatch()

    // console.log('home in page renderer', props)
    return generatePage(page, props.isLoggedIn, props.changeLogin)
}