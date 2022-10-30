import React from 'react'
import { NavLink } from 'react-router-dom'
import s from './HeroShortcut.module.sass'

const HeroShortcut = (props) => {
  return (
    <div className={s.container}>
        <div>image</div>
        <div className={s.nickname}>{props.nickname}</div>
        <NavLink to={`/hero/${props.id}`}> check </NavLink>
    </div>
  )
}

export default HeroShortcut