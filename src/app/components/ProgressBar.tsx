import React from 'react'
import * as Progress from '@radix-ui/react-progress';

interface ProgressBarProps {
  value: number;
  max: number;
  color: string;
}

export const ProgressBar = ({ value, max, color }: ProgressBarProps) => {
  const percentage = (value / max) * 100;

  return (
    <Progress.Root className="h-4 w-full bg-gray-300 rounded overflow-hidden">
      <Progress.Indicator
        className={`h-full ${color} `}
        style={{ width: `${percentage}%`, transition: 'width 660ms cubic-bezier(0.65, 0, 0.35, 1)' }}
      />
    </Progress.Root>
  );
};