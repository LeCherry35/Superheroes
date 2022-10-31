import React from 'react'
import s from './Gallery.module.sass'
import { toBase64 } from '../../helpers/toBase64'

const Gallery = (props) => {
    console.log('p',props);
  return (
    <div className={s.container} >
        {props.images.map(image => {
        
        return (
            <div key={image._id} className={s.image} style={{background: `url('data:${image.image.contentType};base64,${toBase64 (image.image.data.data)}') 0 0/contain no-repeat`}}></div>
        )
      })}
        
    </div>
  )
}

export default Gallery