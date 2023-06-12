import { useEffect, useState } from 'react';

type ProgressBarProps = {
  maxLevel: number;
  currentLevel: number;
  className?: string;
};

const ProgressBar = ({ currentLevel, maxLevel, className }: ProgressBarProps) => {
  const [completed, setCompleted] = useState(false);
  const [progress, setProgress] = useState(currentLevel || 0);

  useEffect(() => {
    if (currentLevel === maxLevel) {
      console.log('finished');
      setCompleted(true);
    }
  }, [currentLevel]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCompleted((prev) => !prev);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [completed]);

  return (
    <div className={`${className} relative w-full h-2 bg-black rounded-lg`}>
      <div
        className={`h-full ${completed ? 'w-full' : `w-[33%]`}  bg-red-600 rounded-lg transition-width duration-300 ease-in`}
      ></div>
    </div>
  );
};

export default ProgressBar;
