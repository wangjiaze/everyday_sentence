// src/components/common/LoadingSpinner.tsx
import React from 'react';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'medium',
  color = 'currentColor'
}) => {
  const sizeMap = {
    small: '1rem',
    medium: '2rem',
    large: '3rem'
  };
  
  const dimensions = sizeMap[size];
  
  return (
    <div className="flex justify-center items-center">
      <svg
        width={dimensions}
        height={dimensions}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="animate-spin"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke={color}
          strokeOpacity="0.25"
          strokeWidth="4"
        />
        <path
          d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export default LoadingSpinner;