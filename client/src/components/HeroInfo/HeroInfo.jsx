import React from 'react'
import Input from '../Input/Input'
import s from './HeroInfo.module.sass'

const HeroInfo = (props) => {
  return (
    <div className={s.container}>
      <div className={!props.edit ? s.nickname : s.n}>
        {props.edit && <span className={s.heading}>Nickname:</span>}
        <Input value={props.hero.nickname} onChange={(e) => props.setHero({...props.hero, nickname: e.target.value})} disabled={!props.edit}/>
        </div> 
      <span className={s.heading}>Real name:</span>
      <Input value={props.hero.real_name} onChange={(e) => props.setHero({...props.hero, real_name: e.target.value})} disabled={!props.edit}/>
      <span className={s.heading}>Origin:</span>
      <Input value={props.hero.origin_description } onChange={(e) => props.setHero({...props.hero, origin_description: e.target.value})} disabled={!props.edit}/>
      <span className={s.heading}>Superpowers:</span>
      <Input value={props.hero.superpowers} onChange={(e) => props.setHero({...props.hero, superpowers: e.target.value})} disabled={!props.edit}/>
      <span className={s.heading}>Phrase:</span>
      <Input value={props.hero.catch_phrase} onChange={(e) => props.setHero({...props.hero, catch_phrase: e.target.value})} disabled={!props.edit}/>
    </div>
  )
}

export default HeroInfo