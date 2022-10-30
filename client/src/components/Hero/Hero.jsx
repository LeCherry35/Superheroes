import React, { useEffect, useState } from 'react'
import { useParams, NavLink } from 'react-router-dom'
import HeroService from '../../services/HeroService'
import s from './Hero.module.sass'
import { toBase64 } from '../../helpers/toBase64'
import Button from '../Button/Button'


const Hero = (props) => {
  const {id} = useParams()
  const [hero, setHero] = useState({})
  const [images, setImages] = useState([])
  useEffect(() => {
    getHero()
  }, [])


  const getHero = async () => {
    const res = await HeroService.getHero(id)
    setHero(res.data)
    const imgRes = await HeroService.getImages(id)
    setImages([...imgRes.data])
    console.log('img', imgRes.data)

  }
  const deleteHero = async () => {
  const res = await HeroService.deleteHero(id)
  }
  return (
    <div className={s.container}>
      <div className={s.nickname}>{hero.nickname}</div>
      {images.map(image => {
        
        return (
          <div >
            <div className={s.image} style={{background: `url('data:${image.image.contentType};base64,${toBase64(image.image.data.data)}') 0 0/contain no-repeat`}}></div>
          </div> 
        )
      })}
        
        <div className={s.field}>Real name: {hero.real_name}</div>
        <div className={s.field}>Origin description: {hero.origin_description}</div>
        <div className={s.field}>Superpowers: {hero.superpowers}</div>
        <div className={s.field}>Catch phrase: {hero.catch_phrase}</div>
        <div className={s.buttonContainer}>
          <NavLink to={`/editHero/${id}`} className={s.button}>Edit hero</NavLink>
          <Button onClick={(e) => deleteHero(id)} name='Delete'/>
        </div>

    </div>
  )
}

export default Hero