import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
  <ContentLoader 
    speed={2}
    width={265}
    height={351}
    viewBox="0 0 265 351"
    backgroundColor="#FFFFFF"
    foregroundColor="#f1f1f1"
    {...props}
    className='item__skeleton'
  >
    <rect x="0" y="0" rx="7" ry="7" width="265" height="351" />
  </ContentLoader>
)

export default Skeleton;