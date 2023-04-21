import React from "react";
import HoverCard from "./HoverCard";
import { useParams } from "react-router-dom";

function NavigationGallery() {
  const params = useParams();
  const CardDetails = [
    {
      heading: "View Solution",
      image: "solutions-card.png",
      path: `/viewsolutions/${params.mockId}/${params.attemptId}`
    },
    {
      heading: "Error Tracker",
      image: "Error-card.png",
      path: `/errortracker/${params.mockId}/${params.attemptId}`
    },
    {
      heading: "On Boarding",
      image: "onBoarding-card.png",
      path: `/leaderboard/${params.mockId}/${params.attemptId}`
    },
    {
      heading: "Goal Tracker",
      image: "GoalCard.png",
      path: `/goaltracker/${params.mockId}/${params.attemptId}`,
    },
    {
      heading: "Market Place",
      image: "marketPlace-card.png",
      path: `/marketplace/${params.mockId}/${params.attemptId}`,
    },

    {
      heading: "Overall across analysis",
      image: "AnalysisAcross-card.png",
      path: `/analysisacross/${params.mockId}/${params.attemptId}`,
    },
    {
      heading: "Mock comparison",
      image: "comparison-card.png",
      path: `/mockcomparison/${params.mockId}/${params.attemptId}`,
    },
  ];

  return (
    <div className="row row-cols-3 row-gap-5">
      {CardDetails.map((item, _) => {
        return (
          <div className="col">
            <HoverCard
              image={item.image}
              heading={item.heading}
              path={item.path}
            />
          </div>
        );
      })}
    </div>
  );
}

export default NavigationGallery;
