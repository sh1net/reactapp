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
import swal from 'sweetalert'

function TestPassing(){
    const {groups,setGroups}=useContext(groupsContext)
    const {isPassing,setIsPassing}=useContext(testContext)
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
    if(timerTime.seconds-1<0){
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
  localStorage.setItem('passing','true')
  localStorage.setItem('groupName',params.groupName)
  localStorage.setItem('testID',params.testID);
  setIsPassing(true)
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
        minutes:new Date(test.durationTime).getMinutes(),
        seconds:new Date(test.durationTime).getSeconds()
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
    if(e.target.value==='false') {setPassingTest({...passingTest, questions:passingTest.questions.map((question,i)=>i==iQ?{...question,answers:question.answers.map((answer,ia)=>ia==iA?{...answer,studentChose:true}:{...answer,studentChose:false})}:question)})}
  }

  function confirmTest(){
    const questions=passingTest.questions;
    for (let i = 0; i < questions.length; i++) {
      let atLeastOneIsTrue=false;
      for (let j = 0; j < questions[i].answers.length; j++) {
      if(questions[i].type==='oneIsRight'||questions[i].type==='severalIsRight'){
      
       
          if(questions[i].answers.find(answer=>answer.studentChose===true)){
           atLeastOneIsTrue=true;
          }
          if(!atLeastOneIsTrue){
            swal({
              icon:"error",
              title:"Ошибка",
              text:"В вопросе №" +(i+1)+" не выбран ни один ответ"
            })
            return;
          }
        }
      
        if(questions[i].type==='typeAnswer'){
          if(!questions[i].answers[j].typedCase){
            swal({
              icon:"error",
              title:"Ошибка",
              text:"В вопросе №" +(i+1)+" в поле ответа нет значения"
            })
            return;
          }
        }
      }
    }
    swal({
      icon:"warning",
      title:"Завешить тест?",
      buttons: ["Нет", "Да"]
    }).then((result)=>{
     if(result===null){
      return;
     }
     else{
      const maxMark=questions.reduce((sum,question)=>sum+=Number(question.mark),0)
      let userMark=0;
     for (let i = 0; i < questions.length; i++) {
      for (let j = 0; j < questions[i].answers.length; j++) {
        if(questions[i].type==='oneIsRight'){
        if(questions[i].answers[j].studentChose&&questions[i].answers[j].isRight){
          userMark+=(+questions[i].mark);
        }
      }
      if(questions[i].type==='typeAnswer'){
        if(questions[i].answers[j].typedCase.toLowerCase()===questions[i].answers[j].rightCase.toLowerCase()){
          userMark+=(+questions[i].mark);
        }
      }
     }
    }
    for (let i = 0; i < questions.length; i++) {
      
        if(questions[i].type==='severalIsRight'){
          let allRightCases= questions[i].answers.filter(answer=>answer.isRight).length;
          let studentChosesRight=0;
          for (let j = 0; j < questions[i].answers.length; j++) {
        if(questions[i].answers[j].studentChose&&questions[i].answers[j].isRight){
          studentChosesRight++;
        }
      }
      if(allRightCases===studentChosesRight){
        userMark+=(+questions[i].mark);
      }
     }
    }
 
     localStorage.removeItem('passing');
     localStorage.removeItem('groupName');
     localStorage.removeItem('testID');
     setIsPassing(false);
     }
   
    }
  )
      

}
    return(isLoading||passingTest===null
        ?<Loader/>
        :
        <div className='bodyy'>
            <div className="timer">{timerTime.minutes<10?'0'+timerTime.minutes:timerTime.minutes}:{timerTime.seconds<10?'0'+timerTime.seconds:timerTime.seconds}</div>
            <div className="test__passing__bg">
            <div className="passing__test__title">{passingTest.title}</div>
                <div className="test__passing__container">
                {passingTest.questions.map((question,iQ)=> <div key={question.id} className="test__passing__question">
             
                <div>{question.qText}</div>
                <div>Баллы за вопрос:{question.mark}</div>
                {!question.pic
                ?''
                :<img className='passing__question__img' src={question.pic} alt=""/>
                }
                {
                            question.answers.map((answer,iA)=>
                            <div className="ct__answer" key={answer.id}>
                            {
                              question.type=="oneIsRight"
                              ?<div>
                                <input checked={answer.studentChose?true:false} className="ct__radio__btn" type="radio" name={'oneIsRight'+iQ} value={answer.studentChose?true:false} onChange={(e)=>{chooseRightCaseSingle(iQ,iA,e)}}/>
                                <div className='passing__answer'>{answer.answerVal}</div>
                              </div>
                            :question.type=="severalIsRight"
                            ?<div>
                                <input className="ct__check__btn" type="checkbox" value={answer.studentChose} checked={answer.studentChose?true:false}  name={'severalIsRight'+iQ} onChange={(e)=>{chooseRightCaseSeveral(iQ,iA,e)}}/>
                                <div className='passing__answer'>{answer.answerVal}</div>

                            </div>
                            :
                            question.type=="typeAnswer"?
                            <div>
                                <input className="ct__input__answer2" type="text" placeholder='Напишите сюда правильный ответ' value={answer.typedCase} onChange={(e)=>{inputAnswer(iQ,iA,e)}}/>
                            </div>
                            : <div></div>
                            
                            }
                          
                            
                            
                            </div>)
                            }
                </div>
                )

                }
                
                </div>
            </div>
            <button onClick={()=>confirmTest()}>Закончить тест</button>

        </div>
    )
}
export default TestPassing