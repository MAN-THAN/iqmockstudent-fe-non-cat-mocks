import React from 'react'
import Table from '../Components/Table'
import {useAuth} from "../services/Context"

function SectionAnalysis() {
  const{sectionWiseAnalysis}=useAuth()
  return (
  <Table display="none" data={sectionWiseAnalysis}/> 
 
  )
}

export default SectionAnalysis