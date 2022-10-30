import React from 'react'
import s from './Input.module.sass'

const Input = (props) => {
  return (
    <div className={s.container}>
        <input type='text' className={s.input} placeholder={props.placeholder} onChange={props.onChange} value={props.value}></input>
    </div>
  )
}

export default Input