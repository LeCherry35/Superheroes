import React, { useState, useRef, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import HeroService from '../../services/HeroService'
import Button from '../Button/Button'
import Input from '../Input/Input'
import { toBase64 } from '../../helpers/toBase64'
import s from './HeroForm.module.sass'


const EditHeroForm = (props) => {
  
  const {id} = useParams()
  const [nickname, setNickname] = useState('')
  const [name, setName] = useState('')
  const [origin, setOrigin] = useState('')
  const [superpowers, setSuperowers] = useState('')
  const [phrase, setPhrase] = useState('')
  const [images, setImages] = useState([])


  useEffect(() => {
    getHero()
  }, [])
  
  
  const getHero = async () => {
    const res = await HeroService.getHero(id)
    const imgRes = await HeroService.getImages(id)
    
    setNickname(res.data.nickname)
    setSuperowers(res.data.superpowers)
    setName(res.data.real_name)
    setOrigin(res.data.origin_description)
    setPhrase(res.data.catch_phrase)
    setImages([...imgRes.data])
    console.log('set');
  }
  

  const imageInputRef = useRef(null)

  // useEffect(()=> {
  //   console.log('immy', nickname);
  // },[images,nickname])

  const editHero = async (nickname, name, origin, superpowers, phrase, id) => {
    const res = await HeroService.editHero(nickname, name, origin, superpowers, phrase, id)
    console.log(`${res.data.nickname} succesfully edited`);
  }
  

  const uploadImage = async (heroId) => {
    const image = imageInputRef.current.files[0]
    const formData =new FormData()
    formData.append('image', image)
    const res = await HeroService.uploadImage(heroId, formData)
  }

  return (
    <div className={s.container}>
        <div className={s.heading}>Edit {nickname}</div>  
        {images.map(image => {
          return (
            <div>
            <div className={s.image} style={{background: `url('data:${image.image.contentType};base64,${toBase64(image.image.data.data)}') 0 0/contain no-repeat`}}></div>
            </div> 
          )
        })}
        <Input placeholder='Real name' onChange={(e) => setName(e.target.value)} value={name}/>
        <Input placeholder='Origin' onChange={(e) => setOrigin(e.target.value)} value={origin}/>
        <Input placeholder='Superpowers' onChange={(e) => setSuperowers(e.target.value)} value={superpowers}/>
        <Input placeholder='Catch phrase' onChange={(e) => setPhrase(e.target.value)} value={phrase}/>
        <div className={s.imageInputContainer}>
          <label 
            className={s.inputLabel} htmlFor='image_upload'>{images.name || 'Add image'}</label>
          <input 
            className={s.imageInput} 
            id='image_upload' 
            ref={imageInputRef} 
            type='file' 
            name='image'
            accept='.jpg, .jpeg, .png'
            multiple={true}
            // onChange={(e)=> {
            //   setImages(...e.target.files)
            // }}
          ></input>
        </div>
        <Button onClick={(e) => editHero(nickname, name, origin, superpowers, phrase, id)} name='Save'/>
    </div>
  )
}

export default EditHeroForm