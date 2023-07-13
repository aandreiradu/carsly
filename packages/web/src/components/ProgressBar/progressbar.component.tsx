import { useEffect, useState } from 'react';

type ProgressBarProps = {
  maxLevel: number;
  currentLevel: number;
  className?: string;
};

const ProgressBar = ({ currentLevel, maxLevel, className }: ProgressBarProps) => {
  const [progress, setProgress] = useState(currentLevel || 0);

  // useEffect(() => {
  //   if (currentLevel === maxLevel) {
  //     console.log('finished');
  //     setCompleted(true);
  //   }
  // }, [currentLevel]);

  useEffect(() => {
    const procent: number = Math.floor((currentLevel / maxLevel) * 100);
    console.log('procent', procent);
    setProgress(procent);
  }, [currentLevel]);

  return (
    <div className={`${className} relative w-full h-2 bg-black rounded-lg`}>
      <div className={`h-full ${`w-[${progress}%]`}  bg-red-600 rounded-lg transition-width duration-300 ease-in`}></div>
    </div>
  );
};

export default ProgressBar;
