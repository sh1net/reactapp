import React from 'react'
import { useState } from 'react'
import PostService from '../../Api/PostService'
import { testContext } from '../../Context/useContext'
import { useContext } from 'react'
import swal from 'sweetalert'

function AddingGroups({groups,setGroups}) {

    const [addingGroups, setAddingGroups] = useState([])

    function addGroup(){
        setAddingGroups([{admin:localStorage.getItem('userLogin'),id:Date.now(),groupName:'',members:[''],groupImg:''},...addingGroups])
      }

      function inputGroupName(name,id){
        setAddingGroups([...addingGroups.map(group=>group.id===id?{...group,groupName:name}:group)])
      }

      function checkGroupName(name){
        if(groups.find(group=>group.groupName.toLowerCase()===name.toLowerCase())){
          swal({
            icon:"error",
            title:"Ошибка",
            text:"Группа с таким названием уже существует"
          })
          return true;
        }
      else if(name===''){
          swal({
            icon:"error",
            title:"Ошибка",
            text:"Вы не ввели название группы"
          })
          return true
        }
      else return false
        }

      function createGroup(id,group){
        if(checkGroupName(group.groupName)){
          return
        }
        setGroups([...groups,group])
        setAddingGroups(addingGroups.filter(group=>group.id!==id))
        PostService.setGroup(group);
        PostService.setResult({group:group.groupName})
      }
      function cancelGroup(id){
        setAddingGroups(addingGroups.filter(group=>group.id!==id))
    }
    function uploadImg(e,id){
        const file=e.target.files[0];
        PostService.uploadGroupImg(file)
        setTimeout(() => {
          PostService.getGroupImg(file,setAddingGroups,addingGroups,id);
        }, 2000);
      }
    function groupImgSelect(){
        document.getElementById("group__file").click();
    }
  return (
    <div className='adding__side__groups'>
         <button className="mg__add__group__button" onClick={()=>addGroup()}>Добавить новую группу</button>
            <p className="mg__another__titles">Курирование</p>
           {addingGroups.map((group)=>
                 <div key={group.id} className='side__groups__item__adding'>
                    
                    <div>

                        <p style={{fontWeight:"bold"}}>Название:</p>
                        <input className="mg__input__name" placeholder="Введите текст" type="text" value={group.groupName} onChange={(e)=>{inputGroupName(e.target.value,group.id)}}/>
                      
                        <img className='img__container' src={group.groupImg} alt="" />

                        
                        <button className="mg__create__cansel__buttons" onClick={()=>cancelGroup(group.id)}>Отменить</button>
                        <button className="mg__create__cansel__buttons" onClick={()=>{createGroup(group.id,group)}}>Создать</button>
                        
                        <button onClick={()=>groupImgSelect()} className="file__upload__button">Выбрать аватар </button>
                        <input id="group__file" className="file__upload__input" type="file" name="f" accept='image/png, image/jpeg' onChange={(e)=>{uploadImg(e,group.id)}}/>
                    </div>
                     
                    
                 </div>
                  
                  )
                }
    </div>
  )
}

export default AddingGroups