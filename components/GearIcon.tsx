
import React from 'react';

interface GearIconProps {
  className?: string;
  style?: React.CSSProperties;
}

const GearIcon: React.FC<GearIconProps> = ({ className, style }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      className={className}
      style={style}
    >
      <path fillRule="evenodd" d="M12.33 2.1c.34-.03.67 0 .99.06l.36.08c1.32.28 2.58.82 3.71 1.57l.18.12c1.07.7 2.06 1.57 2.89 2.57l.08.1c.78.94 1.42 1.98 1.88 3.1l.05.12c.43 1.07.69 2.2.74 3.33l.01.4c0 .34-.02.68-.05 1.01l-.08.36c-.28 1.32-.82 2.58-1.57 3.71l-.12.18c-.7 1.07-1.57 2.06-2.57 2.89l-.1.08c-.94.78-1.98 1.42-3.1 1.88l-.12.05c-1.07.43-2.2.69-3.33.74l-.4.01c-.34 0-.68-.02-1.01-.05l-.36-.08c-1.32-.28-2.58-.82-3.71-1.57l-.18-.12c-1.07-.7-2.06-1.57-2.89-2.57l-.08-.1c-.78-.94-1.42-1.98-1.88-3.1l-.05-.12c-.43-1.07-.69-2.2-.74-3.33l-.01-.4c0-.34.02-.68.05-1.01l.08-.36c.28-1.32.82-2.58 1.57-3.71l.12-.18c.7-1.07 1.57-2.06 2.57-2.89l.1-.08c.94-.78 1.98-1.42 3.1-1.88l.12-.05c1.07-.43 2.2-.69 3.33-.74l.4-.01zM12 15.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z" clipRule="evenodd" />
    </svg>
  );
};

export default GearIcon;
