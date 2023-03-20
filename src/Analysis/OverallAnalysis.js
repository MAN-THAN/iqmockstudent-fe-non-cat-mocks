import React from 'react'
import Table from '../Components/Table'
import { useAuth } from '../services/Context'
function OverallAnalysis() {
  const{overallAnalysis}=useAuth()
  const headings=["Name","Questions","Attempted","Correct","Incorrect", "Score","% Accuracy","% Score","Percentile"]
  return (
    <Table data={overallAnalysis.overAllAnalysis}  headings={headings}/>
  )
}

export default OverallAnalysis