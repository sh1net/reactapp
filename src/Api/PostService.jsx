
import { db } from "../firebase";
import { storage } from "../firebase";
import { uploadBytesResumable, getDownloadURL, ref as sRef } from "firebase/storage";

import {get,set,ref,child} from "firebase/database"

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
}