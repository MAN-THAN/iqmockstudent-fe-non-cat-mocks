import React from 'react'
import Table from '../Components/Table'
import { useAuth } from '../services/Context'
function TopicAnalysis() {
  const{topicWiseAnalysis}=useAuth()
  const headings=["Name","Section","Topic","Subtopic","Correct or Incorrect", "Difficulty","%student got this answer correct","Time spent on this Question","Time spent by mock topper on this Question "]
  return (
<Table display="none" data={topicWiseAnalysis} headings={headings}/> 
  )
}

export default TopicAnalysis