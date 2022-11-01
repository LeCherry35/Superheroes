import React, { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import HeroService from '../../services/HeroService'
import s from './Hero.module.sass'
import Button from '../Button/Button'
import Gallery from '../Gallery/Gallery'
import HeroInfo from '../HeroInfo/HeroInfo'
import { addHeroAsync, deleteHeroAsync, editHeroAsync } from '../../async-middleware/hero'
import Preloader from '../Preloader/Preloader'
import GalleryService from '../../services/GalleryService'



const Hero = (props) => {
  const [isLoading, setIsLoading] = useState(false)
  const {id} = useParams()
  const [hero, setHero] = useState({})
  const [images, setImages] = useState([])
  const [avatar, setAvatar] = useState(null)
  const [edit, setEdit] = useState(props.edit)
  
  let navigate = useNavigate();
  
  const imageInputRef = useRef(null)
  useEffect(() => {
    id && getHero()
    props.new && setHero({})
    props.new && setEdit(true)
  }, [id, edit])

  const toggleEdit = () => {
    setEdit(!edit)
  }
  const getHero = async () => {
    try {
      setIsLoading(true)
      const res = await HeroService.getHero(id)
      setHero(res.data)
      const imgRes = await GalleryService.getImages(id)
      const images = [res.data, ...imgRes.data]
      setImages(images)
      setIsLoading(false)
    }catch(e){
      setIsLoading(false)
    }
    
  }
  const addHero = async (e) => {
    try {
      setIsLoading(true)
      console.log(isLoading,'iL');
      const image = imageInputRef.current.files[0]
      toggleEdit(false)
      await addHeroAsync(hero, image)
      setIsLoading(false)
      // return navigate(`/hero/${id}`)
      return navigate('/heroes')
    }catch(e){
      setIsLoading(false)
    }
  }
  const editHero = async (e) => {
    try {
      setIsLoading(true)
      setIsLoading(true)
      const image = imageInputRef.current.files[0]
      await editHeroAsync(id, hero, image)
      setIsLoading(false)
      return navigate('/heroes')
    }catch(e){
      setIsLoading(false)
    }
  }
  const deleteHero = async (e) => {
    setIsLoading(true)
    await deleteHeroAsync(id)
    setIsLoading(false)
    return navigate('/heroes')
  }

  
  return (
    <div className={s.container}>
    {isLoading 
    ? <Preloader />
    : <>
    <div className={s.heroContainer}>
      <HeroInfo edit={edit} hero={hero} setHero={setHero}/>
      {props.new
        ? <div className={s.imageInputContainer}>
          <label className={s.inputLabel} htmlFor='image_upload'>{'Add image'}</label>
          <input 
            className={s.imageInput} 
            id='image_upload' 
            ref={imageInputRef} 
            type='file' 
            name='image'
            accept='.jpg, .jpeg, .png'
            onChange={(e)=> {
              setAvatar(...e.target.files)
            }}
          ></input>
        </div>
        : <Gallery images={images} id={id} edit={edit}/>}
      
      </div>  
      
        <div className={s.buttonContainer}>
          {id
          ? edit 
            ? <><Button 
              onClick={(e) => editHero(e)}
              name='Save'/>
            </>
            : <>
              <Button onClick={(e) => toggleEdit()} name='Edit'/>
              <Button onClick={(e) => deleteHero(e)} name='Delete'/>
              </>
          : <Button onClick={(e) => addHero(e)} name='Add hero!'/>
          }
          
        </div>
        </>}
    </div>
  )
}

export default Hero