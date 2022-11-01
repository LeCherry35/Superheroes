import React, { useEffect, useState } from 'react'
import Button from '../Button/Button'
import HeroShortcut from '../HeroShortcut/HeroShortcut'
import s from './Heroes.module.sass'
import Preloader from '../Preloader/Preloader'
import { getHeroesAsync } from '../../async-middleware/heroes'

const Heroes = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const q = 5
  const [page, setPage] = useState(0)

  const [heroes, setHeroes] = useState([])

  useEffect(() => {
    getHeroes(q, page)
    
  },[page])

  const getHeroes = async (q, page) => {
    try {
      setIsLoading(true)
      setButtonDisabled(true)
      const {newHeroes, all} = await getHeroesAsync(q, page)
      setHeroes([...heroes, ...newHeroes])
      setIsLoading(false)
      !all && setButtonDisabled(false)
    }catch(e){
      setIsLoading(false)
    }
    
    
  }

  return (
    <div className={s.container}>
      <div className={s.heroesContainer}> 
        {
          
          heroes && heroes.map((hero,id,arr) => {
          return (
            <HeroShortcut 
              // prev={id>arr[id-1]._id}
              // next={arr[id+1]._id}
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