import React, { useEffect, useState } from 'react'
import HeroService from '../../services/HeroService'
import Button from '../Button/Button'
import HeroShortcut from '../HeroShortcut/HeroShortcut'
import s from './Heroes.module.sass'
import Preloader from '../Preloader/Preloader'

const Heroes = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [buttonDisabled, setButtonDisabled] = useState(false)
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
    try {
      setIsLoading(true)
      setButtonDisabled(true)
      const res = await HeroService.getHeroes(q, page)
      const newHeroes = res.data
      const n = await HeroService.getHeroesNumber()
      // ask Eugene if I need a callback here
      setHeroes([...heroes, ...newHeroes])
      setIsLoading(false)
      if(q*(page + 1) < n.data)setButtonDisabled(false)
    }catch(e){
      setIsLoading(false)
    }
    
    
  }

  return (
    <div className={s.container}>
      <div className={s.heroesContainer}> 
        {heroes.map(hero => {
          return (
            <HeroShortcut 
              key={hero._id}
              id={hero._id}
              nickname={hero.nickname} 
              image={hero.image}
            />
          )
        })}
      </div>
      {isLoading ? <Preloader /> : <></>}
      {buttonDisabled ? <></> : <Button name='Show more heroes' onClick={(e) => setPage(page + 1)}/>}
    </div>
  )
}

export default Heroes