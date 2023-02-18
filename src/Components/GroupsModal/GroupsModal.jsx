import React from 'react'
import cl from './GroupsModalStyles.module.css'
function GroupsModal({visible,setVisible,groups,checkGroup,addTestGroup,userTest}) {

  
  return (
    <div className={visible? [cl.groupsModal,cl.active].join(' '):cl.groupsModal} onClick={()=>{setVisible({isVisible:false,userTest:''})}}>
        <div className={cl.groupsModalContent} onClick={(e)=>e.stopPropagation()}>
          <div className={cl.groupsModalContentContainer}>

          {groups.map((group=>group.admin==localStorage.getItem('userLogin')? <div key={group.id} className='group__chose'>
            <input type="checkbox" checked={checkGroup(group.id,userTest.id)}
             value={userTest.title} onChange={(e)=>{addTestGroup(group.id,userTest.id,e)}}/>
            <p className='group__name'>{group.groupName}</p>
            
          </div>
          :''
            ))}

          </div>
            
        </div>
    </div>
  )
}

export default GroupsModal