import React from "react";
import HoverCard from "./HoverCard";
import { useParams } from "react-router-dom";
import { NavigationGalleryData } from "../services/DataFiles";


function NavigationGallery() {
  const params = useParams();


  const CardDetails=NavigationGalleryData(params.mockId, params.attemptId)
  return (
    <div className="row row-cols-3 row-gap-5">
      {CardDetails.map((item, ind) => {
        return (
          <div className="col">
            <HoverCard
              key={ind}
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
