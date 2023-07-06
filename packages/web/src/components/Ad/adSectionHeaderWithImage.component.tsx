import { ReactNode } from 'react';
import { cn } from '../UI/Checkbox/checkbox.component';
type AdSectionHeaderLabelProps = {
  title: string;
  image?: ReactNode;
  labelText?: string;
  className?: string;
};

const AdSectionHeaderWithImage = ({ image, title, labelText, className }: AdSectionHeaderLabelProps) => {
  return (
    <div
      className={`${cn(
        'flex space-x-3 relative text-xl font-bold my-1 lg:text-xl mt-5 lg:mt-10 lg:mb-5 tracking-wide',
        className,
      )}`}
    >
      <h3>{title}</h3>
      {(image || labelText) && (
        <div className="flex space-x-2 items-center bg-indigo-500 text-white px-2 rounded-md">
          {image}
          <span className="text-xs">{labelText}</span>
        </div>
      )}
    </div>
  );
};

export default AdSectionHeaderWithImage;
