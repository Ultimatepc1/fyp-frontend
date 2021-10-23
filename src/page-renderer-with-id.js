import React from 'react'
import { useRouteMatch } from 'react-router-dom'

const generatePage = (page, id) =>{
    const component = () => require(`./pages/${page}`).default

    try{
        console.log(id)
        return React.createElement(component(), {id})
    }catch(err){
        console.warn(err)
        return React.createElement(() => 404)
    }
}
export default function PageRendererWithId(){
    const{
        params : { page, id }
    } = useRouteMatch()

    return generatePage(page, id)
}