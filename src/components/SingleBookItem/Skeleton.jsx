import React from "react"
import ContentLoader from "react-content-loader"
import './../BooksList/BooksList.css'

const Skeleton = (props) => (
  <div className="item">
      <ContentLoader 
    speed={2}
    width={283}
    height={386}
    viewBox="0 0 283 386"
    backgroundColor="#fafafa"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="0" rx="10" ry="10" width="280" height="280" /> 
    <rect x="1" y="328" rx="7" ry="7" width="47" height="20" /> 
    <rect x="0" y="288" rx="10" ry="10" width="253" height="14" /> 
    <rect x="0" y="310" rx="7" ry="7" width="137" height="10" /> 
    <rect x="0" y="353" rx="7" ry="7" width="115" height="35" />
  </ContentLoader>
  </div> 
)

export default Skeleton;