import React from 'react'
import cl from './GroupsModalStyles.module.css'
import { useNavigate } from 'react-router-dom'
function GroupsModal({visible,setVisible,groups,checkGroup,addTestGroup,userTest}) {

  const navigate = useNavigate();
  
  return (
    <div className={visible? [cl.groupsModal,cl.active].join(' '):cl.groupsModal} onClick={()=>{setVisible({isVisible:false,userTest:''})}}>
        <div className={cl.groupsModalContent} onClick={(e)=>e.stopPropagation()}>
          <div className={cl.groupsModalContentContainer}>
          {!groups.find((group=>group.admin===localStorage.getItem('userLogin')))
          ?<div>У вас нет групп <button onClick={()=>navigate('/myGroups')}>создать группу</button></div>
          :
          
          groups.map((group=>group.admin==localStorage.getItem('userLogin')? <div key={group.id} className='group__chose'>
            <input type="checkbox" checked={checkGroup(group.id,userTest.id)}
             value={userTest.title} onChange={(e)=>{addTestGroup(group.id,userTest.id,e)}}/>
            <p className='group__name'>{group.groupName}</p>
            
          </div>
          :''
            ))
          }
          </div>
            
        </div>
    </div>
  )
}

export default GroupsModal