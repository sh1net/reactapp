import React from 'react'
import { useFetching } from '../../hooks/useFething'
import { useContext } from 'react'
import Header from '../../Components/Header/Header'
import Navbar from '../../Components/Navbar/Navbar'
import { groupsContext } from '../../Context/useContext'
import './MyGroupsStyles.css'
import Loader from '../../Components/Loader/Loader'
import PostService from '../../Api/PostService'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function MyGroups() {
    const {groups, setGroups}=useContext(groupsContext)
    const [addingGroups, setAddingGroups] = useState([])
    const [fetchGroups,isLoading]=useFetching(async()=>{
        const fetchedGroups= await PostService.getGroups();
         setGroups(fetchedGroups);
       })


  const navigate=useNavigate();

     
  

useEffect(() => {
    fetchGroups();
  }, [])


console.log(addingGroups)
function leaveGroup(groupID){
setGroups([...groups.map(group=>group.id===groupID?{...group,members:group.members.filter(member=>member!==localStorage.getItem('userLogin'))}:group)])
PostService.leaveFromGroup(groupID);
}


  function addGroup(){
    setAddingGroups([{admin:localStorage.getItem('userLogin'),id:Date.now(),groupName:'',members:[''],groupImg:''},...addingGroups])
  }

  function inputGroupName(name,id){
    setAddingGroups([...addingGroups.map(group=>group.id===id?{...group,groupName:name}:group)])
  }

  function createGroup(id,group){
    
    setGroups([...groups,group])
    setAddingGroups(addingGroups.filter(group=>group.id!==id))
    PostService.setGroup(group);
  }
  function cancelGroup(id){
    setAddingGroups(addingGroups.filter(group=>group.id!==id))
}
function removeGroup(id){
    setGroups(groups.filter(group=>group.id!==id))
    PostService.removeGroup(id)
}
  return (isLoading
    ?<Loader/>
    :
    <div>
        <Header/>
        <Navbar/>
        <div className="my__groups__bg">
            <div className="groups__container">
                <div className="side__groups">
                <button className="mg__add__group__button" onClick={()=>addGroup()}>Добавить новую группу</button>
                <p className="mg__another__titles">Курирование</p>
                {addingGroups.map((group)=>
                 <div key={group.id} className='side__groups__item__admin'>
                    
                    <div>

                        <p style={{fontWeight:"bold"}}>Название:</p>
                        <input className="mg__input__name" placeholder="Введите текст" type="text" value={group.groupName} onChange={(e)=>{inputGroupName(e.target.value,group.id)}}/>
                        <button className="mg__create__cansel__buttons" onClick={()=>cancelGroup(group.id)}>Отменить</button>
                        <button className="mg__create__cansel__buttons" onClick={()=>{createGroup(group.id,group)}}>Создать</button>
                        <p>Установить картинку</p>
                    </div>
                     
                    
                 </div>
                  
                  )
                }
                {groups.map((group)=>group.admin===localStorage.getItem('userLogin')?
                 <div key={group.id} className='side__groups__item__admin'>
                     <div>
                        <div className="group__title">{group.groupName} 
                        {group.groupImg!==''
                        ?<img className='img__container' src={group.groupImg} alt="" />

                        :''

                        }
                        </div>
                        <div>{group.members.length>1
                        ?<div className='group__members__container'>
                            {group.members.map(member=> <div key={member} className='member'>{member}</div>
                                )}
                        </div>
                        : ''
                            }
                            </div>
                        <button className="mg__delete__button" onClick={()=>removeGroup(group.id)}>Удалить группу</button>
                    </div>
                    
                 </div>:
                  ''
                  )
                }
                </div>
                <hr style={{width:'1px',height:'800px',backgroundColor:'#000'}}/>
                <div className="side__groups">
                <button className="mb__found__group__button" onClick={()=>navigate('/searchGroups')}>Найти группу</button><p className="mg__another__titles">Участие</p>
                {groups.map((group)=>group.members!==undefined?
                    group.members.map((member)=>member===localStorage.getItem('userLogin')? <div key={group.id} className='side__groups__item__member'>
                    
                      <div className="group__title">{group.groupName}
                      {group.groupImg!==''
                        ?<img className='img__container' src={group.groupImg} alt="" />

                        :''

                        }
                      </div>
                      <div className="group__admin">Админ: {group.admin}</div>

                      Участники:{group.members.length>1
                        ?<div className='group__members__container'>
                            {group.members.map(member=> <div key={member} className='member'>{member}</div>
                                )}
                        </div>
                        : <div></div>
                            }
                            
                          <button className="mg__leave__button" onClick={()=>{leaveGroup(group.id)}}>Покинуть группу</button>
                      
                        
                    </div>
                    :''
                    )
                 :''
                  )
                }
                </div>
            </div>
        </div>
    </div>
  )
}

export default MyGroups