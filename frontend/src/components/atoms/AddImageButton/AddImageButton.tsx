import { ChangeEvent } from "react";
import { useImage } from "@hooks/contextHooks";
import { AddImageButtonInterface } from "@customTypes/componentProps";
import {
  Input,
  StyledIconButton,
  StyledAddIcon,
} from "./AddImageButton.styles";

const AddImageButton = ({ setImage, setBackground }: AddImageButtonInterface) => {
  const { handleImageChange } = useImage();

  const runImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleImageChange(e, setBackground, setImage);
  };

  return (
    <>
      <Input
        type="file"
        accept="image/*"
        id="image-upload"
        onChange={runImageChange}
      />
      <StyledIconButton>
        <label htmlFor="image-upload">
          <StyledAddIcon />
        </label>
      </StyledIconButton>
    </>
  );
};

export default AddImageButton;
