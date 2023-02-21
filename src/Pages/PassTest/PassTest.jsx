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
    if(fetchedGroups===null){
      setGroups([])
    }
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
  
  function  dateDiff(open,now=new Date()){
    
    
      return open-now;
  
    
  }

  function dateHours(hours){
    return Math.floor(Math.abs(hours)/3600000);
  }

  function dateMinutes(minutes){
    return Math.floor(Math.abs(minutes/60000)-(dateHours(minutes)*60));
  }

  return (isLoading||groups===undefined
    ?<Loader/>
    :
    <div> 
        <Header/>
        <Navbar/>
        <div className="pass__tests__bg">
          <div className="pass__test__container">
        {groups.map(group=>group.members.find(member=>member===localStorage.getItem('userLogin'))&&group.tests!==undefined&&group.tests.length!==0?
        <div key={group.id} className='group__tests'>
          <div className='group__tests__name'>Группа: {group.groupName}</div>
          <hr style={{width:'50%', backgroundColor:'#000'}}/>
          {group.tests!==undefined?group.tests.map(userTest=>
          <div key={userTest.id} className="group__tests__item">
            <div className="tests__item__title">{userTest.title}</div>
            <div className="test__item__close-open__time">
              
              <div className="test__item__date">
              
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
              <button className='pass__test__button' disabled={dateDiff(new Date(userTest.openTime))<=0
                &&dateDiff(new Date(userTest.closeTime))>=0?false:true}>Пройти</button>
              <div>
                {dateDiff(new Date(userTest.closeTime))<=0
                ? <div className='date__time'>Тест закрыт</div>
                : dateDiff(new Date(userTest.openTime))<=0
                  ?<div className='date__time'><p>До закрытия</p>
                    {dateHours(dateDiff(new Date(userTest.closeTime)))<10
                    ?  <div>0{dateHours(dateDiff(new Date(userTest.closeTime)))}</div>
                    :<div>{dateHours(dateDiff(new Date(userTest.closeTime)))}</div>
                    }
                    :  {dateMinutes(dateDiff(new Date(userTest.closeTime)))<10
                    ?  <div>0{dateMinutes(dateDiff(new Date(userTest.closeTime)))}</div>
                    :<div>{dateMinutes(dateDiff(new Date(userTest.closeTime)))}</div>
                    }
                  </div>
                  :<div className='date__time'>
                    <p>До открытия</p>
                    {dateHours(dateDiff(new Date(userTest.openTime)))<10
                    ?  <div>0{dateHours(dateDiff(new Date(userTest.openTime)))}</div>
                    :<div>{dateHours(dateDiff(new Date(userTest.openTime)))}</div>
                    }
                    :  {dateMinutes(dateDiff(new Date(userTest.openTime)))<10
                    ?  <div>0{dateMinutes(dateDiff(new Date(userTest.openTime)))}</div>
                    :<div>{dateMinutes(dateDiff(new Date(userTest.openTime)))}</div>
                    }
                    </div>
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