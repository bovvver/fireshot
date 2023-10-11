import { ChangeEvent, createContext, ReactNode } from "react";
import { ImageChangeContextInterface } from "@customTypes/providers";
import { useToast } from "@hooks/contextHooks";

export const ImageChangeContext = createContext<ImageChangeContextInterface>({
  handleImageChange: () => {},
});

const ImageChangeProvider = ({ children }: { children: ReactNode }) => {
  const { handleToastOpening } = useToast();

  const getFileType = (file: string | undefined) => {
    if (file === undefined || file === null) return null;
    return file.split(":")[1].split(";")[0];
  };

  const handleImageChange = (
    e: ChangeEvent<HTMLInputElement>,
    setImageFunction: (image: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          const result = getFileType(event.target.result?.toString());

          if (result === null || !result.includes("image")) {
            handleToastOpening("Please, select image file.", "warning");
            return;
          }
          setImageFunction(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <ImageChangeContext.Provider
      value={{
        handleImageChange,
      }}
    >
      {children}
    </ImageChangeContext.Provider>
  );
};

export default ImageChangeProvider;
