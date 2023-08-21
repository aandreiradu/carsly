import { Skeleton } from '@mui/material';
import { cn } from '../Checkbox/checkbox.component';

interface LoadingSkeletonContentProps {
  count?: number;
  width?: number;
  height?: number;
  variant?: 'text' | 'rectangular' | 'rounded' | 'circular';
  animation?: 'pulse' | 'wave' | false;
  className?: string;
}

const SkeletonWrapper = ({
  count = 9,
  width = 208,
  height = 256,
  variant = 'rectangular',
  animation = 'wave',
  className,
}: LoadingSkeletonContentProps) => {
  const fakeMap = count > 0 ? Array(count).fill({ fake: true }) : [];

  return (
    <>
      {fakeMap?.map((_, idx) => (
        <Skeleton
          key={`__skeleton_wrapper_${idx}`}
          className={`${cn('rounded-2xl rounded-bl-none rounded-br-none flex-shrink-0', className)}`}
          variant={variant}
          animation={animation}
          height={`${height}px`}
          width={`${width}px`}
        />
      ))}
    </>
  );
};

export default SkeletonWrapper;
