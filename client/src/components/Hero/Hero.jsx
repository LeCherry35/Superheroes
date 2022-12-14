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
      const image = preview
      toggleEdit(false)
      const res = await addHeroAsync(hero, image)
      setPreview(null)
      setIsLoading(false)
      setEdit(false)
      return navigate(`/hero/${res.data._id}`)
    }catch(e){
      setIsLoading(false)
      return navigate('/heroes')
    }
  }
  const editHero = async (e) => {
    try {
      setIsLoading(true)
      await editHeroAsync(id, hero, preview)
      setIsLoading(false)
      setEdit(false)
      return navigate(`/hero/${id}`)
    }catch(e){
      setIsLoading(false)
      setEdit(false)
      return navigate(`/hero/${id}`)
      
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
      <HeroInfo edit={edit} hero={hero} setHero={setHero} preview={preview} setPreview={setPreview}/>
      {props.new
        ? <></>
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