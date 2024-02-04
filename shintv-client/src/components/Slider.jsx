import React from "react"
import CardSlider from "./CardSlider"

export default React.memo(function Slider({airingAnimes,popularAnimes,recentAnimes}) {
    const getAnimesFromAiring = (from,to) => {
        return airingAnimes.slice(from,to);
    }
    const getAnimesFromPopular = (from,to) => {
      return popularAnimes.slice(from,to);
    }
    const getAnimesFromRecent = (from,to) => {
      return recentAnimes.slice(from,to);
    }
  return (
    <div>
      <CardSlider title="Top Airing" data={getAnimesFromAiring(0, 30)}/>
      <CardSlider title="Most Popular" data={getAnimesFromPopular(0, 30)}/>
      <CardSlider title="Recent Release" data={getAnimesFromRecent(0, 30)}/>
    </div>
  )
}
)
