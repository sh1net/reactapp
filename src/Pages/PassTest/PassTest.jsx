import React from 'react'
import './PassTestStyles.css'
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


function PassTest() {
  const {groups,setGroups}=useContext(groupsContext)

  const [fetchGroups,isLoading]=useFetching(async()=>{
    const fetchedGroups= await PostService.getGroups();
     setGroups(fetchedGroups);
   })

   const [groupTests, setgroupTests] = useState([])

useEffect(() => {
fetchGroups();
}, [])

  useEffect(() => {
    if(groups!==undefined&&groups!==null){
      PostService.setGroups(groups)
    }
  }, [groups])

useEffect(() => {
  if(groups!==undefined&&groups!==null){
    setgroupTests([...groups.map(group=>group.members.find(member=>member===localStorage.getItem('userLogin'))?group.tests:'')])
  }

  
}, [groups])

  const navigate=useNavigate();
  
  function dateDiff(open,now=new Date()){
    console.log(new Date(open.getTime()-now.getTime()).getTime())
    return new Date((open-now)/(60 * 60 * 24 * 1000));
  }

  return (isLoading
    ?<Loader/>
    :
    <div> 
        <Header/>
        <Navbar/>
        <div className="pass__tests__bg">
          <div className="pass__test__container">
        {groups.map(group=>group.members.find(member=>member===localStorage.getItem('userLogin'))?
        <div key={group.id} className='group__tests'>
          <div className='group__tests__name'>{group.groupName}</div>
          {group.tests!==undefined?group.tests.map(userTest=>
          <div key={userTest.id} className="group__tests__item">
            <div className="tests__item__title">{userTest.title}</div>
            <div className="test__item__open-close__time">
              
              <div className="test__item__date">
              <p>Откроется</p>
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
              <p>До открытия</p>
                {dateDiff(new Date(userTest.openTime)).getHours()<10
              ?  <div>0{dateDiff(new Date(userTest.openTime)).getHours()}</div>
              :<div>{dateDiff(new Date(userTest.openTime)).getHours()}</div>
              }
              :  {dateDiff(new Date(userTest.openTime)).getMinutes()<10
              ?  <div>0{dateDiff(new Date(userTest.openTime)).getMinutes()}</div>
              :<div>{dateDiff(new Date(userTest.openTime)).getMinutes()}</div>
              }
            
              </div>
              
              </div> 
            </div>
          ): ''

          }
        </div>
        :''
        )

        }
          </div>
          
        </div>
    </div>
  )
}

export default PassTest