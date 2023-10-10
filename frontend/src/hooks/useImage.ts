import { useContext } from "react";
import { ImageChangeContext } from "@providers/ImageChangeProvider";

const useImage = () => useContext(ImageChangeContext);

export default useImage;
