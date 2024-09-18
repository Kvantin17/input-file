import { useFileInputModel } from "./useFileInputModel";

export type InputAttrs = {
  multiple: boolean;
  accept: string[];
};

export type FileLoaderProps = {
  width: string;
  height: string;
  fileType: "image" | "video" | "document";
  inputAttrs: InputAttrs;
  customLoad?: (
    file: File,
    model: ReturnType<typeof useFileInputModel>
  ) => Promise<string>;
};
