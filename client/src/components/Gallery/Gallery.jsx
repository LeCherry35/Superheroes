import React, { useRef, useState } from 'react'
import s from './Gallery.module.sass'
import { toBase64 } from '../../helpers/toBase64'
import Button from '../Button/Button'
import GalleryService from '../../services/GalleryService'

const Gallery = (props) => {
  const [newImage, setNewImage] =useState(null)
  const imageInputRef = useRef(null)

  const uploadImage = async (e) => {
    const image = imageInputRef.current.files[0]
    console.log('ty', imageInputRef.current.files)
    if(image) {
      const formData =new FormData()
      formData.append('image', image)
      const res = await GalleryService.uploadImage(props.id, formData)
    }
  }
  return (

    <div className={s.container} >
        {props.images.map(image => {
        
        return (
            <div key={image._id} className={s.image} style={{background: `url('data:${image.image.contentType};base64,${toBase64 (image.image.data.data)}') 0 0/contain no-repeat`}}></div>
        )
      })}
      {props.edit && <div className={s.imageInputContainer}>
          <label 
            className={s.inputLabel} htmlFor='image_upload'>{newImage?.name || 'select'}</label>
          <input 
            className={s.imageInput} 
            id='image_upload' 
            ref={imageInputRef} 
            type='file' 
            name='image'
            accept='.jpg, .jpeg, .png'
            
            onChange={(e)=> {
              setNewImage(...e.target.files)
            }}
          ></input>
          <Button name='add' onClick={(e) => uploadImage(e)}/>
        </div>}
    </div>
  )
}

export default Gallery