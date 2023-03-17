import React from 'react'
import Table from '../Components/Table'
import {useAuth} from "../services/Context"



function DifficultyAnalysis() {
  const{difficulty}=useAuth()

  return (
    
    
    <Table  display="none" data={difficulty}/> 
  )
}

export default DifficultyAnalysis