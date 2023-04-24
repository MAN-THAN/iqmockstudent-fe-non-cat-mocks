export const AnalysisAcrossCard = [
  { icon: "/CardsIcons/question-mark.png", title: "Number of Questions" },
  { icon: "/CardsIcons/click.png", title: "Attempted Questions" },
  { icon: "/CardsIcons/checked.png", title: "Correct Attempts" },
  { icon: "/CardsIcons/cross.png", title: "Incorrect Attempts" },
  { icon: "/CardsIcons/nextIcon.png", title: "Skipped Questions" },
];

export const graphinstructionPoints = [
  { description: "I did not understand the concept", color: "#48E5DD" },
  {
    description: "I understood the concept but failed to apply it correctly",
    color: "#FF6CB6",
  },
  { description: "I misread the question", color: "#FFBC5E" },
  { description: "I ran out of time", color: "#4732CC" },
  { description: "I made a silly mistake", color: "#1D9274" },
  { description: "I fell for the trap answer", color: "#FF6238" },
  { description: "I guessed the answer", color: "#1D5C80" },
];

export const DrawerData = (mockId, attemptId) => {
  return [
    {
      text: "Analysis",
      icon: "Group138.png",
      path: `/analysis/${mockId}/${attemptId}/overall`,
    },
    {
      text: "View Solution",
      icon: "view-sol-menu.png",
      path: `/viewsolutions/${mockId}/${attemptId}`,
    },
    {
      text: "Leader Board",
      icon: "podium1.png",
      path: `/leaderboard/${mockId}/${attemptId}`,
    },
    {
      text: "Goal Tracker",
      icon: "goal1.png",
      path: `/goaltracker/${mockId}/${attemptId}`,
    },
    {
      text: "Market Place",
      icon: "shopping-bag.png",
      path: `/marketplace/${mockId}/${attemptId}`,
    },
    {
      text: "Error Tracker",
      icon: "errorTracker.png",
      path: `/errortracker/${mockId}/${attemptId}`,
    },
    {
      text: "Overall across analysis",
      icon: "overallAcross.png",
      path: `/analysisacross/${mockId}/${attemptId}`,
    },
    {
      text: "Mock comparison",
      icon: "mockCompare.png",
      path: `/mockcomparison/${mockId}/${attemptId}`,
    },
  ];
};



export const NavigationGalleryData =(mockId, attemptId)=>{
  return [
    {
      heading: "View Solution",
      image: "solutions-card.png",
      path: `/viewsolutions/${mockId}/${attemptId}`
    },
    {
      heading: "Error Tracker",
      image: "Error-card.png",
      path: `/errortracker/${mockId}/${attemptId}`
    },
    {
      heading: "On Boarding",
      image: "onBoarding-card.png",
      path: `/leaderboard/${mockId}/${attemptId}`
    },
    {
      heading: "Goal Tracker",
      image: "GoalCard.png",
      path: `/goaltracker/${mockId}/${attemptId}`,
    },
    {
      heading: "Market Place",
      image: "marketPlace-card.png",
      path: `/marketplace/${mockId}/${attemptId}`,
    },
  
    {
      heading: "Overall across analysis",
      image: "AnalysisAcross-card.png",
      path: `/analysisacross/${mockId}/${attemptId}`,
    },
    {
      heading: "Mock comparison",
      image: "comparison-card.png",
      path: `/mockcomparison/${mockId}/${attemptId}`,
    },
  ];
  
} 