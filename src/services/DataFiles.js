export const AnalysisAcrossCard = [
  { icon: "/CardsIcons/question-mark.png", title: "Number of Questions" },
  { icon: "/CardsIcons/click.png", title: "Attempted Questions" },
  { icon: "/CardsIcons/checked.png", title: "Correct Attempts" },
  { icon: "/CardsIcons/cross.png", title: "Incorrect Attempts" },
  { icon: "/CardsIcons/nextIcon.png", title: "Skipped Questions" },
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
    {
      text: "Score vs Percentile",
      icon: "compare2.png",
      path: `/scorevsprecentile/${mockId}/${attemptId}`,
    },
  ];
};

export const NavigationGalleryData = (mockId, attemptId) => {
  return [
    {
      heading: "View Solution",
      image: "ViewSolCard.png",
      path: `/viewsolutions/${mockId}/${attemptId}`,
    },
    {
      heading: "Error Tracker",
      image: "ErrorTrackerCard.png",
      path: `/errortracker/${mockId}/${attemptId}`,
    },
    {
      heading: "Goal Tracker",
      image: "GoalTrackerCard.png",
      path: `/goaltracker/${mockId}/${attemptId}`,
    },
    {
      heading: "Market Place",
      image: "PlaceMaket.png",
      path: `/marketplace/${mockId}/${attemptId}`,
    },

    {
      heading: "Overall Across Analysis",
      image: "AnalysisAcrossCard.png",
      path: `/analysisacross/${mockId}/${attemptId}`,
    },
    {
      heading: "Mock comparison",
      image: "MockComp.png",
      path: `/mockcomparison/${mockId}/${attemptId}`,
    },
  ];
};

// Please be noticed values must be same from backend and frontend and  must be focus any section values dont be same
export const IncorrectDetailing = [
  {
    id: 0,
    color: " linear-gradient(180deg, #48E5DD 0%, #484EE5 100%)",
    value: "all",
  },
  {
    id: 1,
    color: "#48E5DD",
    value: "Did not understand the concept",
  },
  {
    id: 2,
    color: "#FF6CB6",
    value: "I understood the concept but failed to apply it correctly",
  },

  { id: 3, color: "#FFBC5E", value: "I misread the question" },
  { id: 4, color: "#4732CC", value: "I ran out of time" },
  { id: 5, color: "#1D9374", value: "I made a silly mistake" },
  {
    id: 6,
    color: "#FF6238",
    value: "I fell for the trap answer",
  },
  { id: 7, color: "#1D5C81", value: "I guessed the answer" },
];

export const CorrectDetailing = [
  {
    id: 0,
    color: "linear-gradient(180deg, #48E5DD 0%, #484EE5 100%)",
    value: "all",
  },
  {
    id: 1,
    color: "#48E5DD",
    value: "I did it all perfect",
  },
  {
    id: 2,
    color: "#FF6CB6",
    value: "I took more than usual time",
  },

  { id: 3, color: "#FFBC5E", value: "I bluff the answer" },
];

export const SkippedDetailing = [
  {
    id: 0,
    color: "linear-gradient(180deg, #48E5DD 0%, #484EE5 100%)",
    value: "all",
  },
  {
    id: 1,
    color: "#48E5DD",
    value: "Didn't know the concept",
  },
  {
    id: 2,
    color: "#FF6CB6",
    value: "I ran out of the time",
  },

  { id: 3, color: "#FFBC5E", value: "I didn't read the question properly" },
  { id: 4, color: "#4732CC", value: "Question was lengthy" },
];
