import React from 'react';
import { TagRow } from './';


export default function MasonryPost (props) {
  const windowWidth = window.innerWidth
  const imageBackground = {backgroundImage: `url("${require(`../../assets/images/${props.post.image}`)}")`};
  //console.log(imageBackground)
  const style = windowWidth > 900 ? {...imageBackground, ...props.post.style} : imageBackground

  return (
    <a className="masonary-post overlay" style={style} href={props.post.link}>
      <div className="image-text" style={{justifyContent: props.tagsOnTop ? 'space-between' : 'flex-end'}}>
        <TagRow tags={props.post.categories} />
        <div>
          <h2 className="image-title">{props.post.title}</h2>
          <span className="image-date">{props.post.date}</span>
        </div>
      </div>
    </a>
  )
}