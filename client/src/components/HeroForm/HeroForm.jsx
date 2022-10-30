import React, { useState, useRef, useEffect } from 'react'
import HeroService from '../../services/HeroService'
import Button from '../Button/Button'
import Input from '../Input/Input'
import s from './HeroForm.module.sass'


const HeroForm = (props) => {

  const [nickname, setNickname] = useState('')
  const [name, setName] = useState('')
  const [origin, setOrigin] = useState('')
  const [superpowers, setSuperowers] = useState('')
  const [phrase, setPhrase] = useState('')
  const [images, setImages] = useState([])
  

  const imageInputRef = useRef(null)

  // const editHero = async (nickname, name, origin, superpowers, phrase, id) => {
  //   const res = await HeroService.editHero(nickname, name, origin, superpowers, phrase, id)
  //   console.log(`${res.data.nickname} succesfully added to database`);
  // }
  const addHero = async (nickname, name, origin, superpowers, phrase) => {
    const res = await HeroService.addHero(nickname, name, origin, superpowers, phrase)
    uploadImage(res.data._id) 
    console.log(`${res.data.nickname} succesfully added to database`);
    setNickname('')
    setName('')
    setOrigin('')
    setSuperowers('')
    setPhrase('')
  }

  const uploadImage = async (heroId) => {
    const image = imageInputRef.current.files[0]
    const formData =new FormData()
    formData.append('image', image)
    const res = await HeroService.uploadImage(heroId, formData)
  }

  return (
    <div className={s.container}>
        <div className={s.heading}>Add a new superhero</div>  
        <Input placeholder='Nickname' onChange={(e) => setNickname(e.target.value)} value={nickname}/>
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
            onChange={(e)=> {
              setImages(...e.target.files)
            }}
          ></input>
        </div>
        <Button onClick={(e) => addHero(nickname, name, origin, superpowers, phrase)} name='Add hero'/>
    </div>
  )
}

export default HeroForm