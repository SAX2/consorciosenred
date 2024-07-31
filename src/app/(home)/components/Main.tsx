import React from 'react'

interface MainProps {
  children?: React.ReactNode;
}

const Main: React.FC<MainProps> = ({ children }) => {
  return (
    <main className="flex flex-col items-center justify-between scroll-smooth">
      {children}
    </main>
  )
}

export default Main