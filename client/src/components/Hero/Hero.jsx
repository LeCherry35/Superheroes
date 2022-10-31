import React, { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import HeroService from '../../services/HeroService'
import s from './Hero.module.sass'
import Button from '../Button/Button'
import Gallery from '../Gallery/Gallery'
import HeroInfo from '../HeroInfo/HeroInfo'



const Hero = (props) => {
  const {id} = useParams()
  const [hero, setHero] = useState({})
  const [images, setImages] = useState([])
  const [edit, setEdit] = useState(props.edit)
  
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
    const res = await HeroService.getHero(id)
    setHero(res.data)
    const imgRes = await HeroService.getImages(id)
    setImages([...imgRes.data])
  }
  const addHero = async (nickname, name, origin, superpowers, phrase) => {
    const res = await HeroService.addHero(nickname, name, origin, superpowers, phrase)
    uploadImage(res.data._id)
    console.log(`${res.data.nickname} succesfully added to database`);
    toggleEdit(false)
    // return navigate(`/hero/${res.data._id}`)
    return navigate('/heroes')
    
  }
  const editHero = async (nickname, name, origin, superpowers, phrase, id) => {
    const res = await HeroService.editHero(nickname, name, origin, superpowers, phrase, id)
    console.log(`${res.data.nickname} succesfully edited`);
    return navigate(`/hero/${id}`)
  }
  const deleteHero = async () => {
    const res = await HeroService.deleteHero(id)
    console.log(`${res.data.nickname} succesfully deleted`);
  return navigate('/heroes')
  }
  const imageInputRef = useRef(null)

  const uploadImage = async (heroId) => {
    const image = imageInputRef.current.files[0]
    if(image) {
      const formData =new FormData()
      formData.append('image', image)
      const res = await HeroService.uploadImage(heroId, formData)
    }
  }
  return (
    <div className={s.container}>
    
    <div className={s.heroContainer}>
      <HeroInfo edit={edit} hero={hero} setHero={setHero}/>
      {id && images && <Gallery images={images}/>}
      {edit && 
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
        </div>}
    </div>
        <div className={s.buttonContainer}>
          {id
          ? edit 
            ? <Button onClick={(e) => editHero(hero.nickname, hero.real_name, hero.origin_description, hero.superpowers, hero.catch_phrase, id)
                } name='Save'/>
            : <>
              <Button onClick={(e) => toggleEdit()} name='Edit'/>
              <Button onClick={(e) => deleteHero(id)} name='Delete'/>
              </>
          : <Button onClick={(e) => addHero(hero.nickname, hero.real_name, hero.origin_description, hero.superpowers, hero.catch_phrase)} name='Add hero!'/>
              }
            {/* <NavLink to={`/editHero/${id}`} className={s.button}>Edit hero</NavLink> */}

           
          
        </div>

    </div>
  )
}

export default Hero