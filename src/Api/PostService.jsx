import { db } from "../firebase";
import { storage } from "../firebase";
import { uploadBytesResumable, getDownloadURL, ref as sRef } from "firebase/storage";
import {get,set,ref,push,child,onValue} from "firebase/database"




 



export default class PostService{
  
    static async getUsers(){
      const data=await get(child(ref(db),'/users')).then(snapshot=>{

            if (snapshot.exists()) {
        
              return snapshot.val();
        
            } else  return []
            
        
          }).catch((error) => {
        
            console.error(error);
        
          });
          return data;
    }
    
    static  setUsers(users){
        set(ref(db,'/users'),users)
    }

    static async editUser(newUser){
      const users=await PostService.getUsers()
      console.log(newUser);
      set(ref(db,'/users'),users.map((user)=>user.login==newUser.login?newUser:user))
    }

    static async getUserById(id){
      const data=await  get(child(ref(db),'/users/'+id)).then(snapshot=>{

        if (snapshot.exists()) {
          
          return snapshot.val()
    
        } 
        
    
      }).catch((error) => {
    
        console.error(error);
    
      });
     return data;
  }
  

static  setUserTest(currentTest,userTests,id){
  set(ref(db,'/users/'+id+'/MyTests'),[...userTests,currentTest])
}
static  setUserTests(userTests,id){
  set(ref(db,'/users/'+id+'/MyTests'),[...userTests])
}
static  async getUserTestsById(id){
  const data=await  get(child(ref(db),'/users/'+id+'/MyTests')).then(snapshot=>{
    if (snapshot.exists()) {
      
      return snapshot.val()

    } 
    

  }).catch((error) => {

    console.error(error);

  });
 return data;
}

static async getGroups(){
  const data=await get(child(ref(db),'/groups')).then(snapshot=>{

    if (snapshot.exists()) {

      return snapshot.val();

    } else  return []
    

  }).catch((error) => {

    console.error(error);

  });
  return data;
}

static async setGroups(groups){
 set(ref(db,'/groups'),groups)
}

static async removeGroup(id){
  const groups=await PostService.getGroups();
  set(ref(db,'/groups'),groups.filter(group=>group.id!==id))
 }

 static async setGroup(group){
  const groups=await PostService.getGroups();

  set(ref(db,'groups/'+(groups.length)),group)
 }

 static async leaveFromGroup(id){
  const groups=await PostService.getGroups();
  set(ref(db,'groups/'),groups.map(group=>group.id===id?{...group,members:group.members.filter(member=>member!==localStorage.getItem('userLogin'))}:group))
 }



static  async uploadTestImg(file){
const testImgRef=sRef(storage,'testImages/'+file.name);
const uploadTask=uploadBytesResumable(testImgRef,file);
uploadTask.on('state_changed',(p)=>{});
}

static  async getTestImg(file,setQuestions,questions,id){
  const testImgRef=sRef(storage,'testImages/'+file.name);
  getDownloadURL(testImgRef).then(url=>{
    setQuestions([...questions.map((question)=>question.id==id?{...question,pic:url}:question)])
  })
 
  }

  static async uploadUserImg(file){
    const userImgRef =sRef(storage,'userImages/'+file.name);
    const uploadTask=uploadBytesResumable(userImgRef,file);
    uploadTask.on('state_changed',(p)=>{}); 
  }

  static  async getUserImg(file,setUser,user){
    const userImgRef=sRef(storage,'userImages/'+file.name);
    getDownloadURL(userImgRef).then(url=>{
      setUser({...user,pic:url});
      PostService.editUser({...user,pic:url});
    })
  }

  static async deleteTestFromGroup(id){
    const groups=await PostService.getGroups();
    set(ref(db,'/groups'),groups.map(group=>group.tests!==undefined?{...group,tests:group.tests.filter(userTest=>userTest.id!==id)}:group));

  }
  


  static async uploadGroupImg(file){
    const groupsImgRef =sRef(storage,'groupsImages/'+file.name);
    const uploadTask=uploadBytesResumable(groupsImgRef,file);
    uploadTask.on('state_changed',(p)=>{}); 
  }

  static  async getGroupImg(file,setAddingGroups,addingGroups,id){
    const groupsImgRef=sRef(storage,'groupsImages/'+file.name);
    getDownloadURL(groupsImgRef).then(url=>{
    setAddingGroups([...addingGroups.map((group=>group.id===id?{...group,groupImg:url}:group))])
    })
  }
  static async joinGroup(id){
    const groups=await PostService.getGroups();
    set(ref(db,'/groups'),groups.map(group=>group.id===id?{...group,members:[...group.members,localStorage.getItem('userLogin')]}:group))
   }
}