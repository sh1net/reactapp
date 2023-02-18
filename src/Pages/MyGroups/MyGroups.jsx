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

function MyGroups() {
    const {groups, setGroups}=useContext(groupsContext)

    const [fetchGroups,isLoading]=useFetching(async()=>{
        const fetchedGroups= await PostService.getGroups();
         setGroups(fetchedGroups);
       })


const navigate=useNavigate();

       
useEffect(() => {
    fetchGroups();
  }, [])

useEffect(() => {
    if(groups){
        if(!groups.find(group=>group.createMode)){
            PostService.setGroups(groups);
        }
    }
}, [groups])

function leaveGroup(groupID){
setGroups([...groups.map(group=>group.id===groupID?{...group,members:group.members.filter(member=>member!==localStorage.getItem('userLogin'))}:group)])
}

  function addGroup(){
    setGroups([...groups,{admin:localStorage.getItem('userLogin'),id:Date.now(),groupName:'',members:[''],createMode:true}])
  }

  function inputGroupName(name,id){
    setGroups([...groups.map(group=>group.id===id?{...group,groupName:name}:group)])
  }

  function createGroup(id,groupp){
    setGroups([...groups.map(group=>group.id===id?{...group,createMode:false}:group)])
  }
function removeGroup(id){
    setGroups(groups.filter(group=>group.id!==id))
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
                    <button onClick={()=>addGroup()}>Добавить новую группу</button>
                    <p>Курирование</p>
                {groups.map((group)=>group.admin===localStorage.getItem('userLogin')?
                 <div key={group.id} className='side__groups__item'>
                    {group.createMode
                    ?<div>
                        <p>Название:</p>
                        <input type="text" value={group.groupName} onChange={(e)=>{inputGroupName(e.target.value,group.id)}}/>
                        <button onClick={()=>createGroup(group.id,group)}>создать</button>
                        <button onClick={()=>removeGroup(group.id)}>Отменить</button>

                    </div>
                    : <div>
                        <div className="groupt__title">{group.groupName}</div>
                        <div>{group.members.length>1
                        ?<div className='group__members__container'>
                            {group.members.map(member=> <div key={member} className='member'>{member}</div>
                                )}
                        </div>
                        : <div></div>
                            }
                            </div>
                        <button onClick={()=>removeGroup(group.id)}>Удалить группу</button>
                    </div>
                    }
                 </div>:
                  ''
                  )
                }
                </div>
                <hr style={{width:'1px',height:'800px',backgroundColor:'#000'}}/>
                <div className="side__groups">
                <p>Участие</p> <button onClick={()=>navigate('/searchGroups')}>Найти группу</button>
                {groups.map((group)=>group.members!==undefined?
                    group.members.map((member)=>member===localStorage.getItem('userLogin')? <div key={group.id} className='side__groups__item'>
                      <div>
                      <div className="group__title">{group.groupName}</div>
                      <div className="group__admin">{group.admin}</div>

                      <div>{group.members.length>1
                        ?<div className='group__members__container'>
                            {group.members.map(member=> <div key={member} className='member'>{member}</div>
                                )}
                        </div>
                        : <div></div>
                            }
                            </div>
                          <button onClick={()=>{leaveGroup(group.id)}}>Покинуть группу</button>
                      </div>
                        
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