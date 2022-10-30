import React from "react";
import { NavLink } from 'react-router-dom';
import s from "./Header.module.sass"

const Header = () => {
  return (
    <div className={s.container}>
        <NavLink to="/addHero" className={s.button}>Add hero!</NavLink>
        <NavLink to="/heroes" className={s.button}>View heroes!</NavLink>
    </div>
  )
}

export default Header