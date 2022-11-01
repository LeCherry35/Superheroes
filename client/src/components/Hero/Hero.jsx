import React, { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import s from './Hero.module.sass'
import Button from '../Button/Button'
import Gallery from '../Gallery/Gallery'
import HeroInfo from '../HeroInfo/HeroInfo'
import { addHeroAsync, deleteHeroAsync, editHeroAsync, getHeroAsync } from '../../async-middleware/hero'
import Preloader from '../Preloader/Preloader'



const Hero = (props) => {
  const [isLoading, setIsLoading] = useState(false)
  const {id} = useParams()
  const [hero, setHero] = useState({})
  const [edit, setEdit] = useState(props.edit)
  const [preview, setPreview] = useState(null)
  
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
      const res = await getHeroAsync(id)
      setHero(res.data)
      setIsLoading(false)
    }catch(e){
      setIsLoading(false)
    }
    
  }
  const addHero = async (e) => {
    try {
      e.preventDefault()
      setIsLoading(true)
      const image = imageInputRef.current.files[0]
      toggleEdit(false)
      await addHeroAsync(hero, image)
      setPreview(null)
      setIsLoading(false)
      // return navigate(`/hero/${id}`)
      // return navigate('/heroes')
    }catch(e){
      setIsLoading(false)
    }
  }
  const editHero = async (e) => {
    try {
      setIsLoading(true)
      await editHeroAsync(id, hero)
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
    <div className={s.container}>
    {isLoading 
    ? <Preloader />
    : <>
    <div className={s.heroContainer}>
      {hero && <HeroInfo edit={edit} hero={hero} setHero={setHero}/>}
      {props.new
        ? <div className={s.imageInputContainer}>
          <label className={s.inputLabel} htmlFor='image_upload'>
          {preview 
          ? <img className={s.preview} src={preview} alt='prev'/>
          : 'Add image'}
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
        </div>
        : <Gallery id={id} edit={edit}/>}
      
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