import React from 'react'
import   '../../Components/MainInformation/MainInformationStyles.css'
import mainInf_1 from '../../img/mainInf_1.png'
import mainInf_2 from '../../img/mainInf_2.png'
import mainInf_3 from '../../img/mainInf_3.png'
function MainInformation() {
  return (
    <div className='info__container'>
        <div className="info__item">
            <div className="info__item__text">     Вас приветствует проект ARISHTEST, в котором вы можете найти большое 
количество тестов в различных направлениях вашей заинтересованности. 
В данном проекте вы можете отслеживать статистику про пройденным вами 
тестам в виде процентных соотношений првильных/неправильных ответов 
или диаграмм. Также вы будете получать баллы и занимать место в рейтинге 
пользователей за наивысшее количество баллов и наименьшее время, 
затраченное на прохождение теста. Удачи вам в тестировании и 
саморазвитии </div>
            <img src={mainInf_1} alt="" className="info__item__img" />
        </div>
        <div className="info__item">
            <img src={mainInf_2} alt="" className="info__item__img" />
            <div className="info__item__text">     Данный проект позволяет отслежтвать наиболее сложные и легкие 
вопросы для составления тестов новых уровней(от самых легких, до 
самых сложных) <br />
.Всего есть несколько уровней сложности тестов: <br/>
Easy<br/>
Normal<br/>
Madium<br/>
Hard<br/>
Wunderkind<br/>
В зависимости от уровня вы будете получать больше или меньше баллов.</div>
        </div>
        <div className="info__item">
            <div className="info__item__text">     Система рейтинга представляет собой набор баллов каждого поль -
зователя, на основе которого формируется список участников с наиболь 
шим количеством баллов. Данный рейтинг стимулирует нас делать все 
большее количество тестов, их разновидности и сложности. Также это 
может помочь с стимулированием других пользователей проходить тесты
быстрее для получения еще большего количества балов.
Также вы можете получить некоторые звания за места в списке лидеров.</div>
            <img src={mainInf_3} alt="" className="info__item__img" />
        </div>
    </div>
  )
}

export default MainInformation