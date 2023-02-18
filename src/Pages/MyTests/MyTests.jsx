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

function MyTests() {
const {userTests,setUserTests}=useContext(testContext)
const {users}=useContext(authContext);
const {groups,setGroups}=useContext(groupsContext)
const navigate=useNavigate();

const [visible, setVisible] = useState({
  isVisible:false,
  userTest:''
})


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
  PostService.setUserTests(userTests.filter((userTest)=>userTest.id!==id),userId)
   }
  })
}

function editUserTest(id){
  setUserTests([...userTests.map(userTest=>userTest.id=id?{...userTest,editMode:true,author:''}:userTest)])
  navigate('/testCreater');
}

useEffect(() => {
  if(groups!==undefined&&groups!==null){
    PostService.setGroups(groups)
  }
}, [groups])

function addTestGroup(groupId,userTestId,e){
  if(e.target.checked){
    setGroups([...groups.map(group=>group.id===groupId?{...group,tests:group.tests?[...group.tests,{...userTests.find(userTest=>userTest.id===userTestId)}]:[{...userTests.find(userTest=>userTest.id===userTestId)}]}:group)])
  }
  else{
        setGroups([...groups.map(group=>group.id===groupId?{...group,tests:[...group.tests.filter(userTest=>userTest.id!==userTestId)]}:group)])

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
            </div>
            <div className="test__item__selector">
           
            <GroupsModal visible={visible.isVisible} setVisible={setVisible} groups={groups} checkGroup={checkGroup} addTestGroup={addTestGroup} userTest={visible.userTest} />
              <button className="mt__button__groups" onClick={()=>setVisible({isVisible:true,userTest:userTest})}>Выбор групп для тестирования</button>
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