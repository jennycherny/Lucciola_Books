import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
  <ContentLoader 
    speed={2}
    width={270}
    height={327}
    viewBox="0 0 270 327"
    backgroundColor="#FFFFFF"
    foregroundColor="#f1f1f1ce"
    {...props}
    className='item__skeleton'
  >
    <rect x="0" y="0" rx="7" ry="7" width="270" height="327" />
  </ContentLoader>
)

export default Skeleton;