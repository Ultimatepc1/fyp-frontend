import React from 'react'
import { MasonaryPost } from './'

export default function PostMasonary(props){
    const tagsOnTop = props.tagsOnTop;
    //console.log(props.columns)
    return(
        <section className = "masonary" style = {{gridTemplateColumns: `repeat(${props.columns}, minmax(275px, 1fr))`}}>
            {props.posts.map((post, index) => 
                //shortcut for passing props to a component
                <MasonaryPost {...{post ,index ,tagsOnTop, key: index}}/>
            )}
        </section>
    );
}