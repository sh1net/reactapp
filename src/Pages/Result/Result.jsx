import React from 'react'
import { useFetching } from '../../hooks/useFething'
import PostService from '../../Api/PostService'
import { useEffect } from 'react'
import {  useNavigate } from 'react-router-dom'
import Loader from '../../Components/Loader/Loader'
import { useState } from 'react'
import '../yourResult/YourResultStyles.css'
import './ResultStyles.css'
import { useParams } from 'react-router-dom'

function Result() {
    const params = useParams();
    const [result, setResult] = useState(null)
    const navigate = useNavigate();
    const [fetchResults,isLoading]=useFetching(async()=>{
      const fetchedResults= await PostService.getResults();
      
      const neededGroup=fetchedResults.find(result=>result.group===params.groupName)
      if(neededGroup===undefined){
        navigate('/main')
      }
      const neededTest=neededGroup.testResults.find(testResult=>testResult.testID===params.testID);
      if(neededTest===undefined){
        navigate('/main')
      }
      const neededUser=neededTest.usersResults.find(userResult=>userResult.nickname===params.userName);
      if(neededUser===undefined){
        navigate('/main')
      }
      else
       setResult(neededUser);
     })
     useEffect(() => {
       fetchResults();
     }, [])


     function checkSingleAnswer(question){
        for (let i = 0; i < question.answers.length; i++) {
            if(question.answers[i].studentChose&&question.answers[i].isRight){
              return true;
            }
       }
       return false;
      }
    
       function checkSeveralAnswer(question){
        let allRightCases= question.answers.filter(answer=>answer.isRight).length;
        let studentChosesRight=0;
        for (let i = 0; i < question.answers.length; i++) {
          if(question.answers[i].studentChose&&question.answers[i].isRight){
            studentChosesRight++;
          }
        }
        if(studentChosesRight===allRightCases){
          return true;
        }
        else return false;
       }
    
       function checkTypedAnswer(question){
        for (let i = 0; i < question.answers.length; i++) {
          if(question.answers[i].typedCase.toLowerCase()===question.answers[i].rightCase.toLowerCase()){
            return true
          }
     }
     return false;
    }
    console.log(result);
    return (
        isLoading
            ?<Loader/>
            :
            <div className='bodyy'>
                  <div className="test__passing__container">
    
                    <div className="passing__test__title">{result.passedTest.title}   </div>
                    <div className='passed__test__user__data'>
                    <div className="passed__test__user">  Проходил: {result.nickname} </div>
                    <div className="passed__test__mark">Набранные баллы: {result.userMark}/{result.passedTest.questions.reduce((sum,question)=>sum+=Number(question.mark),0)}</div>
                    </div>
                  
    
                    {result.passedTest.questions.map((question,iQ)=> <div key={question.id} className ={
                    question.type==='oneIsRight'
                    ?checkSingleAnswer(question)?'correct_question':'incorrect_question'
                    :question.type==='severalIsRight'
                    ?checkSeveralAnswer(question)?'correct_question':'incorrect_question'
                    :question.type==='typeAnswer'
                    ?checkTypedAnswer(question)?'correct_question':'incorrect_question'
                    :''}>
                 
                    <div className="test__passing__question__name">{iQ+1}. {question.qText}<div className="test__passing__mark">{question.mark} {question.mark==1?"бал":"бала"}</div></div>
                      {!question.pic
                      ?''
                      :<img className='passing__question__img' src={question.pic} alt=""/>
                      }
                     <div> {result.nickname} ответил</div>
                      {
                                question.answers.map((answer,iA)=>
                                <div className="ct__answer" key={answer.id}>
                                {
                                  question.type=="oneIsRight"
                                  
                                  ?<div className="test__passing__input__answer">
                                <input  disabled checked={answer.isRight} className="ct__radio__btn" type="radio" name={'oneIsRight'+iQ} value={answer.studentChose} />
                                    <div className='passing__answer'>{answer.answerVal}</div>
                                  </div>
                                :question.type=="severalIsRight"
                                ?<div className="test__passing__input__answer">
                                    <input disabled className="ct__check__btn" type="checkbox" value={answer.studentChose} checked={answer.studentChose?true:false}  name={'severalIsRight'+iQ} />
                                    <div className='passing__answer'>{answer.answerVal}</div>
    
                                </div>
                                :
                                question.type=="typeAnswer"?
                                <div className="test__passing__input__answer">
                                    <textarea disabled className="ct__input__answer2" type="text" placeholder='Напишите сюда правильный ответ' value={answer.typedCase} />
                                </div>
                                : <div></div>
                                
                                }
                              
                                
                                
                                </div>)
                                }
                                { question.type==="oneIsRight"&&!checkSingleAnswer(question)
                                ?<div>Правильный ответ: </div>
                                :question.type==="severalIsRight"&&!checkSeveralAnswer(question)
                                ?  <div>Правильные ответы: </div>
                                :''
                                }
                                {
                                question.answers.map((answer,iA)=>
                                <div className="ct__answer" key={answer.id}>
                                {
                                  question.type=="oneIsRight"&&!checkSingleAnswer(question)
                                  
                                  ?answer.isRight
                                  ?
                                  <div className="test__passing__input__answer">
                                   
                                    <input disabled checked={answer.isRight?true:false} className="ct__radio__btn" type="radio" name={'oneIsRight'+iQ} value={answer.isRight?true:false} />
                                    <div className='passing__answer'>{answer.answerVal}</div>
                                  </div>
                                  :''
                                :question.type=="severalIsRight"&&!checkSeveralAnswer(question)
                                
                                ?
                                answer.isRight
                                  ?<div className="test__passing__input__answer">
                                    <input disabled className="ct__check__btn" type="checkbox" value={answer.isRight} checked={answer.isRight?true:false}  name={'severalIsRight'+iQ} />
                                    <div className='passing__answer'>{answer.answerVal}</div>
    
                                </div>
                                :''
                                :
                                question.type=="typeAnswer"&&!checkTypedAnswer(question)?
                                <div >Правильный ответ:
                                    <div> {answer.rightCase} </div>
                                </div>
                                : <div></div>
                                
                                }
                              
                                
                                
                                </div>)
                                }
                    
                    </div>
                    )
    
                    }
                                      <button className="test__passing__ending__button" onClick={()=>{navigate('/myTests')}}>Вернуться к тестам</button>

                  </div>
            </div>
      )
}

export default Result