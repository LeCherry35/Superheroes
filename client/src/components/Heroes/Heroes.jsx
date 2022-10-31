import React, { useEffect, useState } from 'react'
import HeroService from '../../services/HeroService'
import Button from '../Button/Button'
import HeroShortcut from '../HeroShortcut/HeroShortcut'
import s from './Heroes.module.sass'

const Heroes = () => {

  const q = 5
  const [page, setPage] = useState(0)

  const [heroes, setHeroes] = useState([])

  useEffect(() => {
    getHeroes(q, page)
  },[page])

  // useEffect(() => {
  //   console.log(heroes)
  // },[heroes])

  const getHeroes = async (q, page) => {
    const res = await HeroService.getHeroes(q, page)
    const newHeroes = res.data
    // ask Eugene if I need a callback here
    setHeroes([...heroes, ...newHeroes])
  }

  return (
    <div className={s.container}>
    Heroes
      <div className={s.heroesContainer}> 
        {heroes.map(hero => {
          return (
            <HeroShortcut 
              key={hero._id}
              id={hero._id}
              nickname={hero.nickname} 
              name={hero.real_name} 
              superpowers={hero.superpowers} 
              origin={hero.origin_description} 
              phrase={hero.catch_phrase}
            />
          )
        })}
      </div>
      <Button name='Show more heroes' onClick={(e) => setPage(page + 1)}/>
    </div>
  )
}

export default Heroes