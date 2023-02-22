import React, { useMemo } from 'react'
import Header from '../../Components/Header/Header'
import Navbar from '../../Components/Navbar/Navbar'
import { groupsContext } from '../../Context/useContext'
import { testContext } from '../../Context/useContext'
import { useContext } from 'react'
import { useFetching } from '../../hooks/useFething'
import PostService from '../../Api/PostService'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Loader from '../../Components/Loader/Loader'
import { useState } from 'react'
import './TestPassing.css'
import { useParams } from 'react-router-dom'


function TestPassing(){
    const {groups,setGroups}=useContext(groupsContext)
  
    const [fetchGroups,isLoading]=useFetching(async()=>{
      const fetchedGroups= await PostService.getGroups();
      if(fetchedGroups===null){
        setGroups([])
      }
       setGroups(fetchedGroups);
     })
  
    const [passingTest, setPassingTest] = useState(null)

  const [timerTime, setTimerTime] = useState(null)

 function getTime(){
 
  if(timerTime!==null){
    if(timerTime.minutes-1<0){
      setTimerTime({minutes:timerTime.minutes-1,seconds:59})
      localStorage.setItem('durationLast',JSON.stringify({minutes:timerTime.minutes-1,seconds:59}))
    }
    else{
      setTimerTime({...timerTime,seconds:timerTime.seconds-1})
      localStorage.setItem('durationLast',JSON.stringify({...timerTime,seconds:timerTime.seconds-1}))
    }
  }
 }
  
  useEffect(() => {
  
  fetchGroups();
  }, [])

  useEffect(() => {
    if(groups!==undefined&&groups!==null){
        let test=groups.find(group=>group.groupName===params.groupName).tests.find(test=>test.id===params.testID)
      setPassingTest(test)
      if(localStorage.getItem('durationLast')){
        setTimerTime(JSON.parse(localStorage.getItem('durationLast')))
      }
      else
      setTimerTime({
        hours:new Date(test.durationTime).getMinutes(),
        minutes:new Date(test.durationTime).getSeconds()
    })
    }
    }, [groups])

    useEffect(() => {
      const interval=setInterval(()=>getTime(),1000)
    
      return () => {
        clearInterval(interval);
      }
    }, [timerTime])
    
   
const params=useParams();

function inputAnswer(iQ,iA,e){

    setPassingTest({...passingTest, questions:passingTest.questions.map((question,i)=>i==iQ?{...question,answers:question.answers.map((answer,ia)=>ia==iA?{...answer,typedCase:e.target.value}:answer)}:question)})

}

function chooseRightCaseSeveral(iQ,iA,e){

    if(e.target.value==='true') {setPassingTest({...passingTest, questions:passingTest.questions.map((question,i)=>i==iQ?{...question,answers:question.answers.map((answer,ia)=>ia==iA?{...answer,studentChose:false}:answer)}:question)})}
    else setPassingTest({...passingTest, questions:passingTest.questions.map((question,i)=>i==iQ?{...question,answers:question.answers.map((answer,ia)=>ia==iA?{...answer,studentChose:true}:answer)}:question)})
  }

  function chooseRightCaseSingle(iQ,iA,e){
    if(e.target.value==='false') {setPassingTest({...passingTest, questions:passingTest.questions.map((question,i)=>i==iQ?{...question,answers:question.answers.map((answer,ia)=>ia==iA?{...answer,isRight:true}:{...answer,isRight:false})}:question)})}
  }
    return(isLoading||passingTest===null
        ?<Loader/>
        :
        <div className='bodyy'>
            <div className="timer">{timerTime.hours<10?'0'+timerTime.hours:timerTime.hours}:{timerTime.minutes<10?'0'+timerTime.minutes:timerTime.minutes}</div>
              <div className="test__passing__container">
                <div className="passing__test__title">{passingTest.title}</div>
                {passingTest.questions.map((question,iQ)=> <div key={question.id} className="test__passing__question">
             
                <div className="test__passing__question__name">{iQ+1}. {question.qText}<div className="test__passing__mark">{question.mark} {question.mark==1?"бал":"бала"}</div></div>
                  {!question.pic
                  ?''
                  :<img className='passing__question__img' src={question.pic} alt=""/>
                  }
                  {
                            question.answers.map((answer,iA)=>
                            <div className="ct__answer" key={answer.id}>
                            {
                              question.type=="oneIsRight"
                              ?<div className="test__passing__input__answer">
                                <input checked={answer.studentChose?true:false} className="ct__radio__btn" type="radio" name={'oneIsRight'+iQ} value={answer.studentChose?true:false} onChange={(e)=>{chooseRightCaseSingle(iQ,iA,e)}}/>
                                <div className='passing__answer'>{answer.answerVal}</div>
                              </div>
                            :question.type=="severalIsRight"
                            ?<div className="test__passing__input__answer">
                                <input className="ct__check__btn" type="checkbox" value={answer.studentChose} checked={answer.studentChose?true:false}  name={'severalIsRight'+iQ} onChange={(e)=>{chooseRightCaseSeveral(iQ,iA,e)}}/>
                                <div className='passing__answer'>{answer.answerVal}</div>

                            </div>
                            :
                            question.type=="typeAnswer"?
                            <div className="test__passing__input__answer">
                                <textarea className="ct__input__answer2" type="text" placeholder='Напишите сюда правильный ответ' value={answer.typedCase} onChange={(e)=>{inputAnswer(iQ,iA,e)}}/>
                            </div>
                            : <div></div>
                            
                            }
                          
                            
                            
                            </div>)
                            }
                
                </div>
                )

                }
                <button className="test__passing__ending__button">Завершить тест</button>
              </div>
        </div>
    )
}
export default TestPassing