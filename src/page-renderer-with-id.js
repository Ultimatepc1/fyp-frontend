import React from 'react'
import { useRouteMatch } from 'react-router-dom'

const generatePage = (page, id, isLoggedIn, changeLogin) =>{
    const component = () => require(`./pages/${page}`).default

    try{
        console.log(id)
        return React.createElement(component(), {id, isLoggedIn, changeLogin})
    }catch(err){
        console.warn(err)
        return React.createElement(() => 404)
    }
}
export default function PageRendererWithId(props){
    const{
        params : { page, id }
    } = useRouteMatch()

    // console.log('page renderer id', props)
    return generatePage(page, id, props.isLoggedIn, props.changeLogin)
}