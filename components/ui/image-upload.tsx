"use client";

import { useEffect, useState } from "react";
import { Button } from "./button";
import { ImagePlusIcon, Trash } from "lucide-react";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";

interface ImageUploadProps {
  disabled: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleUpload = (result: any) => {
    if (result.event === "success") {
        console.log(result.info.secure_url)
      onChange(result.info.secure_url);
    }
  };

  if (!isMounted) return null;

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {value.map((url) => (
          <div
            key={url}
            className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
          >
            <div className="absolute z-10 top-2 right-2">
              <Button
                type="button"
                onClick={() => onRemove(url)}
                variant="destructive"
                size="icon"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image fill className="object-cover" alt="Image" src={url} />
          </div>
        ))}
      </div>

      <CldUploadWidget uploadPreset="spkd0oze" onSuccess={(results)=>{handleUpload(results)}}>
        {({ open}) => {
          

          

          return (
            <Button
              type="button"
              disabled={disabled}
              variant="secondary"
              onClick={()=>open()}
            >
              <ImagePlusIcon className="h-4 w-4 mr-2" /> Upload an image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
