import React from "react";
import { Link } from 'react-router-dom';
import s from "./Header.module.sass"

const Header = () => {
  return (
    <div className={s.container}>
        <Link to="/addHero" className={s.button}>Add hero!</Link>
        <Link to="/heroes" className={s.button}>View heroes!</Link>
    </div>
  )
}

export default Header