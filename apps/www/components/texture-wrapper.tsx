import React, { ReactNode } from "react"

interface BackgroundWrapperProps {
  children: ReactNode
  url: string
}

const BgNoiseWrapper: React.FC<BackgroundWrapperProps> = ({
  children,
  url,
}) => {
  return (
    <div className="relative">
      <div
        className="pointer-events-none fixed inset-0 mix-blend-hard-light"
        style={{ backgroundImage: `url('${url}')` }}
      ></div>
      <div className="relative">{children}</div>
    </div>
  )
}

export default BgNoiseWrapper
