import React, { useEffect, useRef, useState } from 'react'
import s from './Gallery.module.sass'
import { toBase64 } from '../../helpers/toBase64'
import Button from '../Button/Button'
import Preloader from '../Preloader/Preloader'
import { deleteImageAsync, getImagesAsync, uploadImageAsync } from '../../async-middleware/gallery'

const Gallery = (props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [images, setImages] = useState([])
  const imageInputRef = useRef(null)
  const [preview, setPreview] = useState(null)

  useEffect(() => {
    getImages()
  },[])

  const getImages = async () => {
    setIsLoading(true)
    const images = await getImagesAsync(props.id)
    setImages(images.data)
    setIsLoading(false)
  }

  const uploadImage = async (e) => {
    setIsLoading(true)
    const image = imageInputRef.current.files[0]
    if(image) {
      const formData =new FormData()
      formData.append('image', image)
      const res = uploadImageAsync(props.id, formData)
      setPreview(null)
    }
    getImages()
  }
  const deleteImage = async (e, imageId)=> {
    setIsLoading(true)
    const res = await deleteImageAsync(imageId)
    getImages()
  }
  // const setImage = async (e,image) => {
  //   const formData =new FormData()
  //   if(image) formData.append('image', image)
  //   const res = await HeroService.editHero(props.id, formData)
  //   console.log('r', res)
  // }
  const imageHandler = (e) => {
    const reader = new FileReader ()
    reader.onload = () => {
      if(reader.readyState === 2){
        setPreview(reader.result)
      }
    }
    reader.readAsDataURL(e.target.files[0])
  }
  return (
    <>
{isLoading 
? <Preloader/>
: <div className={s.container} >
        {images && images.map(image => {
        return (
          <div key={image._id} className={s.imageContainer}>
            <div  className={s.image} style={{background: `url('data:${image.image.contentType};base64,${toBase64 (image.image.data.data)}') 0 0/contain no-repeat`}}>
            </div>
              {props.edit && <>
                <button className={s.miniButton} onClick={(e) => deleteImage(e, image._id)}>delete</button>
                {/* <button className={s.miniButton} onClick={(e) => setImage(e, image.image)}>set</button> */}
              </>}
              </div>
        )
      })}
      {props.edit && <div className={s.imageInputContainer}>
          <label 
            className={s.inputLabel} htmlFor='image_upload'>
            {preview 
          ? <img className={s.preview} src={preview} alt='prev'/>
          : 'select'}
          </label>
          <input 
            className={s.imageInput} 
            id='image_upload' 
            ref={imageInputRef} 
            type='file' 
            name='image'
            accept='.jpg, .jpeg, .png'
            onChange={(e)=> {
              imageHandler(e)
            }}
          ></input>
          <Button name='add' onClick={(e) => {uploadImage(e)}}/>
        </div>}
    </div>}
    </>
  )
}

export default Gallery