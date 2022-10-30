import React from 'react'
import s from "./Button.module.sass"

const Button = (props) => {
  return (
    <div className={s.container}>
        <button type="submit" className={s.button} disabled={props.disabled} onClick={props.onClick}>{props.name}</button>
    </div>
  )
}

export default Button