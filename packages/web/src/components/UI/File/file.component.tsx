import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '../Checkbox/checkbox.component';
import TopLevelNotification, { TopLevelNotificationHandlers } from '../TopLevelNotification/topLevelNotification.component';
import { Camera, Warning, X } from 'phosphor-react';
import AdSectionHeaderWithImage from '../../Ad/adSectionHeaderWithImage.component';

type FileComponentProps = {
  wrapperClasses?: string;
  maxAcceptedFile: number;
  buttonClasses?: string;
  withCountHeader?: boolean;
};

const imageTypeRegex = /image\/(png|jpg|)/gm;

const FileComponent = ({ maxAcceptedFile, wrapperClasses, buttonClasses, withCountHeader }: FileComponentProps) => {
  const notificaionRef = useRef<TopLevelNotificationHandlers>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [images, setImages] = useState<string[]>([]);

  const handleButtonClick = useCallback(() => {
    fileInputRef?.current?.click();
  }, []);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    let validImages: File[] = [];

    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.type.match(imageTypeRegex)) {
          validImages.push(file);
        } else {
          if (notificaionRef) {
            notificaionRef.current?.display({
              icon: <Warning className="w-14 h-8 text-red-600" />,
              message: `Invalid file formay type. Accepted formats: .JPG,.PNG`,
            });
          }
          validImages = [];
          return;
        }
      }

      console.log('imageFiles is', imageFiles);
      console.log('validImages is', validImages);

      if (validImages?.length > 5) {
        if (notificaionRef) {
          notificaionRef.current?.display({
            icon: <Warning className="w-14 h-8 text-red-600" />,
            message: `Ooops! Limit exceeded. You can set up to ${maxAcceptedFile} files`,
          });
        }
        validImages = [];
        setImages([]);
        setImageFiles([]);
        return;
      }

      if (validImages.length) {
        //@ts-ignore
        // setImageFiles((prev) => [
        //   ...prev,
        //   //@ts-ignore
        //   validImages,
        // ]);
        setImageFiles(validImages);
      }
    }
  };

  const handleRemoveImage = (image: string) => {
    console.log('image received', image);
    console.log('imgss', images);

    const filteredImgs = images.filter((img) => img !== image);
    console.log('filteredImgs', filteredImgs);
    //@ts-ignore
    setImageFiles(filteredImgs);
  };

  useEffect(() => {
    console.log('imageFilesimageFilesimageFiles!!!!', imageFiles);

    const fileReaders: FileReader[] = [];
    let isCancel = false;
    if (imageFiles.length) {
      const promises = imageFiles.map((file) => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReaders.push(fileReader);
          fileReader.onload = (e) => {
            const result = e.target?.result ?? null;

            if (!result) {
              throw new Error('No file selected');
            }
            resolve(result);
          };
          fileReader.onabort = () => {
            reject(new Error('File reading aborted'));
          };
          fileReader.onerror = () => {
            reject(new Error('Failed to read file'));
          };

          console.log('file', file);
          fileReader.readAsDataURL(file);
        });
      });
      Promise.all(promises)
        .then((images) => {
          if (!isCancel) {
            //@ts-ignore
            setImages(images);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }

    return () => {
      isCancel = true;
      fileReaders.forEach((fileReader) => {
        if (fileReader.readyState === 1) {
          fileReader.abort();
        }
      });
    };
  }, [imageFiles]);

  return (
    <>
      <TopLevelNotification ref={notificaionRef} hasCloseButton={false} dismissAfterXMs={3500} />
      {withCountHeader && (
        <AdSectionHeaderWithImage
          title="Images"
          image={<Camera className="h-4 w-4" />}
          labelText={`${images.length ?? 0} / ${maxAcceptedFile}`}
        />
      )}
      <div className={`${cn('w-full flex flex-col justify-center items-center ', wrapperClasses)}`}>
        <div className="flex flex-wrap items-center justify-center space-x-2">
          <button
            className={`${cn(
              'bg-white h-10 lg:h-12 px-8 whitespace-nowrap w-auto flex text-center items-center justify-center',
              buttonClasses,
            )}`}
            type="button"
            onClick={handleButtonClick}
          >
            Add photos
          </button>
          <span className="text-black">or drag & drop photos here</span>
        </div>
        <span className="text-black text-center mt-4 text-sm">
          You can add up to {maxAcceptedFile} photos. Accepted formats .JPG and .PNG
        </span>
        <input
          ref={fileInputRef}
          type="file"
          hidden
          accept="image/jpg image/png"
          name="files[]"
          multiple
          onChange={changeHandler}
        />
        {images.length > 0 ? (
          <div className="flex w-full space-x-8 flex-wrap mt-4 overflow-y-auto">
            {images.map((image) => {
              return (
                <div key={image} className="relative my-2">
                  {' '}
                  <img className="h-24 w-24 object-fill peer" src={image} alt="" />{' '}
                  {/* <div className="p-1 bg-black rounded absolute z-10 -top-3 -right-5 "> */}
                  <div className="peer-focus-within:visible peer-hover:visible invisible overlay absolute top-0 left-0 w-full h-full bg-black/50 z-10"></div>
                  <div
                    className="peer-focus-within:visible peer-hover:visible invisible p-1 bg-black rounded absolute z-10 top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4"
                    onClick={handleRemoveImage.bind(this, image)}
                  >
                    <X className="h-4 w-4" />
                  </div>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default FileComponent;
