import './SearchGroupsStyles.css'
import React from 'react'
import { useMemo } from 'react'
import { useFetching } from '../../hooks/useFething'
import { useContext } from 'react'
import Header from '../../Components/Header/Header'
import Navbar from '../../Components/Navbar/Navbar'
import { groupsContext } from '../../Context/useContext'
import Loader from '../../Components/Loader/Loader'
import PostService from '../../Api/PostService'
import { useEffect } from 'react'
import { useState } from 'react'
function SearchGroups() {
  const {groups, setGroups}=useContext(groupsContext)
  const [search, setSearch] = useState('')
  
  const [fetchGroups,isLoading]=useFetching(async()=>{
      
      
      const fetchedGroups= await PostService.getGroups();
      if(fetchedGroups===undefined){
        setGroups([])
      }
      else
       setGroups(fetchedGroups);
      
     })

useEffect(() => {
  fetchGroups();
}, [])

useEffect(() => {
  if(groups!==undefined&&groups!==null)
  PostService.setGroups(groups);
}, [groups])



const searchedGroups=useMemo(() => {
     
    if(groups!==undefined&&groups!==null){
      
      return groups.filter((group)=>group.groupName.toLowerCase().includes(search.toLowerCase()))
    }
 }, [search,groups]);





function joinGroup(id){
  setGroups([...groups.map(group=>group.id==id?{...group,members:[...group.members,localStorage.getItem('userLogin')]}:group)])
}


  return (isLoading||searchedGroups===undefined
    ?<Loader/>
    :
    <div>
      <Header/>
      <Navbar/>
      <div className='search__groups__bg'>
      <input className="sg__titles__search" type="text" placeholder='Введите название группы' value={search} onChange={(e)=>setSearch(e.target.value)} />

        {groups.length===0
        ?<h1>Группы не найдены</h1>
        :<div className="search__groups__container">
          {searchedGroups.map(group=> <div key={group.id} className='search__groups__item'>
            <div className="sg__title" style={{marginBottom:"5px",fontWeight:"bold",fontFamily:"sans-serif"}}>{group.groupName}</div>
            <div className="sg__admin"><li>Админ: {group.admin}</li></div>
            <p ><li>Участников: {group.members.length-1}</li></p>
            {group.members.find(member=>member===localStorage.getItem('userLogin'))&&group.admin!==localStorage.getItem('userLogin')
              ? <p style={{textAlign:"right",fontFamily:"sans-serif"}}>Вы вступили</p>
              :group.admin===localStorage.getItem('userLogin')
              ? <p style={{textAlign:"right",fontFamily:"sans-serif"}}>Вы админ этой группы</p>
              : <button className="sg__neter__btn" onClick={()=>joinGroup(group.id)}>Вступить</button>
            }
          </div>
            )}
        </div>
        }
       
      </div>
    </div>
  )
}

export default SearchGroups

