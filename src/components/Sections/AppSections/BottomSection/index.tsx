import React from 'react'

interface BottomSectionProps {
  children?: React.ReactNode;
}

const BottomSection = ({ children }: BottomSectionProps) => {
  return (
    <div className="sticky bottom-0">
      <div className="bg-white dark:bg-black-app-bg p-4 px-2 border-t border-outline dark:border-outline-dark">
        {children}
      </div>
    </div>
  );
}

export default BottomSection