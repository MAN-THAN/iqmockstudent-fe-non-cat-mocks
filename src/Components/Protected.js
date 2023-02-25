import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


function Protected(props) {
    const naviagte=useNavigate()
    const{Comp}=props;

    useEffect(()=>{

      const Mock = localStorage.getItem("mockId")
      
        if(!Mock){
            naviagte("/terms")
        }
    },[])

  return (
    <div>
     <Comp/>
    </div>
  )
}

export default Protected
