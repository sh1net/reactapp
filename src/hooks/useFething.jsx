import { useState } from "react"


export const useFetching=(callback)=>{

const [error, setError] = useState('');

const [isLoading, setIsloading] = useState(true)
const  fetching=async (...args)=>{
        try{
            await callback(...args);
       }
       catch(e){
           setError(e.message);
       }
       finally{
        setIsloading(false);
       }   
}
return [fetching,isLoading,setIsloading,error]
}