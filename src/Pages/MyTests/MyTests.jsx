import React from 'react'
import Header from '../../Components/Header/Header'
import Navbar from '../../Components/Navbar/Navbar'
import './MyTestsStyles.css'
import { useContext } from 'react'
import { groupsContext, testContext } from '../../Context/useContext'
import { useFetching } from '../../hooks/useFething'
import { useEffect } from 'react'
import PostService from '../../Api/PostService'
import { authContext } from '../../Context/useContext'
import Loader from '../../Components/Loader/Loader'
import swal from 'sweetalert'
import { useNavigate } from 'react-router-dom'
import GroupsModal from '../../Components/GroupsModal/GroupsModal'
import { useState } from 'react'
import GroupsStatsModal from '../../Components/AboutUs/GroupsStatsModal/GroupsStatsModal'

function MyTests() {
const {userTests,setUserTests}=useContext(testContext)

const {users}=useContext(authContext);
const {groups,setGroups}=useContext(groupsContext)
const navigate=useNavigate();

const [visible, setVisible] = useState({
  isVisible:false,
  userTest:''
})

const [stats, setStats] = useState({
  isVisible:false,
  testResult:''
})

const {results,setResults}=useContext(testContext);
const [fetchResults]=useFetching(async()=>{
  const fetchedResults= await PostService.getResults();
  if(fetchedResults===null){
  setResults([])
  }
  else{
    if(groups!==undefined&&groups!==null){
 const myGroups=(groups.filter(group=>group.admin===localStorage.getItem('userLogin')));
    if(myGroups!==null&&myGroups!==undefined){
      function compareResultsAndMyGroups(group,myGroups){
        for (let i = 0; i < myGroups.length; i++) {
          if(myGroups[i].groupName===group){
            console.log(myGroups[i].groupName+' | '+group)
            return true
          }
          
        }
        return false;
      }
      const neededResults=fetchedResults.filter((result)=>compareResultsAndMyGroups(result.group,myGroups));
      setResults(neededResults)
    }
    }
   
  
  }
  
 
 })
 useEffect(() => {
   fetchResults();
 }, [])

const [fetchUserTests,isLoading]=useFetching(async(id)=>{
const fetchedTests= await PostService.getUserTestsById(id)
if(fetchedTests===undefined){
  setUserTests([])
}
else
setUserTests(fetchedTests);
})

useEffect(() => {
  const id=(users.find((v)=>v.login==localStorage.getItem('userLogin'))).id;
  fetchUserTests(id);
}, [])

function removeTest(id,title){
  swal({
    icon:"warning",
    title:"Вы уверены?",
    text:"Тест '"+title+ "' будет безвозвратно удален!",
    dangerMode: true,
    buttons: ["Отмена", "Уверен"]
  }).then((result)=>{
   if(result===null){
    return;
   }
   else {
  const userId=(users.find((v)=>v.login==localStorage.getItem('userLogin'))).id;
  setUserTests(userTests.filter((userTest)=>userTest.id!=id))
  setGroups(groups.map(group=>group.tests!==undefined?{...group,tests:group.tests.filter(userTest=>userTest.id!==id)}:group))
  PostService.deleteTestFromGroup(id)
  PostService.setUserTests(userTests.filter((userTest)=>userTest.id!==id),userId)
   }
  })
}

function editUserTest(id){
  setUserTests([...userTests.map(userTest=>userTest.id===id?{...userTest,editMode:true,author:''}:userTest)])
  navigate('/testCreater');
}



function addTestGroup(groupId,userTestId,e,groupName){
  if(e.target.checked){
    setGroups([...groups.map(group=>group.id===groupId?{...group,tests:group.tests?[...group.tests,{...userTests.find(userTest=>userTest.id===userTestId)}]:[{...userTests.find(userTest=>userTest.id===userTestId)}]}:group)])
    PostService.addTestToGroup(groupId,userTestId,userTests);
    PostService.setResultTestId(groupName,userTestId);
  }

  else{
        setGroups([...groups.map(group=>group.id===groupId?{...group,tests:[...group.tests.filter(userTest=>userTest.id!==userTestId)]}:group)])
        PostService.deleteTestFromGroup(groupId,userTestId);
        PostService.removeResultTestId(groupName,userTestId);

  }
}


function checkGroup(groupId,userTestId){
  if(groups!==undefined&&groups!==null){
    if(groups.find(group=>group.id===groupId?group.tests?.find(userTest=>userTest?.id===userTestId):false)){

      return true;
    }
    else return false
  }
}
function visibleStatButton(userTestId){
  
  const thisTestResults=checkGroupsStats(userTestId);
console.log(thisTestResults)
  for (let i = 0; i < thisTestResults.length; i++) {
  
    for (let j = 0; j < thisTestResults[i].testResults.length; j++) {
     
     if(thisTestResults[i].testResults[j].testID===userTestId&&thisTestResults[i].testResults[j].usersResults!==''){
   
      return true
     }
      
    }
    
  }
return false;
}
function checkGroupsStats(userTestId){
  
const thisTestResults=results.map(result=>result?{...result,testResults:result.testResults!==undefined?result.testResults.filter(testResult=>testResult.testID===userTestId&&testResult.usersResults!==undefined):''}:result)
console.log(thisTestResults)
return thisTestResults;

}
  return (isLoading
    ?<Loader/>
    :
    <div>
        <Header/>
        <Navbar/>
       
        <div className="my__tests__bg">
          <div className="my__tests__container">
            {userTests.length===0
            ?<h1 style={{textAlign:'center',fontFamily:'sans-serif'}}>У вас нет тестов ☠ </h1>
            :userTests.map((userTest,i)=><div key={userTest.openTime} className='my__tests__item'>
              <div className="test__item__header">
              <div className="test__item__title">{userTest.title}</div>
              <div className="test__item__open-close__time">
              
              <div className="test__item__date">
              <p>Откроется:</p>
                {new Date(userTest.openTime).getDate()<10
                ?  <div>0{new Date(userTest.openTime).getDate()}</div>
                :<div>{new Date(userTest.openTime).getDate()}</div>
                }
                .
                {new Date(userTest.openTime).getMonth()<10
                ?  <div>0{(new Date(userTest.openTime).getMonth())+1}</div>
                :<div>{new Date(userTest.openTime).getMonth()}</div>
                }
                .
                {new Date(userTest.openTime).getFullYear()}
              </div>
              <div className='date__time'>
                {new Date(userTest.openTime).getHours()<10
              ?  <div>0{new Date(userTest.openTime).getHours()}</div>
              :<div>{new Date(userTest.openTime).getHours()}</div>
              }
              :  {new Date(userTest.openTime).getMinutes()<10
              ?  <div>0{new Date(userTest.openTime).getMinutes()}</div>
              :<div>{new Date(userTest.openTime).getMinutes()}</div>
              }
              -
              {new Date(userTest.closeTime).getHours()<10
              ?  <div>0{new Date(userTest.closeTime).getHours()}</div>
              :<div>{new Date(userTest.closeTime).getHours()}</div>
              }
              :  {new Date(userTest.closeTime).getMinutes()<10
              ?  <div>0{new Date(userTest.closeTime).getMinutes()}</div>
              :<div>{new Date(userTest.closeTime).getMinutes()}</div>
              }
              </div>
              </div> 
              
            </div>
           
           <div className="test__item__buttons">
            <div className="test__item__buttons__left">
            <button className="my__test__button" onClick={()=>{editUserTest(userTest.id)}}>Редактировать</button>
            <button className="my__test__button" onClick={()=>{removeTest(userTest.id,userTest.title)}}>Удалить</button>
            <GroupsStatsModal results={stats.testResult} visible={stats.isVisible} setStats={setStats}/>
           <button disabled={!visibleStatButton(userTest.id)} className="my__test__button" onClick={()=>{setStats({isVisible:true,testResult:checkGroupsStats(userTest.id)})}}>Статистика</button>
          </div>
            <div className="test__item__selector">
            
            <GroupsModal isLoading={isLoading} visible={visible.isVisible} setVisible={setVisible} groups={groups} checkGroup={checkGroup} addTestGroup={addTestGroup} userTest={visible.userTest} />
              <button disabled={visibleStatButton(userTest.id)} className="mt__button__groups" onClick={()=>setVisible({isVisible:true,userTest:userTest})}>Выбор групп для тестирования</button>
            </div>
            </div>
            </div>
            )
            }
          </div>
        </div>
    </div>
  )
}

export default MyTests