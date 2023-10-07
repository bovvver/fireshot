import ProfileStat from "@components/atoms/ProfileStat/ProfileStat";
import ProfileStatLink from "@components/atoms/ProfileStatLink/ProfileStatLink";
import {
  Container,
  Box,
  Avatar,
  Typography,
  Button,
  ImageList,
  ImageListItem,
} from "@mui/material";
import useModals from "@hooks/useModals";

// TODO: Static content for development. Remove later.
const itemData = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
  },
  {
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Hats",
  },
  {
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Honey",
    author: "@arwinneil",
  },
  {
    img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    title: "Basketball",
  },
  {
    img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    title: "Fern",
  },
  {
    img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    title: "Mushrooms",
  },
  {
    img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    title: "Tomato basil",
  },
  {
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    title: "Sea star",
  },
  {
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "Bike",
  },
];

const Profile = () => {
  const { handleModalOpening } = useModals();

  return (
    <Container maxWidth="md">
      <Box>
        <Box sx={{ my: 2, display: "flex" }}>
          <Avatar sx={{ width: "7em", height: "7em" }}>S</Avatar>
          <Box
            sx={{ display: "flex", flex: 1, justifyContent: "space-evenly" }}
          >
            <ProfileStat counter={12} title="Posts" />
            <ProfileStatLink
              counter={1265}
              title="Followers"
              onClick={() => {
                handleModalOpening(true, "Followers");
              }}
            />
            <ProfileStatLink
              counter={11}
              title="Following"
              onClick={() => {
                handleModalOpening(true, "Following");
              }}
            />
          </Box>
        </Box>
        <Typography sx={{ fontWeight: "bold" }}>sampleUser</Typography>
        <Typography>
          Hello! I am sampleUser and this is my description. Lorem ipsum dolor
          sit amet, consectetur adipiscing elit.
        </Typography>
        <Button fullWidth variant="outlined" sx={{ my: 2 }}>
          Edit profile
        </Button>
      </Box>
      <Box>
        <ImageList sx={{ width: "100%" }} cols={3}>
          {itemData.map((item) => (
            <ImageListItem
              key={item.img}
              sx={{ width: "100%", aspectRatio: "1/1" }}
            >
              <img
                srcSet={`${item.img}?fit=crop&auto=format&dpr=2 2x`}
                src={`${item.img}?fit=crop&auto=format`}
                alt={item.title}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </Container>
  );
};

export default Profile;
