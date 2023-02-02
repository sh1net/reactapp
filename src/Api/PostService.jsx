
import { db } from "../firebase";
import {get,set,ref,child, onValue} from "firebase/database"

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
  static  async testPost(){
    
   const data=await get(child(ref(db),'/users')).then(snapshot=>{

      if (snapshot.exists()) {
  
       return snapshot.val();
  
      } 
      
  
    }).catch((error) => {
  
      console.error(error);
  
    });
    return data;
}
}