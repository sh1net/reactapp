import React from 'react'
import   '../../Components/AboutUs/AboutUs.css'
import about1 from '../../img/about1.png'
import about2 from '../../img/about2.png'
import about3 from '../../img/about3.png'
function AboutUsInformation() {
  return (
    <div className='about__container'>
        <div className="about__item">
            <div className="about__item__text">     Данный проект был осуществлен двумя неполированными алмазами, драго -
ценными брилиантами Мусташевым Артемом Дмитриевичем он же AK Sh1nett
и Шпаком Ильей Павловичем он же AK Ahrisai. Если вы уже проходили наши
тесты и обращали внимание на ели заметную надпись arishtets, то даже двух
летний ребенок догадается, что она состоит из частей наших ников. Хотим вам
повествовать одну недолгую историю создания нашего сайта, который естест -
венно в скором времени у нас купить невероятнейшая компания SELLWIN - 
System. </div>
            <img src={about1} alt="" className="about__item__img" />
        </div>
        <div className="about__item">
            <img src={about2} alt="" className="about__item__img" />
            <div className="about__item__text">          Честно говоря у нас плавились мозги и тонули в жарке кипящего масла, 
пока мы познавали с истоков такую библиотеку J A V A S C R I P T как всеми 
известная и любимая библиотека REACT. По началу мы закинули немного 
маслица на сковородку наших знаний для подготовки жарки, затем заки - 
нули наши извилины в  самое пекло, потихоньку подливая масло и прида - 
вая жар в котельню. С каждым градусом наш мозг все закалялся и зака - 
лялся пока не понял что ему этого мало... Так мы добрались до хуков.
хуки довольно интересная вещь и это вам не пудж из доты 2 и не скорпион
из M O R T A L C O M B A T. Да... Да! Да ребят, это хуки из React JS. </div>
        </div>
        <div className="about__item">
            <div className="about__item__text">не придумал ююююююююююююююююююююююююююююююююююююююююююююююююююююююю
ююююююююююююююююююююююююююююююююююююююююююююююююююююююююююююююю
ююююююююююююююююююююююююююююююююююююююююююююююююююююююююююююююю
ююююююююююююююююююююююююююююююююююююююююююююююююююююююююююююююю
ююююююююююююююююююююююююююююююююююююююююююююююююююююююююююююююю
ююююююююююююююююююююююююююююююююююююююююююююююююююююююююююююююю
ююююююююююююююююююююююююююююююююююююююююююююююююююююююююююююююю
ююююююююююююююююююююююююююююююююююююююююююююююююююююююююююююююю</div>
<img src={about3} alt="" className="about__item__img" />
        </div>
    </div>
  )
}

export default AboutUsInformation