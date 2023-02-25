import React from 'react'
import cl from './GroupsStatsModalStyles.module.css'
import { useNavigate } from 'react-router-dom'
function GroupsStatsModal({results,visible,setStats}) {
const navigate=useNavigate();
  return (
    results!==null&&results!==''
    ?
    <div className={visible===true? [cl.groupsStatsModal,cl.active].join(' '):cl.groupsStatsModal} onClick={()=>setStats({isVisible:false,testResult:''})}>
        <div className={cl.groupsStatsModalContent} onClick={(e)=>e.stopPropagation()}>
          <div className={cl.groupsStatsModalContentContainer}>
          
          {results.map(result=>result.testResults.length!==0? <div key={result.group} >
          <div className={cl.groupName}>Группа: {result.group} </div>
            {result.testResults.map((testResult,i)=> <div className={cl.groupStats}  key={Date.now().toString()}>
                {testResult.usersResults.map(userResult=> <div className={cl.userStat} key={userResult.nickname}>
                    <div className={cl.userName}>Имя: {userResult.nickname}</div>
                    <div className={cl.userMark}>баллы: {userResult.userMark} из {userResult.passedTest.questions.reduce((sum,question)=>sum+=Number(question.mark),0)}</div>
                    <button onClick={()=>navigate('/result/'+userResult.nickname+'/'+result.group+'/'+testResult.testID)}>Подробнее</button>
                </div>
                    )}
            </div>)

            }
            <hr />
          </div>:'')

          }
          </div>
            
        </div>
    </div>
  :''
  )
}

export default GroupsStatsModal