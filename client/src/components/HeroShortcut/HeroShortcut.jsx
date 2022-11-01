import React from 'react'
import { useNavigate } from 'react-router-dom'
import s from './HeroShortcut.module.sass'
import { toBase64 } from '../../helpers/toBase64'

const HeroShortcut = (props) => {
  let navigate = useNavigate();
  return (
    <div className={s.container} onClick={(e) => navigate(`/hero/${props.id}`)}>
         <div className={s.image} style={props.image ? {background: `url('data:${props.image?.contentType};base64,${toBase64 (props.image.data.data)}') 0 0/contain no-repeat`} : {}}></div>
        <div className={s.nickname}>{props.nickname}</div>
    </div>
  )
}

export default HeroShortcut