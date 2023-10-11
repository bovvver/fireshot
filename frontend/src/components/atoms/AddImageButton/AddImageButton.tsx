import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useImage } from "@hooks/contextHooks";
import { AddImageButtonInterface } from "@customTypes/componentProps";

const AddImageButton = ({ setImage }: AddImageButtonInterface) => {
  const { handleImageChange } = useImage();

  return (
    <>
      <input
        type="file"
        accept="image/*"
        id="image-upload"
        style={{ display: "none" }}
        onChange={(e) => {
          handleImageChange(e, setImage);
        }}
      />
      <IconButton
        sx={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%,-50%)",
        }}
        component="label"
        htmlFor="image-upload"
      >
        <AddIcon
          sx={{
            fontSize: "5rem",
          }}
        />
      </IconButton>
    </>
  );
};

export default AddImageButton;
