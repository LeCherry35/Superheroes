import React, { useState, useRef, useEffect } from 'react'
import Input from '../Input/Input'
import s from './HeroInfo.module.sass'
import { toBase64 } from '../../helpers/toBase64'

const HeroInfo = (props) => {
  const imageInputRef = useRef(null)
  const[prev, setPrev] = useState(null)
  const imgUrl = props.hero.image ? `data:${props.hero.image.contentType};base64,${toBase64 (props.hero.image.data.data)}` : null
  const imageHandler = (img) => {
    props.setPreview(img)
    const reader = new FileReader ()
    reader.onload = () => {
      if(reader.readyState === 2){
        setPrev(reader.result)
      }
    }
    reader.readAsDataURL(img)
  }
  // useEffect(() => {

  //   console.log('p',prev);
  //   console.log('u',imgUrl);
  // },[prev,imgUrl])

  return (
    <div className={s.container}>
    
      {props.edit 
      ? <div className={s.imageInputContainer}>
        {(prev || imgUrl) 
        ? <label className={s.prev}htmlFor='image_upload_ava'>
          <img className={s.avatar} src={prev || imgUrl} alt='avatar'/>
          <div className={s.prevText}>click to change</div>
        </label> 
      : <label className={s.inputLabel} htmlFor='image_upload_ava'>Choose image</label>}
        
        <input 
          className={s.imageInput} 
          id='image_upload_ava' 
          ref={imageInputRef}
          type='file' 
          name='image'
          accept='.jpg, .jpeg, .png'
          onChange={(e)=> {
            imageHandler(e.target.files[0])
          }}
        ></input>
      </div>
      : props.hero.image && <div  className={s.avatar} style={{background: `url('data:${props.hero.image.contentType};base64,${toBase64 (props.hero.image.data.data)}') 0 0/contain no-repeat`}}></div>}
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