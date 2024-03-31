"use client";

import { ImagePlus, Trash } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { Button } from "./button";

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

const ImageUpload = ({
  onChange,
  onRemove,
  value,
  disabled,
}: ImageUploadProps) => {
  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {value.map((url) => (
          <div
            key={url}
            className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
          >
            <div className="z-10 absolute top-2 right-2">
              <Button type="button" onClick={() => onRemove(url)} size="sm">
                <Trash className="h-4 w-4 text-white" />
              </Button>
            </div>
            <Image fill className="object-cover" alt="Image" src={url} />
          </div>
        ))}
      </div>
      <CldUploadWidget onUpload={onUpload} uploadPreset="mws5fhom">
        {({ open }) => {
          const onClick = () => {
            open();
          };

          return (
            <div className="flex items-center justify-center">
              <Button type="button" disabled={disabled} onClick={onClick}>
                <ImagePlus className="h-4 w-14" />
                Upload an Image
              </Button>
            </div>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
