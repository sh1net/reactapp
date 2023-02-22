import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Header from '../../Components/Header/Header'
import './CreateTestStyles.css'
import CreaterSelect from '../../Components/CreaterSelect/CreaterSelect'
import { useState } from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { authContext, testContext } from '../../Context/useContext'
import PostService from '../../Api/PostService'
import { useFetching } from '../../hooks/useFething'
import swal from 'sweetalert'
import { useNavigate } from 'react-router-dom'
function CreateTest() {



const {users}=useContext(authContext)
const {userTests,setUserTests}=useContext(testContext)

const navigate=useNavigate();


    const [hours] = useState(()=>{
        const arr=[];
        for(let i=0;i<24;i++){
            arr.push({value:i<10?'0'+i:i,name:i<10?'0'+i:i});
        } 
        return arr;
    })
    const [minutes] = useState(()=>{
        const arr=[];
        for(let i=0;i<60;i++){
            arr.push({value:i<10?'0'+i:i,name:i<10?'0'+i:i});
        }         
        return arr;
    })

    const [testOpenTime, setTestOpenTime] = useState({
        hour:'00',minute:'00'
    })
    const [testCloseTime, setTestCloseTime] = useState({
        hour:'00',minute:'00'
    })
    const [testDurationTime, setTestDurationTime] = useState({
      minute:'00',seconds:'00'
    })

    const [questions, setQuestions] = useState([
     
    ])
 
  const [currentTest, setCurrentTest] = useState({
    id:Date.now().toString(),
    editMode:false,
    author:'',
    title:'',
    openTime:'',
    closeTime:'',
    durationTime:'',
    questions:[
    { type:'',
      qText:'',
      pic:'',
      answers:[
        {
          answerVal:'',
          isRight:true
        }
      ]
    }
    ],
  })

  useEffect(() => {
    if(userTests!==null){
      userTests.forEach((userTest)=>{
        if(userTest.editMode===true) {
          setCurrentTest({...userTest,questions:[]})
          setQuestions(userTest.questions);
          setTestOpenTime({hour:new Date(userTest.openTime).getHours()<10
            ?"0"+new Date(userTest.openTime).getHours()
            :new Date(userTest.openTime).getHours()+"",
            minute:new Date(userTest.openTime).getMinutes()<10
            ?"0"+new Date(userTest.openTime).getMinutes()
            :new Date(userTest.openTime).getMinutes()+""})

            setTestCloseTime({hour:new Date(userTest.closeTime).getHours()<10
              ?"0"+new Date(userTest.closeTime).getHours()
              :new Date(userTest.closeTime).getHours()+"",
              minute:new Date(userTest.closeTime).getMinutes()<10
              ?"0"+new Date(userTest.closeTime).getMinutes()
              :new Date(userTest.closeTime).getMinutes()+""})

              setTestDurationTime({minute:new Date(userTest.durationTime).getMinutes()<10
                ?"0"+new Date(userTest.durationTime).getMinutes()
                :new Date(userTest.durationTime).getMinutes()+"",
                seconds:new Date(userTest.durationTime).getSeconds()<10
                ?"0"+new Date(userTest.durationTime).getSeconds()
                :new Date(userTest.durationTime).getSeconds()+""})
    };})
    }
 
  }, [])
  
useEffect(() => {
  if(currentTest.author!==''&&currentTest.editMode===false){
    console.log(userTests)
    const id=(users.find((v)=>v.login==localStorage.getItem('userLogin'))).id;
    PostService.setUserTests(userTests,id);
      navigate('/myTests');
  }
}, [currentTest.editMode])


  useEffect(() => {
    
    if(currentTest.author!==''&&currentTest.editMode===false&&currentTest.title!==''){
      console.log(currentTest);
      const id=(users.find((v)=>v.login==localStorage.getItem('userLogin'))).id;
      setUserTests([...userTests,currentTest]);
      PostService.setUserTest(currentTest,userTests,id)
      swal({
        icon:"success",
        title:"Отлично!",
        text:"Тест '"+currentTest.title+ "' успешно создан и добавлен в ваши тесты!"
      }).then((val)=>{
        navigate('/myTests');
      })
    }
    if(currentTest.author!==''&&currentTest.editMode===true){
      console.log(currentTest)
      setUserTests([...userTests.map((userTest)=>userTest.id==currentTest.id?{...currentTest,editMode:false}:userTest)]);
      setCurrentTest({...currentTest,editMode:false,title:''});
      swal({
        icon:"success",
        title:"Отлично!",
        text:"Тест '"+currentTest.title+ "' успешно отредактирован!"
      })
    }
  }, [currentTest])

  const [fetchUserTests]=useFetching(async(id)=>{
    const fetchedTests= await PostService.getUserTestsById(id);
    if(fetchedTests===undefined){
      setUserTests([])
    }
    else setUserTests(fetchedTests);
    })

    useEffect(() => {
      const id=(users.find((v)=>v.login==localStorage.getItem('userLogin'))).id;
      fetchUserTests(id);
    }, [])
  function addAnswer(iQ){
    
        setQuestions([...questions.map((value,i)=>i==iQ?{...value,answers:[...value.answers,{answerVal:'',studentChose:false,isRight:false,id:Date.now().toString()}]}:value)])

  }
  function removeAnswer(qId,id){
    setQuestions([...questions.map((question,i)=>question.id==qId?{...question,answers:question.answers.filter((answer)=>answer.id!==id)}:question)])
    console.log(questions)

  }
  function choseQuestionType(iQ,type){
    setQuestions([...questions
        .map((value,i)=>i==iQ
        ?{...value,type:type,answers
        :type==='typeAnswer'?[{typedCase:'',rightCase:'',id:Date.now().toString()}]:[]}:value)])
    
  }

  function choseQuestionMark(iQ,mark){
    setQuestions([...questions.map((question,i)=>i==iQ?{...question,mark:mark}:question)])
  }

  function removeQuestion(id){
    setQuestions(questions.filter((question)=>question.id!=id));
  }
  
  function inputAnswer(iQ,iA,type,e){
    if(type=='oneIsRight'||type=='severalIsRight') setQuestions([...questions.map((question,i)=>i==iQ?{...question,answers:question.answers.map((answer,ia)=>ia==iA?{...answer,answerVal:e.target.value}:answer)}:question)])

    if(type=='typeAnswer')setQuestions([...questions.map((question,i)=>i==iQ?{...question,answers:question.answers.map((answer,ia)=>ia==iA?{...answer,rightCase:e.target.value}:answer)}:question)])

  }


  function inputQtext(iQ,e){
    setQuestions([...questions.map((question,i)=>i==iQ?{...question,qText:e.target.value}:question)])
  }


  function chooseRightCaseSeveral(iQ,iA,e){
 
   
    if(e.target.value==='true') {setQuestions([...questions.map((question,i)=>i==iQ?{...question,answers:question.answers.map((answer,ia)=>ia==iA?{...answer,isRight:false}:answer)}:question)])}
    else setQuestions([...questions.map((question,i)=>i==iQ?{...question,answers:question.answers.map((answer,ia)=>ia==iA?{...answer,isRight:true}:answer)}:question)])
  }
  function chooseRightCaseSingle(iQ,iA,e){
    if(e.target.value==='false') {setQuestions([...questions.map((question,i)=>i==iQ?{...question,answers:question.answers.map((answer,ia)=>ia==iA?{...answer,isRight:true}:{...answer,isRight:false})}:question)])}
  }
  function uploadImg(e,id){
    const file=e.target.files[0];
    PostService.uploadTestImg(file)
    setTimeout(() => {
      PostService.getTestImg(file,setQuestions,questions,id);
    }, 2000);
  }

  function confirmTest(){
    const open=new Date();
    const close=new Date();
    const duration=new Date();

    if((testCloseTime.hour<=testOpenTime.hour&&
      testCloseTime.minute<=testOpenTime.minute)||
      (testDurationTime.minute=='00'&& testDurationTime.seconds=='00')
    ){
      swal({
        icon:"error",
        title:"Ошибка",
        text:"Некорректно указаны параметры времени для теста!!!"
      })
      return;
    }
    if(!currentTest.title){
      swal({
        icon:"error",
        title:"Ошибка",
        text:"Не указано название теста!!!"
      })
      return;
    }

    if(!questions.length){
      swal({
        icon:"error",
        title:"Ошибка",
        text:"В тесте отсутствуют вопросы!!!"
      })
      return;
    }
    for (let i = 0; i < questions.length; i++) {
     if(!questions[i].qText){
      swal({
        icon:"error",
        title:"Ошибка",
        text:"В вопросе №" +(i+1)+" отсутствует условие"
      })
      return;
     }
    }
for (let i = 0; i < questions.length; i++) {
  if(questions[i].answers.length===0){
    swal({
      icon:"error",
      title:"Ошибка",
      text:"В вопросе №" +(i+1)+" отсутствуют ответы"
    })
    return;
 }
  
}

for (let i = 0; i < questions.length; i++) {
  for (let j = 0; j < questions[i].answers.length; j++) {
    if(questions[i].type==='oneIsRight'||questions[i].type==='severalIsRight'){
      if(!questions[i].answers[j].answerVal){
        swal({
          icon:"error",
          title:"Ошибка",
          text:"В вопросе №" +(i+1)+" не прописаны значения ответов"
        })
        return;
      }
    }
    if(questions[i].type==='typeAnswer'){
      if(!questions[i].answers[j].rightCase){
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
for (let i = 0; i < questions.length; i++) {
  let atLeastOneIsTrue=false;
  if(questions[i].type==='oneIsRight'||questions[i].type==='severalIsRight'){
  for (let j = 0; j < questions[i].answers.length; j++) {
   
      if(questions[i].answers.find(answer=>answer.isRight===true)){
       atLeastOneIsTrue=true;
      }
    }
    if(!atLeastOneIsTrue){
      swal({
        icon:"error",
        title:"Ошибка",
        text:"В вопросе №" +(i+1)+" не выбран ни один правильный ответ"
      })
      return;
    }
  }
  
}
if(testOpenTime.hour<open.getHours()){
  open.setDate(open.getDate()+1);
}
if(testOpenTime.hour<close.getHours()){
  close.setDate(open.getDate()+1);
}
if(testOpenTime.hour<duration.getHours()){
  duration.setDate(open.getDate()+1);
}

open.setHours(+testOpenTime.hour);
open.setMinutes(+testOpenTime.minute);
close.setHours(+testCloseTime.hour);
close.setMinutes(+testCloseTime.minute);
duration.setMinutes(+testDurationTime.minute);
duration.setSeconds(+testDurationTime.seconds);

setCurrentTest({...currentTest,openTime:open.getTime(),closeTime:close.getTime(),durationTime:duration.getTime(),questions:questions,author:localStorage.getItem('userLogin')});
}
function testImgSelect(id){
  document.getElementById(id).click();
}
  return (
    <div>
        <Header/>
        <Navbar/>
        <div className="Create__Test__bg">
         <div className="Create__Test__container">
            <div className="ct__selectors">
                <div className="ct__selectors__item">
                    <div className="ct__item__text">
                        Время открытия теста
                    </div>
                    <div className="ct__item__selector">
                        <CreaterSelect
                    hour={testOpenTime.hour}
                    minute={testOpenTime.minute}
                    onChangeMinute={(e)=>{setTestOpenTime({...testOpenTime,minute:e.target.value})}} 
                    onChangeHour={(e)=>{setTestOpenTime({...testOpenTime,hour:e.target.value})}} 
                    minutes={minutes} 
                    hours={hours}/>
                    </div>
                </div>
               {parseInt(testOpenTime.hour)< new Date().getHours()
               ||(parseInt(testOpenTime.hour)< new Date().getHours()&&parseInt(testOpenTime.minute)< new Date().getMinutes())
               ||(parseInt(testOpenTime.hour)=== new Date().getHours()&&parseInt(testOpenTime.minute)< new Date().getMinutes())
               ?swal
                : ''
               }
                <div className="ct__selectors__item">
                    <div className="ct__item__text">
                        Время закрытия теста
                    </div>
                    <div className="ct__item__selector">
                    <CreaterSelect 
                    hour={testCloseTime.hour}
                    minute={testCloseTime.minute}
                    onChangeMinute={(e)=>{setTestCloseTime({...testCloseTime,minute:e.target.value})}} 
                    onChangeHour={(e)=>{setTestCloseTime({...testCloseTime,hour:e.target.value})}} 
                    minutes={minutes} 
                    hours={hours}
                    />
                    </div>
                </div>
                <div className="ct__selectors__item">
                    <div className="ct__item__text">
                        Время на прохождение
                    </div>
                    <div className="ct__item__selector">
                    <CreaterSelect 
                    hour={testDurationTime.minute}
                    minute={testDurationTime.seconds}
                    onChangeMinute={(e)=>{setTestDurationTime({...testDurationTime,seconds:e.target.value})}} 
                    onChangeHour={(e)=>{setTestDurationTime({...testDurationTime,minute:e.target.value})}} 
                    minutes={minutes} 
                    hours={minutes}/>
                    </div>
                    
                </div>
                <button onClick={()=>{confirmTest()}} className="ct__button__createtest">{currentTest.editMode?"Отредактировать":"Создать тест"}</button>
            </div>
            
            <hr style={{width:'1px',height:'800px',backgroundColor:'#000'}}/>

            <div className="ct__right">
            <div className="ct__creater">
                <div className="ct__creater__container">
                    <div className="ct__test__name_1">Название теста</div>
                <input className="ct__test__name" type="text" value={currentTest.title} onChange={(e)=>setCurrentTest({...currentTest,title:e.target.value})} />
                {questions.length!==0
                ?<p className="ct__test__points"> Баллы за весь тест {questions.reduce((sum,question)=>sum+=Number(question.mark),0)}</p>
                :""
              }
                <div className="ct_quastions_container">
                    {questions.map((question,iQ,qArr)=>
                    <div className='ct_question' key={question.id}>
                      {iQ+1}.
                        <select className="ct__select__items" value={question.type}  onChange={(e)=>{choseQuestionType(iQ,e.target.value)}}>
                        <option disabled={true} value={""}>Выберите тип вопроса</option>
                            <option value={"oneIsRight"}>Один вариант ответа</option>
                            <option  value={"severalIsRight"}>Множество вариантов ответа</option>
                            <option value={"typeAnswer"}>Написать ответ</option>
                        </select>
                        <select className="ct__select__items" value={question.mark} onChange={(e)=>choseQuestionMark(iQ,e.target.value)} >
                          <option value={""}  disabled={true}>Выберите балл </option>
                           <option value={1}>1 балл</option>
                            <option value={2}>2 балла</option>
                            <option value={3}>3 балла</option>
                        </select>
                        {!question.pic
                        ?<p style={{marginTop:"10px"}}>Вы можете установить картинку к тесту</p>
                        :""
                        }
                        <input id={question.id} className="file__upload__input" type="file" name="f" accept='image/png, image/jpeg' onChange={(e)=>{uploadImg(e,question.id)}}/>
                        <img src={question.pic} alt="" className='ct__quastion__pic'/>
                        <button className="file__upload__buton" onClick={()=>testImgSelect(question.id)}>Выбрать картинку</button>
                        <p className="ct__text__input__question">Введите текст вопроса</p>
                        <textarea name="postContent" className="ct__input__question" type="text" value={question.qText} onChange={(e)=>{inputQtext(iQ,e)}}/>
                       
                        {!question.type?< div>Пока тип вопроса не выбран ответы добавить нельзя</div>
                       
                        
                        :<div>{
                            question.answers.map((answer,iA,aArr)=>
                            <div className="ct__answer" key={answer.id}>
                            {
                              question.type=="oneIsRight"
                              ?<div>
                                <input checked={answer.isRight?true:false} className="ct__radio__btn" type="radio" name={'oneIsRight'+iQ} value={answer.isRight} onChange={(e)=>{chooseRightCaseSingle(iQ,iA,e)}}/>
                                <input className="ct__input__answer" type="text" placeholder='Введите ответ'value={answer.answerVal} onChange={(e)=>{inputAnswer(iQ,iA,question.type,e)}}/>
                                <button className="ct__delete__btn" onClick={()=>removeAnswer(question.id,answer.id)}>удалить </button>

                              </div>
                            :question.type=="severalIsRight"
                            ?<div>
                                <input className="ct__check__btn" type="checkbox" value={answer.isRight} checked={answer.isRight?true:false}  name={'severalIsRight'+iQ} onChange={(e)=>{chooseRightCaseSeveral(iQ,iA,e)}}/>
                                <input className="ct__input__answer" type="text" placeholder='Введите ответ' value={answer.answerVal} onChange={(e)=>{inputAnswer(iQ,iA,question.type,e)}}/>
                                <button className="ct__delete__btn" onClick={()=>removeAnswer(question.id,answer.id)}>удалить </button>
                            </div>
                            :
                            question.type=="typeAnswer"?
                            <div>
                                <input className="ct__input__answer2" type="text" placeholder='Напишите сюда правильный ответ' value={answer.rightCase} onChange={(e)=>{inputAnswer(iQ,iA,question.type,e)}}/>
                            </div>
                            : <div></div>
                            
                            }
                          
                            
                            
                            </div>)
                            }
                            {
                                question.type==='severalIsRight'||question.type==='oneIsRight'?
                                <button className="ct__add__qustion__button" onClick={()=>addAnswer(iQ,question.type)}>
                                Добавить ответ
                            </button>
                            : <div></div>
                            }
                            
                            </div>
                           
                               
                            
                           
                        
                        }
                        <button className="ct__remove__qustion__button" onClick={()=>removeQuestion(question.id)}>Удалить вопрос</button>
                        </div>
                        )   
                    }
                </div>
                </div>
            </div>
            <button className="ct__add__test__question" onClick={()=>setQuestions([...questions,{ type:'',
            pic:'',
    qText:'',
    mark:1,
    id: Date.now().toString(),
    answers:[
    
   
    ]
  }])}>Добавить вопрос</button>
            </div>
         </div>
         
        </div>
    </div>
  )
}

export default CreateTest

