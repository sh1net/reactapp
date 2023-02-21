import React from 'react'
import '../Support/SupportStyles.css'
import shinet from '../../img/shinet.jpg'
import ahrisai from '../../img/ahrisai.jpg'
import telega from '../../img/telega.png'
import mail from '../../img/mail.png'

function Support() {

  return (
    <div className='support__bg'>
      <div className='support__header'>
      <div className='support__title'> Arish Team</div>
      </div>
    <div className='support__container'>
        <div className='support__item'>
        <img className='item__img' style={{border: '1px solid rgb(69, 114, 236)',boxShadow: '0 0 30px rgb(69, 114, 236)'}} src={shinet} alt="" />
        <div className='item__text'>shinet</div>
        <div className='media__ref'>
        <img className='media__icon' src={telega} alt="" />
        <a className='item__ref' href="https://t.me/sh1net11">@sh1net11</a>
        </div>
        <div className='media__ref'>
        <img className='media__icon' src={mail} alt="" />
        <div className='item__ref' href="">shizik2281337@gmail.com</div>
        </div>
        </div>

        <div className='support__item'>
        <img className='item__img' src={ahrisai} alt="" />
        <div className='item__text'>ahrisai</div>
        <div className='media__ref'>
        <img className='media__icon' src={telega} alt="" />
        <a className='item__ref' href="https://t.me/ahrisai">@ahrisai</a>
        </div>
        <div className='media__ref'>
        <img className='media__icon' src={mail} alt="" />
        <div className='item__ref' href="">ilia280704@gmail.com</div>
        </div>
        </div>
    </div>
    <div className="footer__text">По всем возникшим у вас вопросом просим обращаться, используя контакты, описанные выше</div>
    </div>
  )
}

export default Support